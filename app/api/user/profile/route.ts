// app/api/user/profile/route.ts
// Foydalanuvchi profili va o'zining prop accountlarini ko'rish

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // ─── Session tekshirish (himoyalangan route) ─────────────────────────
    const session = await requireAuth();

    // ─── Faqat o'zining ma'lumotlarini olish ────────────────────────────
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        balance: true,
        createdAt: true,
        propAccounts: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            accountSize: true,
            challengeType: true,
            status: true,
            currentBalance: true,
            startedAt: true,
            createdAt: true,
          },
        },
        transactions: {
          orderBy: { createdAt: "desc" },
          take: 10, // oxirgi 10 ta
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Avtorizatsiya talab etiladi" }, { status: 401 });
    }
    console.error("[USER_PROFILE]", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
