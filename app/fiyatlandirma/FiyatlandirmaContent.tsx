// /app/fiyatlandirma/FiyatlandirmaContent.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
import { PACKAGES, FRANCHISE } from '@/lib/knowledge/yisas'

export default function FiyatlandirmaContent() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">Fiyatlandırma</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              İhtiyacınıza uygun paketi seçin. Tüm paketlerde 14 gün ücretsiz deneme.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-slate-800/50 border rounded-2xl p-8
                  ${pkg.popular ? 'border-amber-500 shadow-xl shadow-amber-500/10' : 'border-slate-700/50'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 
                      text-slate-900 text-sm font-semibold rounded-full">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">
                      {pkg.currency}{pkg.price.toLocaleString('tr-TR')}
                    </span>
                    <span className="text-slate-400">/{pkg.period}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    {pkg.athleteLimit === -1 ? 'Sınırsız sporcu' : `${pkg.athleteLimit} sporcu kapasitesi`}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check size={20} className="text-emerald-400 shrink-0" />
                      ) : (
                        <X size={20} className="text-slate-600 shrink-0" />
                      )}
                      <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo"
                  className={`block w-full py-4 text-center font-semibold rounded-xl transition-all
                    ${pkg.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 hover:shadow-lg hover:shadow-amber-500/30'
                      : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 
              border border-amber-500/30 rounded-2xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Bayilik Fırsatı</h2>
              <p className="text-slate-400">Kendi bölgenizde YİSA-S bayisi olun</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Yatırım</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Giriş bedeli:</span>
                    <span className="font-semibold text-amber-400">
                      {FRANCHISE.investment.currency}{FRANCHISE.investment.entry.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Aylık:</span>
                    <span className="font-semibold text-amber-400">
                      {FRANCHISE.investment.currency}{FRANCHISE.investment.monthly.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Dahil Olanlar</h3>
                <ul className="space-y-2">
                  {FRANCHISE.benefits.slice(0, 4).map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Check size={16} className="text-emerald-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/franchise"
                className="inline-flex items-center gap-2 px-8 py-4
                  bg-gradient-to-r from-amber-500 to-orange-600 
                  text-slate-900 font-semibold rounded-xl
                  hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Bayilik Başvurusu
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Ücretsiz deneme var mı?', a: 'Evet, tüm paketlerde 14 gün ücretsiz deneme hakkınız var.' },
              { q: 'İstediğim zaman iptal edebilir miyim?', a: 'Evet, aylık abonelikler istediğiniz zaman iptal edilebilir.' },
              { q: 'Paket yükseltme yapabilir miyim?', a: 'Evet, istediğiniz zaman üst pakete geçiş yapabilirsiniz.' },
              { q: 'Ödeme yöntemleri neler?', a: 'Kredi kartı, banka havalesi ve EFT ile ödeme yapabilirsiniz.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
