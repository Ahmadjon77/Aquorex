'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export function AnnouncementBar() {
  const text = "🔥 AQUA30 🎯 Special 30% off on all Instant Accounts Use Code: AQUA30 &nbsp;&nbsp;&nbsp;"

  return (
    <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white py-2 px-4 text-sm font-medium overflow-hidden whitespace-nowrap">
      <div className="flex">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
          className="flex gap-16 shrink-0"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-3">
              🔥 <strong>AQUA30</strong> 🎯 Special 30% off on all Instant Accounts Use Code: <strong>AQUA30</strong> 🔥
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Affiliate', href: '#affiliate' },
    { label: 'About Us', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Rewards', href: '#rewards' },
    { label: 'Contact Us', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="sticky top-0 z-50 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent border-b border-slate-700/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:inline">Aquorex</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
            ) : session ? (
              /* Logged in - User menu */
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-white text-sm font-medium hover:border-cyan-500 transition-all"
                >
                  <User size={16} className="text-cyan-400" />
                  <span className="hidden sm:inline">{session.user?.name?.split(' ')[0] || 'Profil'}</span>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors text-sm"
                      >
                        <LayoutDashboard size={16} className="text-cyan-400" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors text-sm border-t border-slate-700"
                      >
                        <LogOut size={16} className="text-red-400" />
                        Chiqish
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Not logged in */
              <>
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:inline-block px-6 py-2 text-white border border-white rounded-full hover:bg-white hover:text-slate-900 transition-all text-sm font-medium"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Get Funded
                  </motion.button>
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 flex flex-col gap-3 pb-4 border-t border-slate-700/50 pt-4 overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {!session && (
                <div className="flex gap-3 pt-2 border-t border-slate-700/50">
                  <Link href="/auth/login" className="flex-1">
                    <button className="w-full px-4 py-2 text-white border border-white rounded-full text-sm font-medium">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register" className="flex-1">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full text-sm font-medium">
                      Get Funded
                    </button>
                  </Link>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
