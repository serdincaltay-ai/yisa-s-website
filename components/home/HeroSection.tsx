// /components/home/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { BRAND, STATS } from '@/lib/knowledge/yisas'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {BRAND.tagline}
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {BRAND.slogan.split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {word}{' '}
                    </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              {BRAND.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3.5
                  bg-gradient-to-r from-amber-500 to-orange-600 
                  text-slate-900 font-semibold rounded-xl
                  hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Tanıtım Talep Et
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/ozellikler"
                className="inline-flex items-center gap-2 px-6 py-3.5
                  bg-slate-800 text-white font-medium rounded-xl
                  border border-slate-700 hover:border-amber-500/50 transition-all"
              >
                <Play size={20} />
                Nasıl Çalışır?
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-800">
              {STATS.slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
              
              {/* Content */}
              <div className="relative">
                {/* Robot Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 
                  flex items-center justify-center text-4xl mb-6 animate-float">
                  🤖
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  900 Alan Değerlendirme
                </h3>
                <p className="text-slate-400 mb-6">
                  30 kategori × 30 alt alan ile dünyanın en kapsamlı sporcu analizi
                </p>

                {/* Mini Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">6</div>
                    <div className="text-xs text-slate-500">AI Motoru</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-400">PHV</div>
                    <div className="text-xs text-slate-500">Büyüme Takibi</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-400">10</div>
                    <div className="text-xs text-slate-500">Branş</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-400">24/7</div>
                    <div className="text-xs text-slate-500">Destek</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-emerald-500 text-white text-sm font-medium
                px-4 py-2 rounded-full shadow-lg"
            >
              ✓ KVKK Uyumlu
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
