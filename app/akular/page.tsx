'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BRAND } from '@/lib/knowledge/yisas'

type AkuSatir = { id: string; name: string; aktif: boolean; tip: string; erisim?: 'ok' | 'hata'; hata?: string }
type BaglantiSatir = { from: string; to: string; aciklama: string; bagli: boolean; hata?: string }
type SistemDurum = { ok: boolean; sistemAktif: boolean; baglantilar: Record<string, unknown>; mesaj: string; zaman?: string }

export default function AkularPage() {
  const [sonuc, setSonuc] = useState<{
    akular: AkuSatir[]
    baglanti: BaglantiSatir[]
    olmasıGerektigiGibi: boolean
    ozet: string
    zaman?: string
    hata?: string
  } | null>(null)
  const [sistemDurum, setSistemDurum] = useState<SistemDurum | null>(null)
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const [kontrolRes, durumRes] = await Promise.all([
          fetch('/api/akular/kontrol'),
          fetch('/api/sistem-durum'),
        ])
        const kontrolData = await kontrolRes.json()
        const durumData = await durumRes.json().catch(() => null)
        if (!cancelled) {
          setSonuc(kontrolData)
          if (durumData) setSistemDurum(durumData)
        }
      } catch {
        if (!cancelled) setSonuc({ akular: [], baglanti: [], olmasıGerektigiGibi: false, ozet: 'İstek hatası.', hata: 'fetch' })
      } finally {
        if (!cancelled) setYukleniyor(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  if (yukleniyor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-400">Akü kontrolü yapılıyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-white">
            {BRAND.name} — Akü Kontrolü
          </h1>
          <div className="flex items-center gap-4">
            {sistemDurum && (
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${sistemDurum.sistemAktif ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}
                title={sistemDurum.mesaj}
              >
                <span className={`w-2 h-2 rounded-full ${sistemDurum.sistemAktif ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                Sistem {sistemDurum.sistemAktif ? 'Aktif Online' : 'Eksik'}
              </span>
            )}
            <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm">
              Ana sayfa
            </Link>
          </div>
        </div>

        {sonuc?.hata && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {sonuc.hata}
          </div>
        )}

        <div className={`mb-6 p-4 rounded-xl border text-sm ${sonuc?.olmasıGerektigiGibi ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
          <strong>Özet:</strong> {sonuc?.ozet ?? '—'}
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Tüm aküler (tanımlı / aktif / erişim)</h2>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800/50 text-slate-300">
                  <th className="px-4 py-3">Akü</th>
                  <th className="px-4 py-3">Tip</th>
                  <th className="px-4 py-3">Env aktif?</th>
                  <th className="px-4 py-3">Erişim</th>
                </tr>
              </thead>
              <tbody>
                {(sonuc?.akular ?? []).map((a) => (
                  <tr key={a.id} className="border-t border-slate-800/50">
                    <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                    <td className="px-4 py-3 text-slate-400">{a.tip}</td>
                    <td className="px-4 py-3">
                      <span className={a.aktif ? 'text-emerald-400' : 'text-slate-500'}>
                        {a.aktif ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {a.erisim === 'ok' && <span className="text-emerald-400">Erişilebilir</span>}
                      {a.erisim === 'hata' && <span className="text-red-400" title={a.hata}>Hata</span>}
                      {!a.erisim && <span className="text-slate-500">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Bağlantılar (birbirine bağlı mı?)</h2>
          <div className="space-y-3">
            {(sonuc?.baglanti ?? []).map((b, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${b.bagli ? 'bg-slate-800/30 border-slate-700' : 'bg-amber-500/10 border-amber-500/30'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={b.bagli ? 'text-emerald-400' : 'text-amber-400'}>
                    {b.bagli ? '✓' : '✗'}
                  </span>
                  <span className="font-medium text-white">{b.from}</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-slate-300">{b.to}</span>
                </div>
                <p className="text-slate-400 text-sm">{b.aciklama}</p>
                {b.hata && <p className="text-red-400 text-xs mt-1">{b.hata}</p>}
              </div>
            ))}
          </div>
        </section>

        {sonuc?.zaman && (
          <p className="mt-6 text-slate-500 text-xs">Son kontrol: {new Date(sonuc.zaman).toLocaleString('tr-TR')}</p>
        )}
      </div>
    </div>
  )
}
