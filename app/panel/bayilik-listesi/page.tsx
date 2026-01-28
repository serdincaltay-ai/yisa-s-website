'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabase-client'
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from 'lucide-react'

type BayilikKayit = {
  id: string
  ad: string | null
  soyad: string | null
  email: string | null
  telefon: string | null
  il: string | null
  ilce: string | null
  deneyim: string | null
  yatirim_butcesi: string | null
  motivasyon: string | null
  durum: string | null
  olusturma_tarihi: string | null
}

const DURUM_ETIKET: Record<string, string> = {
  yeni: 'Yeni',
  inceleniyor: 'İnceleniyor',
  gorusme: 'Görüşme',
  onaylandi: 'Onaylandı',
  reddedildi: 'Reddedildi',
}

export default function BayilikListesiPage() {
  const router = useRouter()
  const [liste, setListe] = useState<BayilikKayit[]>([])
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
        const res = await fetch('/api/panel/bayilik-listesi')
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
        <h1 className="text-2xl font-bold text-white mb-2">Bayilik Başvuruları</h1>
        <p className="text-slate-400 mb-6">
          Bayilik başvuru formundan gelen kayıtlar.
        </p>

        {yukleniyor && (
          <div className="text-slate-400 py-8">Yükleniyor...</div>
        )}

        {!yukleniyor && liste.length === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
            {hata ? (
              <p>{hata}</p>
              <p className="mt-2 text-sm">Supabase&apos;te <code className="text-slate-400">franchise_applications</code> tablosu ve gerekirse <code className="text-slate-400">SUPABASE_SERVICE_ROLE_KEY</code> tanımlı olmalı.</p>
            ) : (
              'Henüz bayilik başvurusu yok.'
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
                    <th className="px-4 py-3 text-slate-300 font-medium">İl / İlçe</th>
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
                        {k.il || k.ilce ? (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {[k.il, k.ilce].filter(Boolean).join(' / ')}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          k.durum === 'yeni' ? 'bg-amber-500/20 text-amber-400' :
                          k.durum === 'onaylandi' ? 'bg-emerald-500/20 text-emerald-400' :
                          k.durum === 'reddedildi' ? 'bg-red-500/20 text-red-400' :
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
