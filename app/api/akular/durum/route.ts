// /app/api/akular/durum/route.ts — Tüm akülerin projede tanımlı ve aktiflik durumu
import { NextResponse } from 'next/server'
import { getAkuDurumu } from '@/lib/akular'

export async function GET() {
  try {
    const durum = getAkuDurumu()
    return NextResponse.json({
      akular: durum,
      projedeTanimli: ['gpt', 'claude', 'together', 'gemini', 'v0', 'cursor', 'github', 'vercel', 'supabase', 'railway'],
      kaynak: 'lib/akular.ts',
    })
  } catch (e) {
    return NextResponse.json({ akular: [], error: 'Hata' }, { status: 500 })
  }
}
