// components/providers/SessionProvider.tsx
// NextAuth SessionProvider - app/layout.tsx da wrap qilish uchun

"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
