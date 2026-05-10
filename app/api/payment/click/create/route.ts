// app/api/payment/click/create/route.ts
// Click.uz to'lov yaratish (Generate Invoice)

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createPropAccountSchema } from "@/lib/validations/auth";
import { AccountSize, ChallengeType } from "@prisma/client";

// Account size'ga mos narxlar (UZS)
const PRICE_MAP: Record<AccountSize, number> = {
  SIZE_5K:   500_000,
  SIZE_10K:  900_000,
  SIZE_25K:  1_800_000,
  SIZE_50K:  3_200_000,
  SIZE_100K: 5_500_000,
};

export async function POST(req: NextRequest) {
  try {
    // ─── 1. Auth tekshirish ──────────────────────────────────────────────
    const session = await requireAuth();

    // ─── 2. Input validate ──────────────────────────────────────────────
    const body = await req.json();
    const parsed = createPropAccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Noto'g'ri ma'lumot", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { accountSize, challengeType } = parsed.data;
    const amount = PRICE_MAP[accountSize as AccountSize];

    // ─── 3. PropAccount (PENDING) va Transaction yaratish ───────────────
    const [propAccount, transaction] = await prisma.$transaction(async (tx) => {
      const pa = await tx.propAccount.create({
        data: {
          userId: session.user.id,
          accountSize: accountSize as AccountSize,
          challengeType: challengeType as ChallengeType,
          status: "PENDING",
        },
      });

      const tr = await tx.transaction.create({
        data: {
          userId: session.user.id,
          propAccountId: pa.id,
          amount,
          currency: "UZS",
          status: "PENDING",
          paymentMethod: "CLICK",
          description: `PropAccount: ${accountSize} - ${challengeType}`,
        },
      });

      return [pa, tr];
    });

    // ─── 4. Click Invoice URL generatsiya ────────────────────────────────
    // Click.uz sayti uchun redirect URL
    const clickParams = new URLSearchParams({
      service_id: process.env.CLICK_SERVICE_ID!,
      merchant_id: process.env.CLICK_MERCHANT_ID!,
      amount: String(amount),
      transaction_param: transaction.merchantTransId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    });

    const clickInvoiceUrl = `https://my.click.uz/services/pay?${clickParams.toString()}`;

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      merchantTransId: transaction.merchantTransId,
      amount,
      clickInvoiceUrl,
    });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Avtorizatsiya talab etiladi" }, { status: 401 });
    }
    console.error("[CLICK_CREATE]", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
