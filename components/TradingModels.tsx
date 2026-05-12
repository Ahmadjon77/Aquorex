'use client'
 
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
 
// ─── Choose Your Account — Visual cardlar ────────────────────────────────────
const chooseFeatures = [
  {
    title: 'Zero Restrictive Rules',
    description: 'No consistency rules, news trading allowed, and flexible strategies. You trade your way, with our capital.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="absolute top-0 right-8 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-bounce" />
          <div className="absolute bottom-2 left-8 w-2 h-2 rounded-full bg-blue-400 blur-sm animate-bounce delay-300" />
          <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-sm animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    title: 'Payouts Every 7 Days',
    description: 'Get paid faster than the industry standard. Withdraw profits every 7 business days after your first trade.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative">
          <div className="w-24 h-28 rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-b from-blue-900/60 to-blue-950/80 flex flex-col items-center justify-start pt-3 gap-1 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex gap-0.5 px-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i < 4 ? 'bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.8)]' : 'bg-slate-700'}`} />
              ))}
            </div>
            <div className="text-cyan-400 font-black text-5xl mt-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">7</div>
            <div className="text-cyan-300/80 text-xs font-bold tracking-widest">DAYS</div>
          </div>
          <div className="absolute -bottom-2 -right-4 w-10 h-10 rounded-full border-2 border-cyan-400/40 bg-blue-950 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Scaling & Funding Up to $200K',
    description: 'Start with a challenge and unlock funding up to $250,000. Perform well and grow with our dynamic model.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative mt-4">
          <div className="w-32 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] rotate-[-6deg]">
            <div className="text-center rotate-[6deg]">
              <div className="text-white font-black text-2xl drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">$200K</div>
              <div className="text-cyan-400/70 text-xs mt-0.5 tracking-wider">FUNDING</div>
            </div>
          </div>
          <div className="absolute -top-4 right-0 w-20 h-16 rounded-xl bg-gradient-to-br from-blue-700/20 to-cyan-600/10 border border-cyan-400/20 rotate-[8deg]" />
          <div className="absolute -bottom-2 -left-4 w-12 h-9 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-700/10 border border-cyan-400/15 rotate-[-12deg]" />
        </div>
      </div>
    ),
  },
  {
    title: 'Profit Split Upto 100%',
    description: 'Keep what you earn with zero hidden conditions. We reward pure performance, not restrictions.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative">
          <span className="text-[4.5rem] font-black leading-none bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            100%
          </span>
        </div>
      </div>
    ),
  },
  {
    title: 'Industry-Leading Affiliate Program',
    description: 'Earn up to 15% commission and receive free funded accounts at every tier. Turn referrals into real capital.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400/20 rounded" />
            <div className="w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400/20 rounded" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400/20 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-300" fill="currentColor">
                <circle cx="12" cy="8" r="4"/><path d="M20 19c0-4-3.6-7-8-7s-8 3-8 7"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-cyan-400/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-300" fill="currentColor">
                <circle cx="12" cy="8" r="4"/><path d="M20 19c0-4-3.6-7-8-7s-8 3-8 7"/>
              </svg>
            </div>
          </div>
          <div className="absolute -top-3 right-0 w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <span className="text-cyan-400 font-black text-sm">$</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Professional Community',
    description: 'Join thousands of funded traders in our exclusive community for strategies, insights, and support.',
    visual: (
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent rounded-xl" />
        <div className="relative flex items-center">
          {[
            { size: 'w-14 h-14' },
            { size: 'w-12 h-12' },
            { size: 'w-14 h-14' },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.size} rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/25 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
              style={{ marginLeft: i > 0 ? '-10px' : '0', zIndex: 3 - i }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-cyan-400" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
              </svg>
            </div>
          ))}
          <div className="ml-3 flex flex-col">
            <span className="text-cyan-400 font-black text-2xl drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">+12k</span>
            <span className="text-gray-400 text-xs">Traders</span>
          </div>
        </div>
      </div>
    ),
  },
]
 
// ─── Advanced Features — katta ikonkalar, markazda ───────────────────────────
const advancedFeatures = [
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
    title: 'Unlimited Trading Period',
    description: 'There is no Maximum Time limit with AQUOREX, so you can trade patiently.',
  },
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <div className="text-center">
            <div className="text-cyan-400 font-black text-2xl leading-none drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">10</div>
            <div className="text-cyan-300/70 text-[9px] font-bold tracking-wider">DAYS</div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    ),
    title: '10 Day Payout Process',
    description: 'Receive your payout in as soon as just 10 business days.',
  },
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-cyan-400" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-lg bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>
      </div>
    ),
    title: 'Extra Add Ons',
    description: 'Choose from a variety of add-ons to enhance your Trading Journey.',
  },
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-cyan-400" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
      </div>
    ),
    title: 'News Trading Allowed',
    description: 'We allow our traders to benefit from News Trading during their Evaluation.',
  },
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    ),
    title: 'Balance Based Drawdown',
    description: 'Experience fair trading conditions with our Balance Based Drawdown.',
  },
  {
    visual: (
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border-2 border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    ),
    title: 'Competitive Spreads',
    description: 'Choose from a variety of add-ons to enhance your Trading Journey.',
  },
]
 
