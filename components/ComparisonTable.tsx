'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const features = [
  { label: 'Broker Backed',        aquorex: true,      ftmo: false,     fundedNext: false },
  { label: 'Rapid Evaluation',     aquorex: true,      ftmo: false,     fundedNext: false },
  { label: 'Max Allocation',       aquorex: '$100K',   ftmo: '$100K',   fundedNext: '$200K' },
  { label: 'Minimum Trading Days', aquorex: '3 Days',  ftmo: '14 Days', fundedNext: '8 Days' },
  { label: 'Weekend Holding',      aquorex: true,      ftmo: false,     fundedNext: false },
  { label: '1 Step Challenge',     aquorex: true,      ftmo: false,     fundedNext: true },
  { label: 'News Trading',         aquorex: true,      ftmo: false,     fundedNext: true },
  { label: 'Profit Split',         aquorex: '100%',    ftmo: '90%',     fundedNext: '90%' },
]

function AquorexCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-green-400 mx-auto" strokeWidth={2.5} />
      : <X className="w-5 h-5 text-white/40 mx-auto" strokeWidth={2} />
  }
  return <span className="text-white font-bold text-sm">{value}</span>
}

function OtherCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-green-500/70 mx-auto" strokeWidth={2.5} />
      : <X className="w-5 h-5 text-gray-600 mx-auto" strokeWidth={2} />
  }
  return <span className="text-gray-400 text-sm">{value}</span>
}

export function ComparisonTable() {
  const router = useRouter()

  return (
    <section className="bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            <span className="text-gray-400 font-light">How </span>
            <span className="text-white font-black">we compare?</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Discover how Aquorex Funding stands out in the industry and compares to other leading prop firms.
          </p>
        </motion.div>

        {/* Table wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden border border-slate-800/60"
          style={{ background: 'rgba(10,12,20,0.95)' }} 
        >
          {/* Column headers row */}
          <div className="grid grid-cols-4">
            {/* Empty label col */}
            <div className="border-b border-slate-800/60 px-6 py-5" />

            {/* Aquorex header */}
            <div
              className="relative border-b border-blue-500/30 px-4 py-5 flex flex-col items-center gap-1.5"
              style={{
                background: 'linear-gradient(160deg, #2563eb 0%, #1d4ed8 40%, #1e3a8a 100%)',
                boxShadow: '0 0 40px rgba(37,99,235,0.3)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-white font-black text-lg">Aquorex</span>
              </div>
            </div>

            {/* FTMO */}
            <div className="border-b border-slate-800/60 px-4 py-5 flex items-center justify-center bg-slate-950/50">
              <span className="text-gray-600 text-sm font-medium blur-[3px] select-none">● FTMO</span>
            </div>

            {/* FundedNext */}
            <div className="border-b border-slate-800/60 px-4 py-5 flex items-center justify-center bg-slate-950/50">
              <span className="text-gray-600 text-sm font-medium blur-[3px] select-none">● FundedNext</span>
            </div>
          </div>

          {/* Rows */}
          {features.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 items-center ${i !== features.length - 1 ? 'border-b border-slate-800/40' : ''}`}
            >
              {/* Label */}
              <div className="px-6 py-4">
                <span className="text-gray-300 text-sm font-semibold">{row.label}</span>
              </div>

              {/* Aquorex cell */}
              <div
                className="px-4 py-4 flex justify-center border-x border-blue-600/20"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(180deg, rgba(37,99,235,0.18) 0%, rgba(29,78,216,0.12) 100%)'
                    : 'linear-gradient(180deg, rgba(29,78,216,0.12) 0%, rgba(30,58,138,0.10) 100%)',
                }}
              >
                <AquorexCell value={row.aquorex} />
              </div>

              {/* FTMO */}
              <div className="px-4 py-4 flex justify-center bg-slate-950/40">
                <OtherCell value={row.ftmo} />
              </div>

              {/* FundedNext */}
              <div className="px-4 py-4 flex justify-center bg-slate-950/40">
                <OtherCell value={row.fundedNext} />
              </div>
            </div>
          ))}

          {/* Bottom blue indicator under Aquorex */}
          <div className="grid grid-cols-4">
            <div />
            <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-b-full" />
            <div />
            <div />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => router.push('/auth/register')}
            className="px-10 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-base hover:shadow-xl hover:shadow-blue-500/30 transition-shadow"
          >
            Get Funded
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}