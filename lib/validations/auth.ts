// lib/validations/auth.ts
// Zod schemalar - barcha input ma'lumotlarini tekshirish

import { z } from "zod";

// ─── Auth schemalar ───────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email kiritish shart")
    .email("Noto'g'ri email format"),
  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak")
    .max(100, "Parol juda uzun"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak")
      .max(50, "Ism juda uzun")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Ismda faqat harflar bo'lishi kerak"),
    email: z.string().email("Noto'g'ri email format"),
    password: z
    .string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Parolda katta harf, kichik harf va raqam bo'lishi kerak"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmayapti",
    path: ["confirmPassword"],
  });

// ─── PropAccount schemalar ────────────────────────────────────────────────────

export const createPropAccountSchema = z.object({
  accountSize: z.enum(
    ["SIZE_5K", "SIZE_10K", "SIZE_25K", "SIZE_50K", "SIZE_100K"],
    { errorMap: () => ({ message: "Noto'g'ri account hajmi" }) }
  ),
  challengeType: z.enum(["STRIKE_1", "INSTANT", "ONE_STEP", "TWO_STEP"], {
    errorMap: () => ({ message: "Noto'g'ri challenge turi" }),
  }),
});

// ─── Click.uz schemalar ───────────────────────────────────────────────────────

export const clickPrepareSchema = z.object({
  click_trans_id: z.string(),
  service_id: z.string(),
  click_paydoc_id: z.string(),
  merchant_trans_id: z.string(),
  amount: z.string().or(z.number()),
  action: z.string(),
  error: z.string().or(z.number()),
  error_note: z.string(),
  sign_time: z.string(),
  sign_string: z.string(),
});

export const clickCompleteSchema = clickPrepareSchema.extend({
  merchant_prepare_id: z.string(),
});

// ─── TypeScript types (Zod'dan) ───────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreatePropAccountInput = z.infer<typeof createPropAccountSchema>;
