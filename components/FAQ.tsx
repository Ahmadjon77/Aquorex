'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'What is AQUOREX?',
    answer:
      'Aquorex is a proprietary trading firm that funds professional traders. We provide you with capital to trade with, and you keep a significant portion of your profits. We offer flexible trading conditions with no restrictive rules.',
  },
  {
    question: 'Why should I choose AQUOREX?',
    answer:
      'We offer the most competitive profit splits in the industry, fast payouts every 7 days, zero restrictive rules, news trading allowed, and a supportive community of thousands of funded traders worldwide.',
  },
  {
    question: 'Restricted Countries?',
    answer:
      'Aquorex serves traders from over 130 countries. However, we do not accept clients from certain jurisdictions including the United States, Canada, Japan, and several others due to regulatory restrictions.',
  },
  {
    question: 'Am I trading with real money?',
    answer:
      'All trading accounts provided by Aquorex are simulated (virtual demo) accounts that operate in a simulated trading environment. Clients are not trading real funds, and any profits or losses are purely virtual.',
  },
  {
    question: 'Trading Platforms?',
    answer:
      'We support MetaTrader 5 (MT5) and other popular trading platforms. You can trade forex, indices, commodities, and cryptocurrencies depending on your account tier and platform.',
  },
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Title and Support Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-100 rounded-3xl p-8 h-fit sticky top-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Frequently asked
                <br />
                questions
              </h2>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-12 p-6 bg-white rounded-xl border border-gray-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">Still have a questions?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For traders participating in the Stellar 2-Step Challenge, the Daily Loss Limit is 5% of their initial account.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Get Funded
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 text-left">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown size={24} className="text-slate-900" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-6 bg-gray-50 text-slate-700 leading-relaxed border-t border-gray-200 rounded-b-xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
