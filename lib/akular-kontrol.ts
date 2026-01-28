// YİSA-S — Akü bağlantı testleri: tüm aküleri dene, birbirine bağlı mı kontrol et
import { getAkuDurumu } from './akular'
import { createClient } from '@supabase/supabase-js'

export type BaglantiKontrol = {
  from: string
  to: string
  aciklama: string
  bagli: boolean
  hata?: string
}

/** Supabase erişilebilir mi? (env varsa basit sorgu dene) */
async function supabaseErisimTesti(): Promise<{ ok: boolean; hata?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return { ok: false, hata: 'URL veya anahtar yok' }
  try {
    const client = createClient(url, key)
    // demo_requests tüm şemalarda var; role_permissions tam şemada olabilir
    const { error } = await client.from('demo_requests').select('id').limit(1)
    if (error) return { ok: false, hata: error.message }
    return { ok: true }
  } catch (e) {
    return { ok: false, hata: e instanceof Error ? e.message : 'Bağlantı hatası' }
  }
}

/** Projede tanımlı “kim kime bağlı” ilişkileri. */
const BAGLANTI_TANIMLARI: { from: string; to: string; aciklama: string }[] = [
  { from: 'Panel (Giriş)', to: 'supabase', aciklama: 'Panel auth ve listeler Supabase kullanır' },
  { from: 'NeebChat (Robot)', to: 'claude', aciklama: 'Site asistanı Claude API kullanır' },
  { from: 'Tanıtım / Bayilik formları', to: 'supabase', aciklama: 'Formlar Supabase tablolarına yazar' },
  { from: 'Panel listeleri', to: 'supabase', aciklama: 'demo_requests, franchise_applications Supabase’ten okunur' },
  { from: 'Deploy', to: 'vercel', aciklama: 'Vercel’e deploy edilince Vercel ortamı aktif' },
  { from: 'Deploy', to: 'railway', aciklama: 'Railway’e deploy edilince Railway ortamı aktif' },
  { from: 'Sürüm / CI', to: 'github', aciklama: 'GitHub repo ve Actions ile bağlı' },
]

/** Tüm aküleri dene, bağlantıları kontrol et, olması gerektiği gibi çalışıyor mu özetle. */
export async function runAkuKontrol(): Promise<{
  akular: { id: string; name: string; aktif: boolean; tip: string; erisim?: 'ok' | 'hata'; hata?: string }[]
  baglanti: BaglantiKontrol[]
  olmasıGerektigiGibi: boolean
  ozet: string
}> {
  const durum = getAkuDurumu()
  const supabaseTest = await supabaseErisimTesti()

  const akular = durum.map((a) => {
    let erisim: 'ok' | 'hata' | undefined
    let hata: string | undefined
    if (a.id === 'supabase') {
      erisim = supabaseTest.ok ? 'ok' : 'hata'
      hata = supabaseTest.hata
    }
    return { id: a.id, name: a.name, aktif: a.aktif, tip: a.tip, erisim, hata }
  })

  const baglanti: BaglantiKontrol[] = BAGLANTI_TANIMLARI.map((b) => {
    const toAku = durum.find((d) => d.id === b.to)
    const toAktif = !!toAku?.aktif
    let bagli = toAktif
    let hata: string | undefined
    if (b.to === 'supabase') {
      bagli = toAktif && supabaseTest.ok
      hata = supabaseTest.hata
    }
    return { from: b.from, to: b.to, aciklama: b.aciklama, bagli, hata }
  })

  const kritikBaglanti = baglanti.filter((b) => b.to === 'supabase' || b.to === 'claude')
  const hepsiBagli = kritikBaglanti.every((b) => b.bagli)
  const olmasıGerektigiGibi = hepsiBagli
  const ozet = olmasıGerektigiGibi
    ? 'Kritik bağlantılar (Panel→Supabase, Formlar→Supabase, NeebChat→Claude) çalışıyor.'
    : 'Bazı kritik bağlantılar eksik veya erişilemiyor. Supabase ve Claude env + erişim kontrol edin.'

  return { akular, baglanti, olmasıGerektigiGibi, ozet }
}
