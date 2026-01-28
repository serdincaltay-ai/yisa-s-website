// /app/demo/DemoForm.tsx
'use client'

import { useState } from 'react'
import { PACKAGES } from '@/lib/knowledge/yisas'

export default function DemoForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company_name: formData.get('company'),
      athlete_count: formData.get('athletes'),
      interested_package: formData.get('package'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const json = await res.json().catch(() => ({}))
        setError((json.error as string) || 'Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Talebiniz Alındı!</h3>
        <p className="text-slate-400">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-white mb-6">Tanıtım Talep Formu</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Ad Soyad *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            placeholder="Adınız"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">E-posta *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            placeholder="ornek@eposta.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Telefon</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            placeholder="0532 XXX XX XX"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Kurum Adı</label>
          <input
            type="text"
            name="company"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            placeholder="Spor okulu adı"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Sporcu Sayısı</label>
          <select
            name="athletes"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="">Seçiniz</option>
            <option value="1-50">1-50</option>
            <option value="51-100">51-100</option>
            <option value="101-250">101-250</option>
            <option value="250+">250+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">İlgilendiğiniz Paket</label>
          <select
            name="package"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
              text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="">Seçiniz</option>
            {PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - {pkg.currency}{pkg.price.toLocaleString('tr-TR')}/{pkg.period}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1.5">Mesajınız</label>
        <textarea
          name="message"
          rows={3}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl
            text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
          placeholder="Sorularınız veya özel istekleriniz..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          required
          className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 
            text-amber-500 focus:ring-amber-500"
        />
        <label className="text-sm text-slate-400">
          KVKK Aydınlatma Metni&apos;ni okudum ve kabul ediyorum. *
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 
          text-slate-900 font-semibold rounded-xl
          hover:shadow-lg hover:shadow-amber-500/30 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Tanıtım Talep Et'}
      </button>
    </form>
  )
}
