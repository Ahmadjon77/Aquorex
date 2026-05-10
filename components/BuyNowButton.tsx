// components/BuyNowButton.tsx
// "Start Challenge" tugmasi - to'lov sahifasiga yo'naltiradi
// TradingModels.tsx dagi tugmani shu bilan almashtiring

"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BuyNowButtonProps {
  accountSize: string;   // e.g. "SIZE_5K"
  challengeType: string; // e.g. "STRIKE_1"
  label?: string;
  className?: string;
}

export function BuyNowButton({
  accountSize,
  challengeType,
  label = "Start Challenge",
  className = "",
}: BuyNowButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    // ─── Avtorizatsiya yo'q → Login sahifasiga ───────────────────────────
    if (!session) {
      signIn(undefined, { callbackUrl: "/" });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ─── Backend API ga so'rov yuborish ──────────────────────────────
      const res = await fetch("/api/payment/click/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountSize, challengeType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Xatolik yuz berdi");
      }

      // ─── Click.uz sahifasiga yo'naltirish ────────────────────────────
      window.location.href = data.clickInvoiceUrl;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        onClick={handleBuy}
        disabled={loading}
        className={`
          w-full py-3 rounded-lg font-bold transition-all
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white
          hover:shadow-lg hover:shadow-blue-500/50
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${className}
        `}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Yuklanmoqda...
          </>
        ) : (
          label
        )}
      </motion.button>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}

// ─── Qo'llash: TradingModels.tsx da ──────────────────────────────────────────
//
//  import { BuyNowButton } from "@/components/BuyNowButton"
//
//  // selectedPath va selectedSize state'lardan keladi
//  <BuyNowButton
//    accountSize={sizeMap[selectedSize]}   // e.g. "SIZE_5K"
//    challengeType={pathMap[selectedPath]} // e.g. "STRIKE_1"
//  />
