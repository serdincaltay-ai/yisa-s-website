// /components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { BRAND, NAV_LINKS, CTA_LINKS } from '@/lib/knowledge/yisas'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">Y</span>
            </div>
            <span className="text-xl font-bold text-white">{BRAND.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={CTA_LINKS.login.href}
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              {CTA_LINKS.login.label}
            </Link>
            <Link
              href={CTA_LINKS.demo.href}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              {CTA_LINKS.demo.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between py-3 text-lg text-slate-300 hover:text-amber-400 border-b border-slate-800"
                >
                  {link.label}
                  <ChevronRight size={20} />
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href={CTA_LINKS.demo.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full py-3 text-center bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 font-semibold rounded-xl"
                >
                  {CTA_LINKS.demo.label}
                </Link>
                <Link
                  href={CTA_LINKS.login.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full py-3 text-center border border-slate-700 text-white rounded-xl"
                >
                  {CTA_LINKS.login.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
