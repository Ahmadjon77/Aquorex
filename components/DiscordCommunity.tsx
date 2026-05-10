'use client'

import { motion } from 'framer-motion'
import { Radio, MessageSquare, Compass, Users } from 'lucide-react'

const communityFeatures = [
  { icon: Radio, label: 'Trade Ideas', description: 'Share and discuss trading strategies' },
  { icon: MessageSquare, label: 'Community Chat', description: 'Connect with other traders' },
  { icon: Compass, label: 'Daily Gameplans', description: 'Get daily market analysis' },
  { icon: Users, label: 'Chat with Founders', description: 'Direct access to leadership' },
]

export function DiscordCommunity() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl"></div>
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
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              Join Our Traders
              <br />
              Community on <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Discord</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 max-w-lg"
            >
              To win the game, you need strong support and diligent preparation. For Traders.
            </motion.p>

            {/* Feature Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {communityFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.button
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative px-6 py-4 bg-slate-950 rounded-full flex items-center gap-3 hover:bg-slate-900 transition-all">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-cyan-400/50">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-white font-semibold">{feature.label}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Join Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 w-fit"
            >
              <span>💬</span>
              Join the Community
            </motion.button>
          </motion.div>

          {/* Right Content - 3D Discord Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative w-64 h-64"
            >
              {/* Discord Icon Simulation - rounded rectangle with eyes */}
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-br from-blue-600/40 to-slate-900/60 backdrop-blur flex items-center justify-center overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20"></div>

                {/* Discord face */}
                <div className="relative z-10">
                  <div className="w-32 h-32 flex items-center justify-center">
                    {/* Eyes */}
                    <div className="absolute top-8 flex gap-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        className="w-8 h-8 rounded-full bg-cyan-400/80 border border-cyan-300"
                      ></motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        className="w-8 h-8 rounded-full bg-cyan-400/80 border border-cyan-300"
                      ></motion.div>
                    </div>
                    {/* Mouth */}
                    <motion.div
                      animate={{ scaleY: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      className="absolute top-20 w-12 h-6 border-2 border-cyan-400/60 rounded-b-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Floating particles around icon */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: Math.cos((i / 6) * Math.PI * 2) * 100,
                    y: Math.sin((i / 6) * Math.PI * 2) * 100,
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute w-3 h-3 rounded-full bg-cyan-400/40 blur-sm"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-6px',
                    marginLeft: '-6px',
                  }}
                ></motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
