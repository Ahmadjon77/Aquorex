'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const payouts = [
  { name: 'Jen', amount: '$1,565.83' },
  { name: 'Madshark', amount: '$1,356.83' },
  { name: 'Loth K', amount: '$495.00' },
  { name: 'Kim Ronk', amount: '$1,296.00' },
  { name: 'Abir Gupts', amount: '$1,156.87' },
  { name: 'Samrat Roy', amount: '$145.50' },
  { name: 'Davis', amount: '$692.84' },
  { name: 'Mike', amount: '$1,565.35' },
  { name: 'Dev', amount: '$1,900.50' },
  { name: 'Divyesh Patel', amount: '$50.00' },
  { name: 'Aditya R', amount: '$256.00' },
  { name: 'Julia', amount: '$785.00' },
  { name: 'Albert', amount: '$750.00' },
  { name: 'Ryan', amount: '$589.40' },
]

// Animated counter hook
function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [start, end, duration])
  return count
}

function StatCard({ value, suffix, label, duration }: {
  value: number
  suffix: string
  label: string
  duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, duration ?? 2000, inView)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-white mb-1">
        {suffix === '$' ? '$' : ''}{count.toLocaleString()}{suffix !== '$' ? suffix : ''}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function PayoutCard({ name, amount }: { name: string; amount: string }) {
  return (
    <div className="flex items-center gap-3 bg-slate-900/70 backdrop-blur border border-slate-700/50 rounded-xl px-4 py-3 min-w-[210px] shrink-0">
      {/* MT5 style card thumbnail */}
      <div className="w-16 h-11 rounded-lg bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-700/30 flex items-center justify-center overflow-hidden shrink-0 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
        <div className="text-center z-10">
          <div className="text-cyan-400/80 text-[8px] font-bold">AQUOREX</div>
          <div className="text-white text-[10px] font-black">{amount}</div>
        </div>
      </div>
      <div>
        <div className="text-white font-bold text-sm">{name}</div>
        <div className="text-cyan-400 font-black text-base">{amount}</div>
      </div>
    </div>
  )
}

// Laurel wreath SVG
function LaurelBadge({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-20 flex items-center justify-center">
        {/* Left laurel */}
        <svg className="absolute left-0 top-0 h-full opacity-80" viewBox="0 0 30 80" fill="none">
          {[10,16,22,28,34,40,46,52,58].map((y, i) => (
            <ellipse key={i} cx="20" cy={y} rx="10" ry="5" fill="white" opacity={0.15 + i*0.05} transform={`rotate(-25 20 ${y})`} />
          ))}
        </svg>
        {/* Right laurel */}
        <svg className="absolute right-0 top-0 h-full opacity-80" viewBox="0 0 30 80" fill="none">
          {[10,16,22,28,34,40,46,52,58].map((y, i) => (
            <ellipse key={i} cx="10" cy={y} rx="10" ry="5" fill="white" opacity={0.15 + i*0.05} transform={`rotate(25 10 ${y})`} />
          ))}
        </svg>
        {/* Center text */}
        <div className="z-10 text-center">
          <div className="text-white font-black text-xs leading-tight">{text}</div>
          <div className="text-gray-400 text-[10px] mt-0.5">2025</div>
        </div>
      </div>
    </div>
  )
}

export function PayoutsSuccessStories() {
  const doubled = [...payouts, ...payouts]

  return (
    <section className="bg-slate-950 py-8 overflow-hidden">
      {/* ── Scrolling payout cards ── */}
      <div className="relative mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: [0, -220 * payouts.length] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' } }}
          className="flex gap-3 w-max"
        >
          {doubled.map((p, i) => (
            <PayoutCard key={i} {...p} />
          ))}
        </motion.div>
      </div>

      {/* ── Stats banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-blue-950/80 border border-blue-800/30 px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">

            {/* $500k+ */}
            <StatCard value={500} suffix="k+" label="Paid to Traders" duration={2000} />

            {/* 12k */}
            <StatCard value={12} suffix="k" label="Traders" duration={1500} />

            {/* 130+ */}
            <StatCard value={130} suffix="+" label="Countries Served" duration={1800} />

            {/* BEST PROPFIRM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <LaurelBadge text={"BEST\nPROPFIRM"} />
            </motion.div>

            {/* FASTER PAYOUTS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <LaurelBadge text={"FASTER\nPAYOUTS"} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}