// app/api/payment/click/webhook/route.ts
// Click.uz dan keladigan Prepare va Complete so'rovlarni qabul qilish
// Bu endpoint faqat Click.uz serverlari tomonidan chaqiriladi

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { clickPrepareSchema, clickCompleteSchema } from "@/lib/validations/auth";

// ─── Click sign tekshirish (HMAC) ─────────────────────────────────────────────
function verifyClickSign(params: {
  clickTransId: string;
  serviceId: string;
  secretKey: string;
  merchantTransId: string;
  amount: string | number;
  action: string;
  signTime: string;
  signString: string;
  merchantPrepareId?: string;
}): boolean {
  const {
    clickTransId, serviceId, secretKey,
    merchantTransId, amount, action,
    signTime, signString, merchantPrepareId = "",
  } = params;

  // Click'ning sign algoritmi
  const dataToSign = [
    clickTransId,
    serviceId,
    secretKey,
    merchantTransId,
    merchantPrepareId,
    amount,
    action,
    signTime,
  ].join("");

  const expectedSign = crypto
    .createHash("md5")
    .update(dataToSign)
    .digest("hex");

  // Timing-safe taqqoslash (timing attack'dan himoya)
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSign, "utf8"),
      Buffer.from(signString, "utf8")
    );
  } catch {
    return false;
  }
}

// ─── Click Error kodlari ──────────────────────────────────────────────────────
const CLICK_ERRORS = {
  SUCCESS: 0,
  SIGN_FAILED: -1,
  WRONG_AMOUNT: -2,
  TRANSACTION_NOT_FOUND: -5,
  TRANSACTION_CANCELLED: -9,
  ALREADY_PAID: -4,
};

// ─── POST /api/payment/click/webhook ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action; // "0" = Prepare, "1" = Complete

    // ─── 1. Prepare (action=0) ───────────────────────────────────────────
    if (action === "0" || action === 0) {
      const parsed = clickPrepareSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({
          error: CLICK_ERRORS.SIGN_FAILED,
          error_note: "Invalid request data",
        });
      }

      const data = parsed.data;

      // Sign tekshirish
      const isValid = verifyClickSign({
        clickTransId: data.click_trans_id,
        serviceId: data.service_id,
        secretKey: process.env.CLICK_SECRET_KEY!,
        merchantTransId: data.merchant_trans_id,
        amount: data.amount,
        action: data.action,
        signTime: data.sign_time,
        signString: data.sign_string,
      });

      if (!isValid) {
        return NextResponse.json({
          error: CLICK_ERRORS.SIGN_FAILED,
          error_note: "Sign tekshirishdan o'tmadi",
        });
      }

      // Transaction topish
      const transaction = await prisma.transaction.findUnique({
        where: { merchantTransId: data.merchant_trans_id },
      });

      if (!transaction) {
        return NextResponse.json({
          error: CLICK_ERRORS.TRANSACTION_NOT_FOUND,
          error_note: "Transaction topilmadi",
        });
      }

      if (transaction.status === "COMPLETED") {
        return NextResponse.json({
          error: CLICK_ERRORS.ALREADY_PAID,
          error_note: "Allaqachon to'langan",
        });
      }

      // Amount tekshirish
      const expectedAmount = Number(transaction.amount);
      const receivedAmount = Number(data.amount);
      if (Math.abs(expectedAmount - receivedAmount) > 1) {
        return NextResponse.json({
          error: CLICK_ERRORS.WRONG_AMOUNT,
          error_note: "Noto'g'ri summa",
        });
      }

      // Status → PREPARING
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: "PREPARING",
          clickTransId: data.click_trans_id,
          metadata: { click_paydoc_id: data.click_paydoc_id },
        },
      });

      return NextResponse.json({
        click_trans_id: data.click_trans_id,
        merchant_trans_id: data.merchant_trans_id,
        merchant_prepare_id: transaction.id,
        error: CLICK_ERRORS.SUCCESS,
        error_note: "Success",
      });
    }

    // ─── 2. Complete (action=1) ──────────────────────────────────────────
    if (action === "1" || action === 1) {
      const parsed = clickCompleteSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({
          error: CLICK_ERRORS.SIGN_FAILED,
          error_note: "Invalid request data",
        });
      }

      const data = parsed.data;

      // Sign tekshirish (Complete uchun merchant_prepare_id ham qo'shiladi)
      const isValid = verifyClickSign({
        clickTransId: data.click_trans_id,
        serviceId: data.service_id,
        secretKey: process.env.CLICK_SECRET_KEY!,
        merchantTransId: data.merchant_trans_id,
        amount: data.amount,
        action: data.action,
        signTime: data.sign_time,
        signString: data.sign_string,
        merchantPrepareId: data.merchant_prepare_id,
      });

      if (!isValid) {
        return NextResponse.json({
          error: CLICK_ERRORS.SIGN_FAILED,
          error_note: "Sign tekshirishdan o'tmadi",
        });
      }

      // Click'dan xato kelib qoldi (masalan, foydalanuvchi bekor qildi)
      const clickError = Number(data.error);
      if (clickError < 0) {
        await prisma.transaction.update({
          where: { merchantTransId: data.merchant_trans_id },
          data: { status: "CANCELLED" },
        });
        return NextResponse.json({
          click_trans_id: data.click_trans_id,
          merchant_trans_id: data.merchant_trans_id,
          merchant_confirm_id: 1,
          error: CLICK_ERRORS.SUCCESS,
          error_note: "Cancelled",
        });
      }

      // Atomik tranzaksiya: Transaction + PropAccount + User balance yangilash
      await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.update({
          where: { merchantTransId: data.merchant_trans_id },
          data: { status: "COMPLETED" },
        });

        if (transaction.propAccountId) {
          await tx.propAccount.update({
            where: { id: transaction.propAccountId },
            data: {
              status: "ACTIVE",
              startedAt: new Date(),
            },
          });
        }
      });

      return NextResponse.json({
        click_trans_id: data.click_trans_id,
        merchant_trans_id: data.merchant_trans_id,
        merchant_confirm_id: 1,
        error: CLICK_ERRORS.SUCCESS,
        error_note: "Success",
      });
    }

    return NextResponse.json({ error: -1, error_note: "Noma'lum action" });
  } catch (error) {
    console.error("[CLICK_WEBHOOK]", error);
    return NextResponse.json({
      error: -1,
      error_note: "Server xatosi",
    });
  }
}
