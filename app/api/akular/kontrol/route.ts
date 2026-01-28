// GET /api/akular/kontrol — Tüm aküleri dene, birbirine bağlı mı, olması gerektiği gibi çalışıyor mu
import { NextResponse } from 'next/server'
import { runAkuKontrol } from '@/lib/akular-kontrol'

export async function GET() {
  try {
    const sonuc = await runAkuKontrol()
    return NextResponse.json({
      ...sonuc,
      zaman: new Date().toISOString(),
    })
  } catch (e) {
    return NextResponse.json(
      {
        akular: [],
        baglanti: [],
        olmasıGerektigiGibi: false,
        ozet: 'Kontrol sırasında hata oluştu.',
        hata: e instanceof Error ? e.message : 'Bilinmeyen hata',
      },
      { status: 500 }
    )
  }
}
