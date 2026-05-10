// app/layout.tsx (yangilangan versiya)
// SessionProvider qo'shing - mavjud layout.tsx ga shu o'zgartirishni kiriting

import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";
// ... boshqa importlar saqlanadi

export const metadata: Metadata = {
  title: "Aquorex - Prop Trading Firm",
  description: "Trade with our capital, keep your profits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* SessionProvider barcha Client Component'lar uchun session beradi */}
        <SessionProvider>
          {/* Mavjud theme-provider va boshqa wrapper'lar shu yerda */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
