'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const paymentMethods = [
  { src: '/images/visa.png', alt: 'Visa', bg: 'bg-blue-900/80' },
  { src: '/images/mastercard.png', alt: 'Mastercard', bg: 'bg-gray-900/80' },
  { src: '/images/btc.png', alt: 'Bitcoin', bg: 'bg-orange-950/80' },
  { src: '/images/usdt.png', alt: 'USDT', bg: 'bg-emerald-950/80' },
  { src: '/images/usdc.png', alt: 'USDC', bg: 'bg-blue-950/80' },
]

const stats = [
  { icon: '/images/chart.png', value: 'Up to 100%', label: 'Profit Split' },
  { icon: '/images/medal.png', value: 'Every 24 Hours', label: 'Daily Rewards' },
  { icon: '/images/news.png', value: 'Allowed', label: 'News Trading' },
  { icon: '/images/usdc.png', value: '100% Refundable', label: 'Evaluation Fees' },
]

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 min-h-screen overflow-hidden pb-16">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur rounded-full border border-slate-700"
              >
                <span className="text-sm text-gray-300 font-medium">
                  #1 <span className="font-bold text-white">Fastest</span> Growing Prop Firm
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur rounded-full border border-slate-700"
              >
                <Image src="/images/mt5.png" alt="MT5" width={20} height={20} className="rounded object-contain" />
                <span className="text-sm text-gray-300 font-medium">MT5 Available</span>
              </motion.div>
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-5xl font-black text-white mb-4 leading-[1.05]"
            >
              Your Trading Journey
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Starts at Only $5
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-gray-300 mb-8 max-w-md leading-relaxed"
            >
              Aquorex funds professional traders to prove their skills with our capital.
              Enjoy faster payouts, and unlock unlimited growth potential.
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.10, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/auth/register')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all flex items-center gap-2 mb-10"
            >
              Get Funded Now
              <ArrowRight size={20} />
            </motion.button>

            {/* Payment Methods */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 flex-wrap"
>
        <span className="text-gray-400 text-sm font-medium">We accept:</span>
        <div className="flex gap-2 flex-wrap">
          {paymentMethods.map((pm) => (
          <motion.div
          key={pm.alt}
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ duration: 0.15 }}
          className={`w-16 h-11 rounded-xl ${pm.bg} border border-white/10 flex items-center justify-center p-2 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg`}
    >
      <Image src={pm.src} alt={pm.alt} width={44} height={32} className="object-contain w-full h-full" />
      </motion.div>
))}
  </div>
          </motion.div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-0"
          >
            {/* YouTube Video */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-blue-900/50">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/z1c-rQcMTpcnYE3x?rel=0&modestbranding=1"
                title="Aquorex Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Stats — video tagida */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15}}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-1.5 bg-black/30 backdrop-blur rounded-xl border border-slate-700/50 p-3 text-center"
                >
                  <div className="w-9 h-9 flex items-center justify-center">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-sm font-black text-cyan-400 leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}