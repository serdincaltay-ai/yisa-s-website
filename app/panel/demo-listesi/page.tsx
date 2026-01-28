'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabase-client'
import { ArrowLeft, Mail, Phone, Building2, Calendar } from 'lucide-react'

type DemoKayit = {
  id: string
  ad: string | null
  soyad: string | null
  email: string | null
  telefon: string | null
  sirket_adi: string | null
  sporcu_sayisi: number | null
  ilgilendigi_paket: string | null
  mesaj: string | null
  durum: string | null
  olusturma_tarihi: string | null
}

const DURUM_ETIKET: Record<string, string> = {
  yeni: 'Yeni',
  iletisimde: 'İletişimde',
  demo_yapildi: 'Tanıtım yapıldı',
  donustu: 'Dönüştü',
  iptal: 'İptal',
}

export default function DemoListesiPage() {
  const router = useRouter()
  const [liste, setListe] = useState<DemoKayit[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState('')

  useEffect(() => {
    const fn = async () => {
      if (!supabaseClient) {
        router.replace('/giris')
        return
      }
      const { data: { session } } = await supabaseClient.auth.getSession()
      if (!session?.user) {
        router.replace('/giris')
        return
      }
      try {
        const res = await fetch('/api/panel/demo-listesi')
        if (res.status === 401) {
          router.replace('/giris')
          return
        }
        const json = await res.json()
        setListe(Array.isArray(json.list) ? json.list : [])
        if (json.error && !json.list?.length) setHata(json.error)
      } catch {
        setHata('Liste alınamadı.')
      } finally {
        setYukleniyor(false)
      }
    }
    fn()
  }, [router])

  return (
    <div className="min-h-[80vh] px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/panel"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Panele dön
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">Tanıtım Talepleri</h1>
        <p className="text-slate-400 mb-6">
          Tanıtım talep formundan gelen başvurular.
        </p>

        {yukleniyor && (
          <div className="text-slate-400 py-8">Yükleniyor...</div>
        )}

        {!yukleniyor && liste.length === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
            {hata ? (
              <p>{hata}</p>
              <p className="mt-2 text-sm">Supabase&apos;te <code className="text-slate-400">demo_requests</code> tablosu ve gerekirse <code className="text-slate-400">SUPABASE_SERVICE_ROLE_KEY</code> tanımlı olmalı.</p>
            ) : (
              'Henüz tanıtım talebi yok.'
            )}
          </div>
        )}

        {!yukleniyor && liste.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/50">
                    <th className="px-4 py-3 text-slate-300 font-medium">Ad Soyad</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">E-posta</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Telefon</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Kurum</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Paket</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Durum</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {liste.map((k) => (
                    <tr key={k.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-4 py-3 text-white">
                        {[k.ad, k.soyad].filter(Boolean).join(' ') || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {k.email ? (
                          <a href={`mailto:${k.email}`} className="text-amber-400 hover:underline flex items-center gap-1">
                            <Mail size={14} /> {k.email}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {k.telefon ? (
                          <span className="flex items-center gap-1">
                            <Phone size={14} /> {k.telefon}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {k.sirket_adi ? (
                          <span className="flex items-center gap-1">
                            <Building2 size={14} /> {k.sirket_adi}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300">{k.ilgilendigi_paket ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          k.durum === 'yeni' ? 'bg-amber-500/20 text-amber-400' :
                          k.durum === 'donustu' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                          {DURUM_ETIKET[k.durum ?? ''] ?? k.durum ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {k.olusturma_tarihi ? (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(k.olusturma_tarihi).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
