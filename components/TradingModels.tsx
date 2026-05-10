'use client'

import { motion } from 'framer-motion'
import { Zap, Calendar, BarChart3, Infinity, NewspaperIcon, DollarSign, Users, ArrowLeftRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const chooseFeatures = [
  { icon: Zap, title: 'Zero Restrictive Rules', description: 'No consistency rules, news trading allowed, and flexible strategies. You trade your way, with our capital.' },
  { icon: Calendar, title: 'Payouts Every 7 Days', description: 'Get paid faster than the industry standard. Withdraw profits every 7 business days after your first trade.' },
  { icon: BarChart3, title: 'Scaling & Funding Up to $200K', description: 'Start with a challenge and unlock funding up to $250,000. Perform well and grow with our dynamic model.' },
  { icon: DollarSign, title: 'Up to 100% Profit Split', description: 'Keep what you earn with zero hidden conditions. We reward pure performance, not restrictions.' },
  { icon: NewspaperIcon, title: 'Industry-Leading Affiliate Program', description: 'Earn up to 15% commission and receive free funded accounts at every tier. Turn referrals into real capital.' },
  { icon: Users, title: 'Professional Community', description: 'Join thousands of funded traders in our exclusive community for strategies, insights, and support.' }
]

const advancedFeatures = [
  { icon: Infinity, title: 'Unlimited Trading Period', description: 'There is no Maximum Time limit with AQUOREX, so you can trade patiently.' },
  { icon: Calendar, title: '10 Day Payout Process', description: 'Receive your payout in as soon as just 10 business days.' },
  { icon: Plus, title: 'Extra Add Ons', description: 'Choose from a variety of add-ons to enhance your Trading Journey' },
  { icon: NewspaperIcon, title: 'News Trading Allowed', description: 'We allow our traders to benefit from News Trading during their Evaluation' },
  { icon: DollarSign, title: 'Balance Based Drawdown', description: 'Experience fair trading conditions with our Balance Based Drawdown.' },
  { icon: ArrowLeftRight, title: 'Competitive Spreads', description: 'Choose from a variety of add-ons to enhance your Trading Journey' }
]

// Har bir path va size uchun narxlar
const PRICES: Record<string, Record<string, number>> = {
  'strike-1': { '$5k': 40, '$10k': 75, '$25k': 160, '$50k': 280, '$100k': 500 },
  'instant':  { '$5k': 55, '$10k': 95, '$25k': 200, '$50k': 350, '$100k': 650 },
  '1-step':   { '$5k': 35, '$10k': 65, '$25k': 140, '$50k': 250, '$100k': 440 },
  '2-step':   { '$5k': 30, '$10k': 55, '$25k': 120, '$50k': 210, '$100k': 380 },
}

// Har bir path uchun funded account ma'lumotlari
const FUNDED_ACCOUNTS: Record<string, { title: string; description: string; stats: { icon: string; label: string; value: string }[] }[]> = {
  'strike-1': [
    {
      title: '1. STRIKE ACCOUNT',
      description: 'Pass the Strike-1 challenge and get instantly funded. No phase 2 required.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: '10%' },
        { icon: '📉', label: 'Daily Drawdown', value: '4%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '8%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '5' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 90%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '2. FUNDED ACCOUNT',
      description: 'After passing Strike, receive your funded account with full capital.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: 'N/A' },
        { icon: '📉', label: 'Daily Drawdown', value: '3%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '6%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '3' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '3. SCALING PLAN',
      description: 'Grow your account up to $200K through our performance-based scaling plan.',
      stats: [
        { icon: '📈', label: 'Scaling Target', value: '10% per month' },
        { icon: '📉', label: 'Max Account Size', value: '$200,000' },
        { icon: '🎯', label: 'Scale Up By', value: '25% each time' },
        { icon: '📅', label: 'Review Period', value: 'Monthly' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    }
  ],
  'instant': [
    {
      title: '1. INSTANT FUNDED',
      description: 'Skip the challenge — get funded instantly and start trading right away.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: 'N/A' },
        { icon: '📉', label: 'Daily Drawdown', value: '2%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '3%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '5' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 80%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:50' },
      ]
    },
    {
      title: '2. PERFORMANCE BOOST',
      description: 'After 30 days of consistent trading, unlock performance boost rewards.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: '5% monthly' },
        { icon: '📉', label: 'Daily Drawdown', value: '3%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '5%' },
        { icon: '📅', label: 'Review Period', value: '30 days' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 90%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '3. ELITE FUNDED',
      description: 'Top performers get Elite status with premium conditions and higher capital.',
      stats: [
        { icon: '📈', label: 'Max Capital', value: '$200,000' },
        { icon: '📉', label: 'Daily Drawdown', value: '4%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '8%' },
        { icon: '📅', label: 'Elite Review', value: 'Quarterly' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:200' },
      ]
    }
  ],
  '1-step': [
    {
      title: '1. EVALUATION PHASE',
      description: 'Complete a single-phase evaluation with clear and simple rules.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: '8%' },
        { icon: '📉', label: 'Daily Drawdown', value: '4%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '8%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '5' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 90%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '2. FUNDED ACCOUNT',
      description: 'Pass evaluation once and trade with full funded capital immediately.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: 'N/A' },
        { icon: '📉', label: 'Daily Drawdown', value: '4%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '8%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '3' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '3. GROWTH PLAN',
      description: 'Scale your account up to $200K with consistent profitable trading.',
      stats: [
        { icon: '📈', label: 'Scaling Target', value: '8% per month' },
        { icon: '📉', label: 'Max Account Size', value: '$200,000' },
        { icon: '🎯', label: 'Scale Up By', value: '25%' },
        { icon: '📅', label: 'Review Period', value: 'Monthly' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    }
  ],
  '2-step': [
    {
      title: '1. PHASE ONE',
      description: 'First evaluation phase — prove your skill with a 8% profit target.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: '8%' },
        { icon: '📉', label: 'Daily Drawdown', value: '5%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '10%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '5' },
        { icon: '💰', label: 'Profit Split', value: 'N/A' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '2. PHASE TWO',
      description: 'Second evaluation phase — confirm consistency with a 5% profit target.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: '5%' },
        { icon: '📉', label: 'Daily Drawdown', value: '5%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '10%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '5' },
        { icon: '💰', label: 'Profit Split', value: 'N/A' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    },
    {
      title: '3. FUNDED ACCOUNT',
      description: 'Pass both phases and trade with full capital. Payouts every 7 days.',
      stats: [
        { icon: '📈', label: 'Profit Target', value: 'N/A' },
        { icon: '📉', label: 'Daily Drawdown', value: '5%' },
        { icon: '🎯', label: 'Maximum Drawdown', value: '10%' },
        { icon: '📅', label: 'Minimum Trading Days', value: '3' },
        { icon: '💰', label: 'Profit Split', value: 'Upto 100%' },
        { icon: '⚡', label: 'Trading Leverage', value: 'Up to 1:100' },
      ]
    }
  ]
}

const SIZES = ['$5K', '$10K', '$25K', '$50K', '$100K']
const PATHS = ['Strike-1', 'Instant', '1-Step', '2-Step']

export function TradingModels() {
  const [selectedPath, setSelectedPath] = useState('strike-1')
  const [selectedSize, setSelectedSize] = useState('$5k')
  const router = useRouter()

  const price = PRICES[selectedPath]?.[selectedSize.toLowerCase()] ?? 40
  const fundedAccounts = FUNDED_ACCOUNTS[selectedPath] ?? FUNDED_ACCOUNTS['strike-1']

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION 1: Choose Your Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Account</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Trade the way you want, how you want, for as long as you want.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {chooseFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="group relative">
                <div className="relative h-full rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/50 to-slate-950/70 backdrop-blur p-8 hover:border-cyan-500/50 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }} className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-400 origin-left" />
                  <div className="relative z-10">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:border-cyan-500/70 transition-all">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* SECTION 2: Funding Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
            Select Your <span className="text-gray-400">Funding Plan</span>
          </h2>
          <p className="text-gray-400 mb-12">Choose from multiple account sizes and trading phases with transparent rules, fair targets, and full refunds.</p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { number: '01', title: 'Choose', description: 'Select the account size you wish to trade and customise it at the Checkout.' },
              { number: '02', title: 'Trade', description: 'Trade the Instant Funding, 1-phase, 2-phase or 3-phase programs.' },
              { number: '03', title: 'Get Funded', description: 'Trade up to $200,000 starting capital after passing the assessment.' }
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative group">
                <div className="relative rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/40 to-slate-950/60 backdrop-blur p-8 h-full hover:border-blue-500/50 transition-all">
                  <div className="text-6xl font-black text-gray-700 mb-4 opacity-30">{step.number}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trading Path */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Choose your Trading Path</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PATHS.map((path) => (
                <motion.button
                  key={path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPath(path.toLowerCase())}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    selectedPath === path.toLowerCase()
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                      : 'border border-slate-700 text-gray-400 hover:border-slate-600'
                  }`}
                >
                  {path}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Account Size + Price Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4">Select Account Size</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {SIZES.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size.toLowerCase())}
                    className={`py-3 rounded-lg font-bold transition-all ${
                      selectedSize === size.toLowerCase()
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                        : 'border border-slate-700 text-gray-400 hover:border-slate-600'
                    }`}
                  >
                    🔥 {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Card */}
            <motion.div
              key={`${selectedPath}-${selectedSize}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-blue-600/40 to-blue-700/40 backdrop-blur p-8 flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-sm font-bold text-orange-400 mb-4">
                  🔥 Best Value
                </div>
                <div className="text-xs text-gray-400 mb-3">START NOW AT ONLY</div>
                <motion.div
                  key={price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black text-white mb-1"
                >
                  ${price} <span className="text-xl text-orange-400 ml-1">🔥</span>
                </motion.div>
                <div className="text-gray-400 text-sm mt-2">
                  {selectedSize.toUpperCase()} account — {selectedPath.toUpperCase()}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/login')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all mt-6"
              >
                Start Challenge
              </motion.button>
            </motion.div>
          </div>

          {/* Funded Account Details — 3 ta */}
          <div className="mt-12 space-y-6">
            {fundedAccounts.map((account, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/50 to-slate-950/70 backdrop-blur p-8"
              >
                <h3 className="text-xl font-bold text-white mb-2">{account.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{account.description}</p>
                <div className="space-y-4">
                  {account.stats.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-400">{item.icon} {item.label}</span>
                      <span className="text-cyan-400 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 3: Advanced Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">Aquorex Funding</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Advanced Features</span>
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Trade the way you want, how you want, for as long as you want.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="group relative">
                <div className="relative h-full rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/50 to-slate-950/70 backdrop-blur p-8 hover:border-cyan-500/50 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }} className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-400 origin-left" />
                  <div className="relative z-10">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:border-cyan-500/70 transition-all">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}