// ─── Pricing ─────────────────────────────────────────────────────────────────
const PRICES: Record<string, Record<string, number>> = {
  'strike-1': { '$5k': 40, '$10k': 75, '$25k': 160, '$50k': 280, '$100k': 500 },
  'instant':  { '$5k': 55, '$10k': 95, '$25k': 200, '$50k': 350, '$100k': 650 },
  '1-step':   { '$5k': 35, '$10k': 65, '$25k': 140, '$50k': 250, '$100k': 440 },
  '2-step':   { '$5k': 30, '$10k': 55, '$25k': 120, '$50k': 210, '$100k': 380 },
}
 
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
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-900/20 rounded-full blur-3xl" />
      </div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
        {/* ── SECTION 1: Choose Your Account ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-2">
            Choose Your <span className="text-cyan-400">Account</span>
          </h2>
          <p className="text-gray-400 text-base">Trade the way you want , how you want , for as long as you want.</p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-24">
          {chooseFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 to-slate-950/90 border border-blue-800/50 rounded-2xl group-hover:border-cyan-500/60 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl" />
              <div className="relative z-10 p-5">
                {feature.visual}
                <div className="mt-1">
                  <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* ── SECTION 2: Funding Plan ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
            Select Your <span className="text-gray-500">Funding Plan</span>
          </h2>
          <p className="text-gray-400 mb-12">Choose from multiple account sizes and trading phases with transparent rules, fair targets, and full refunds.</p>
 
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { number: '01', title: 'Choose', description: 'Select the account size you wish to trade and customise it at the Checkout.' },
              { number: '02', title: 'Trade', description: 'Trade the Instant Funding, 1-phase, 2-phase or 3-phase programs.' },
              { number: '03', title: 'Get Funded', description: 'Trade up to $200,000 starting capital after passing the assessment.' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden h-full" style={{ minHeight: '180px' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/95 to-slate-950 border border-blue-800/40 rounded-2xl group-hover:border-blue-600/60 transition-all duration-300" />
                  <div
                    className="absolute top-3 right-4 text-[7rem] font-black leading-none select-none pointer-events-none"
                    style={{ color: 'transparent', WebkitTextStroke: '1px rgba(99,130,255,0.15)' }}
                  >
                    {step.number}
                  </div>
                  <div className="relative z-10 p-7 flex flex-col justify-end h-full" style={{ minHeight: '180px' }}>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
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
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPath(path.toLowerCase())}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    selectedPath === path.toLowerCase()
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'border border-slate-700 text-gray-400 hover:border-slate-500 bg-slate-900/50'
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
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSize(size.toLowerCase())}
                    className={`py-3 rounded-xl font-bold transition-all text-sm ${
                      selectedSize === size.toLowerCase()
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'border border-slate-700 text-gray-400 hover:border-slate-500 bg-slate-900/50'
                    }`}
                  >
                    🔥 {size}
                  </motion.button>
                ))}
              </div>
            </div>
 
            <motion.div
              key={`${selectedPath}-${selectedSize}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-blue-900/50 to-slate-950 p-8 flex flex-col justify-between shadow-xl shadow-blue-900/30"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-sm font-bold text-orange-400 mb-4">
                  🔥 Best Value
                </div>
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Start now at only</div>
                <motion.div
                  key={price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black text-white mb-1"
                >
                  ${price} <span className="text-xl text-orange-400">🔥</span>
                </motion.div>
                <div className="text-gray-500 text-sm mt-2">
                  {selectedSize.toUpperCase()} — {selectedPath.toUpperCase()}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/auth/login')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all mt-6"
              >
                Start Challenge
              </motion.button>
            </motion.div>
          </div>
 
          {/* Funded Account Details */}
          <div className="mt-12 space-y-4">
            {fundedAccounts.map((account, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8"
              >
                <h3 className="text-lg font-bold text-white mb-2">{account.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{account.description}</p>
                <div className="space-y-3">
                  {account.stats.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-400">{item.icon} {item.label}</span>
                      <span className="text-cyan-400 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        {/* ── SECTION 3: Advanced Features ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-1">Aquorex Funding</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Advanced Features</span>
          </h3>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">Trade the way you want , how you want , for as long as you want.</p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.10 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="h-full rounded-3xl border border-slate-800/60 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 text-center hover:border-cyan-700/40 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  {feature.visual}
                  <h3 className="text-white font-black text-lg mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
 
      </div>
    </section>
  )
}