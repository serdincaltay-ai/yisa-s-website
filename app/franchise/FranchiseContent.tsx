// /app/franchise/FranchiseContent.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { FRANCHISE } from '@/lib/knowledge/yisas'

export default function FranchiseContent() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [hata, setHata] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setHata('')
    const form = e.currentTarget
    const payload = {
      ad: (form.querySelector('[name="ad"]') as HTMLInputElement)?.value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement)?.value,
      telefon: (form.querySelector('[name="telefon"]') as HTMLInputElement)?.value,
      il: (form.querySelector('[name="il"]') as HTMLInputElement)?.value,
      ilce: (form.querySelector('[name="ilce"]') as HTMLInputElement)?.value,
      deneyim: (form.querySelector('[name="deneyim"]') as HTMLTextAreaElement)?.value,
      motivasyon: (form.querySelector('[name="motivasyon"]') as HTMLTextAreaElement)?.value,
    }
    try {
      const res = await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) setSuccess(true)
      else {
        const json = await res.json().catch(() => ({}))
        setHata((json.error as string) || 'Gönderilirken bir hata oluştu.')
      }
    } catch {
      setHata('Bağlantı hatası.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">Bayilik</span> Fırsatı
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Kendi bölgenizde YİSA-S bayisi olun, spor okullarına teknoloji sağlayın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Yatırım Detayları</h2>
              
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Giriş Bedeli</p>
                    <p className="text-3xl font-bold text-amber-400">
                      {FRANCHISE.investment.currency}{FRANCHISE.investment.entry.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-slate-500">Tek seferlik</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Aylık Ödeme</p>
                    <p className="text-3xl font-bold text-amber-400">
                      {FRANCHISE.investment.currency}{FRANCHISE.investment.monthly.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-slate-500">Kurumsal paket dahil</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">Bayiliğe Dahil</h3>
              <ul className="space-y-3 mb-8">
                {FRANCHISE.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <Check size={18} className="text-emerald-400 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Aranan Özellikler</h3>
              <ul className="space-y-3">
                {FRANCHISE.requirements.map((r, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                      {i + 1}
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Başvurunuz Alındı!</h3>
                    <p className="text-slate-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-semibold text-white mb-6">Bayilik Başvurusu</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Ad Soyad *</label>
                        <input
                          type="text"
                          name="ad"
                          required
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                            text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">E-posta *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                            text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Telefon *</label>
                        <input
                          type="tel"
                          name="telefon"
                          required
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                            text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">İl *</label>
                        <input
                          type="text"
                          name="il"
                          required
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                            text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">İlçe</label>
                      <input
                        type="text"
                        name="ilce"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                          text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">İş Deneyiminiz</label>
                      <textarea
                        name="deneyim"
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                          text-white focus:border-amber-500 focus:outline-none resize-none"
                        placeholder="Spor sektörü ve işletme deneyiminizi kısaca anlatın..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Motivasyonunuz</label>
                      <textarea
                        name="motivasyon"
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
                          text-white focus:border-amber-500 focus:outline-none resize-none"
                        placeholder="Neden YİSA-S bayiliği almak istiyorsunuz?"
                      />
                    </div>

                    {hata && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {hata}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 
                        text-slate-900 font-semibold rounded-xl flex items-center justify-center gap-2
                        hover:shadow-lg hover:shadow-amber-500/30 transition-all
                        disabled:opacity-50"
                    >
                      {loading ? 'Gönderiliyor...' : 'Başvuru Yap'}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Başvuru Süreci</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FRANCHISE.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 
                  flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="font-medium text-white text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
