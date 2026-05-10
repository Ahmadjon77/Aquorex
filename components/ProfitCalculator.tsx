'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ProfitCalculator() {
  const [accountSize, setAccountSize] = useState(25000)
  const [profitRate, setProfitRate] = useState(22)

  const monthlyProfit = Math.round((accountSize * profitRate) / 100 * 0.8)
  const yearlyProfit = monthlyProfit * 12

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              How Much
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Can You Make?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
            >
              Discover the potential to earn your desired income through trading without risking your own capital
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Get Funded
            </motion.button>
          </motion.div>

          {/* Right Content - Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl border border-blue-500/50 bg-gradient-to-br from-blue-600/30 to-blue-700/20 backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0"></div>

              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">Estimate your profits</h3>
                <p className="text-gray-400 text-sm mb-8">Account size</p>

                {/* Account Size Display */}
                <motion.div
                  key={accountSize}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-black text-white mb-6 text-center"
                >
                  ${(accountSize / 1000).toFixed(0)}K
                </motion.div>

                {/* Account Size Slider */}
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setAccountSize(Math.max(5000, accountSize - 5000))}
                    className="w-10 h-10 rounded-full border border-slate-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center justify-center font-bold"
                  >
                    −
                  </button>

                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={accountSize}
                    onChange={(e) => setAccountSize(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-400"
                  />

                  <button
                    onClick={() => setAccountSize(Math.min(100000, accountSize + 5000))}
                    className="w-10 h-10 rounded-full border border-slate-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Profit Rate */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">Profit Rate</span>
                    <span className="text-cyan-400 font-bold">{profitRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={profitRate}
                    onChange={(e) => setProfitRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-slate-700 via-cyan-500/50 to-slate-700 mb-8"></div>

                {/* Estimated Profit */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-3">Your Estimated Profit (On 80% Profit Split)</p>
                  <motion.div
                    key={monthlyProfit}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-black text-cyan-400 mb-2"
                  >
                    ${monthlyProfit.toLocaleString()}
                  </motion.div>
                  <p className="text-gray-400 text-sm">/month</p>
                  <p className="text-gray-500 text-xs mt-3">
                    Yearly: ${yearlyProfit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
