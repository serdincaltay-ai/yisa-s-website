// /components/home/PricingPreview.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
import { PACKAGES } from '@/lib/knowledge/yisas'

export default function PricingPreview() {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Şeffaf <span className="text-gradient">Fiyatlandırma</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            İhtiyacınıza uygun paketi seçin. Tüm paketlerde 14 gün ücretsiz deneme.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-slate-800/50 border rounded-2xl p-8
                ${pkg.popular 
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10' 
                  : 'border-slate-700/50'}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 
                    text-slate-900 text-sm font-semibold rounded-full">
                    En Popüler
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">
                    {pkg.currency}{pkg.price.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-slate-400">/{pkg.period}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {pkg.athleteLimit === -1 ? 'Sınırsız sporcu' : `${pkg.athleteLimit} sporcu`}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.slice(0, 6).map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check size={18} className="text-emerald-400 shrink-0" />
                    ) : (
                      <X size={18} className="text-slate-600 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/demo"
                className={`block w-full py-3 text-center font-semibold rounded-xl transition-all
                  ${pkg.popular
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 hover:shadow-lg hover:shadow-amber-500/30'
                    : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              >
                {pkg.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Franchise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/franchise"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
          >
            Bayilik fırsatları için tıklayın
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
