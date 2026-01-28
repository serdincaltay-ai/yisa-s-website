// GET /api/sistem-durum — Sahada tüm bağlantılar tek istekle; sistem aktif mi?
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const supabaseOk = !!(url && anonKey)
  const robotOk = !!anthropicKey

  let supabaseErisim: 'ok' | 'yok' | 'hata' = supabaseOk ? 'yok' : 'yok'
  if (supabaseOk) {
    try {
      const client = createClient(url!, anonKey!)
      const { error } = await client.from('demo_requests').select('id').limit(1)
      supabaseErisim = error ? 'hata' : 'ok'
    } catch {
      supabaseErisim = 'hata'
    }
  }

  const baglantilar = {
    supabase: { env: supabaseOk, erisim: supabaseErisim },
    robot: { env: robotOk },
    panel: { env: supabaseOk },
    formlar: { env: supabaseOk },
    siteUrl: siteUrl || '(tanımsız)',
  }

  const sistemAktif =
    supabaseOk && supabaseErisim === 'ok' && robotOk

  return NextResponse.json({
    ok: sistemAktif,
    sistemAktif,
    baglantilar,
    zaman: new Date().toISOString(),
    mesaj: sistemAktif
      ? 'Tüm kritik bağlantılar aktif; sistem online.'
      : 'Eksik veya hatalı: Supabase erişim veya Claude (ANTHROPIC_API_KEY) kontrol edin.',
  })
}
