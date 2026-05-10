'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-black border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          {/* Top Section - Logo and Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="col-span-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-white font-bold text-lg">Aquorex</span>
              </motion.div>
              <p className="text-gray-400 text-sm mb-6">
                Let&apos;s make prop trading better again!
              </p>
              <motion.a
                href="mailto:support@aquorex.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <span>✉️</span>
                support@aquorex.com
              </motion.a>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                Useful Links
              </h4>
              <ul className="space-y-3">
                {['Instruments', 'Refund Policy', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#0099ff' }}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-3">
                {['About Us', 'FAQ', 'Rewards', 'Contact', 'Affiliate'].map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#0099ff' }}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                ].map(({ icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.2, color: '#0099ff' }}
                    className="w-10 h-10 rounded-full bg-blue-600/20 border border-cyan-400/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-12 origin-left"
          />

          {/* Customer Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Customer Notice
            </h5>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Trading derivatives carries a high level of risk to your capital, and you should only trade with funds you can afford to lose. Any information or advice contained on this website is general in nature and does not take into account your objectives, financial situation, or needs. Past performance of any product described on this website is not a reliable indicator of future results. You should carefully consider whether full understand our risk disclosures to ensure our target profits align with your trading style. We strongly recommend you seek independent financial advice if necessary.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              All trading accounts provided by Aquorex are simulated (virtual demo) accounts that operate in a simulated trading environment. Clients are not trading real funds, and any profits or losses are purely virtual. These accounts are intended solely for skill assessment and educational purposes, not for live market trading.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Aquorex does not accept clients from jurisdictions where its services or offerings would be contrary to local laws or regulations. This includes, but is not limited to: Afghanistan, Congo, Hong Kong, Iran, Iraq, Myanmar, New Zealand, North Korea, Palestine, Russia, Somalia, Sudan, Syria, Ontario (Canada), Yemen, Japan, and the United States (including its territories). The information provided on this website is not intended as an inducement, offer, or solicitation to any person in any jurisdiction where such distribution or use would be unlawful.
            </p>
          </motion.div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
            <div className="text-gray-400 text-xs text-center md:text-left mb-4 md:mb-0">
              <p>© {currentYear} AQUOREX Pvt.Ltd. All rights reserved</p>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <motion.a
                href="#"
                whileHover={{ color: '#0099ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Refund Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#0099ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#0099ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Terms and Conditions
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#0099ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                AML Policy
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
