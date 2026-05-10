'use client'

import { motion } from 'framer-motion'
import { Zap, Clock, TrendingUp, BarChart3, Gift, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Zero Restrictive Rules',
    description: 'No consistency rules, news trading allowed, and flexible strategies. You trade your way, with our capital.',
  },
  {
    icon: Clock,
    title: 'Payouts Every 7 Days',
    description: 'Get paid faster than the industry standard. Withdraw profits every 7 business days after your first trade.',
  },
  {
    icon: TrendingUp,
    title: 'Profit Split Upto 100%',
    description: 'Keep what you earn with zero hidden conditions. We reward pure performance, not restrictions.',
  },
  {
    icon: BarChart3,
    title: 'Scaling & Funding Up to $200K',
    description: 'Start with a challenge and unlock funding up to $250,000. Perform well and grow with our dynamic model.',
  },
  {
    icon: Gift,
    title: 'Industry-Leading Affiliate',
    description: 'Earn up to 15% commission and receive free funded accounts at every tier. Turn your referrals into real capital.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Trade from anywhere in the world with our secure, reliable platform and 24/7 customer support.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Advanced <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trade the way you want, how you want, for as long as you want.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="relative rounded-xl border border-slate-700 group-hover:border-cyan-500/50 bg-slate-800/30 backdrop-blur-sm p-8 transition-all duration-300">
                  {/* Top accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-xl"
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-6 inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30"
                  >
                    <Icon size={28} className="text-cyan-400" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="my-16 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-left"
        />

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Why Aquorex?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;re not just another prop firm. We&apos;re committed to providing the best trading conditions, fastest payouts, and most competitive profit splits in the industry. Join thousands of traders who have already been funded.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
