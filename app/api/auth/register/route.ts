// app/api/auth/register/route.ts
// Yangi foydalanuvchi ro'yxatdan o'tkazish

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ─── 1. Zod bilan validate ───────────────────────────────────────────
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
    const parsedError = parsed.error; // explicitly type parsed.error
    return NextResponse.json(
    { error: "Validation xatosi", details: parsedError.flatten().fieldErrors },
    { status: 400 }
  );
}
  

    const { name, email, password } = parsed.data;

    // ─── 2. Email mavjudligini tekshirish ────────────────────────────────
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email allaqachon ro'yxatdan o'tgan" },
        { status: 409 }
      );
    }

    // ─── 3. Parolni hash qilish (bcrypt, salt=12) ────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    // ─── 4. Foydalanuvchi yaratish (Prisma - SQL Injection yo'q) ─────────
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return NextResponse.json(
      { message: "Ro'yxatdan o'tish muvaffaqiyatli", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER]", error);
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    );
  }
}
