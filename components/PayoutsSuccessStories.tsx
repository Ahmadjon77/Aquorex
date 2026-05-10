'use client'

import { motion } from 'framer-motion'

export function PayoutsSuccessStories() {
  const traders = [
    { country: 'India', name: 'Trader 1', earnings: '$1345', profit: '$1345' },
    { country: 'India', name: 'Trader 2', earnings: '$1900.50', profit: '$1900.50' },
    { country: 'India', name: 'Trader 3', earnings: '$50.00', profit: '$50.00' },
    { country: 'India', name: 'Trader 4', earnings: '$256.00', profit: '$256.00' },
    { country: 'Germany', name: 'Trader 5', earnings: '$785.00', profit: '$785.00' },
    { country: 'Netherlands', name: 'Trader 6', earnings: '$750', profit: '$750' },
    { country: 'Canada', name: 'Trader 7', earnings: '$695', profit: '$695' },
    { country: 'Germany', name: 'Trader 8', earnings: '$95.00', profit: '$95.00' },
    { country: 'South Korea', name: 'Trader 9', earnings: '$1296.00', profit: '$1296.00' },
    { country: 'India', name: 'Trader 10', earnings: '$1156.87', profit: '$1156.87' },
    { country: 'India', name: 'Trader 11', earnings: '$145.50', profit: '$145.50' },
    { country: 'Canada', name: 'Trader 12', earnings: '$589.40', profit: '$589.40' },
  ]

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Background Globe Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 opacity-10 pointer-events-none"
        >
          <div className="w-full h-full rounded-full border border-cyan-500/30">
            <div className="w-full h-full rounded-full border border-cyan-500/20" style={{ transform: 'scale(0.7)' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Payouts & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trade the way you want, how you want, for as long as you want.
          </p>
        </motion.div>

        {/* $500K+ Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-600/30 to-blue-700/20 backdrop-blur-sm p-12 mb-8"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl md:text-7xl font-black text-white mb-2"
              >
                $500K <span className="text-cyan-400">Plus</span>
              </motion.h3>
              <p className="text-xl text-cyan-400 font-bold">
                Earned by Traders Globally at Aquorex
              </p>
            </div>

            {/* Traders Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {traders.map((trader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="relative rounded-xl border border-blue-400/30 bg-blue-900/40 backdrop-blur p-4 hover:border-cyan-400/50 transition-all overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 transition-all"></div>

                    <div className="relative z-10">
                      <div className="text-xs text-gray-400 mb-1 opacity-70">{trader.country}</div>
                      <div className="text-2xl font-black text-cyan-400 mb-2">{trader.earnings}</div>

                      {/* Mini Chart */}
                      <div className="h-10 flex items-center gap-1">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: Math.random() * 100 + '%' }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                            className="flex-1 bg-gradient-to-t from-cyan-400/60 to-blue-400/40 rounded-sm opacity-60"
                          ></motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 text-sm max-w-2xl mx-auto"
        >
          Real stories from real traders—hear firsthand why so many trust Aquorex and for their trading journey, from evaluations to success in the markets.
        </motion.p>
      </div>
    </section>
  )
}
