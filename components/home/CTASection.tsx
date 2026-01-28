// /components/home/CTASection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { BRAND } from '@/lib/knowledge/yisas'

export default function CTASection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 
            bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-8">
            <Sparkles size={32} className="text-slate-900" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {BRAND.slogan}
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            14 gün ücretsiz deneyin. Kredi kartı gerekmez. 
            Hemen demo talep edin ve farkı görün.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4
                bg-gradient-to-r from-amber-500 to-orange-600 
                text-slate-900 font-semibold rounded-xl text-lg
                hover:shadow-xl hover:shadow-amber-500/30 transition-all"
            >
              Ücretsiz Tanıtım Al
              <ArrowRight size={22} />
            </Link>
            <Link
              href="/hakkimizda#iletisim"
              className="inline-flex items-center gap-2 px-8 py-4
                bg-slate-800 text-white font-medium rounded-xl text-lg
                border border-slate-700 hover:border-amber-500/50 transition-all"
            >
              Bize Ulaşın
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              ✓ 14 gün ücretsiz
            </span>
            <span className="flex items-center gap-2">
              ✓ Kurulum desteği
            </span>
            <span className="flex items-center gap-2">
              ✓ KVKK uyumlu
            </span>
            <span className="flex items-center gap-2">
              ✓ 7/24 destek
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
