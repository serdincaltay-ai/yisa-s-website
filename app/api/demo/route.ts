// /app/api/demo/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Yapılandırma eksik. Supabase URL ve anahtar tanımlı olmalı.' }, { status: 503 })
  }
  try {
    const body = await request.json()
    const email = (body.email ?? '').toString().trim()
    if (!email) {
      return NextResponse.json({ error: 'E-posta zorunludur.' }, { status: 400 })
    }
    const nameStr = String(body.name ?? '').trim()
    const [ad, ...soyadParts] = nameStr.split(/\s+/)
    const soyad = soyadParts.join(' ') || null

    const supabase = createClient(supabaseUrl!, supabaseKey!)
    const { data, error } = await supabase
      .from('demo_requests')
      .insert({
        ad: ad || 'Belirtilmemiş',
        soyad: soyad || null,
        email,
        telefon: body.phone ? String(body.phone).trim() : null,
        sirket_adi: body.company_name || null,
        sporcu_sayisi: body.athlete_count ? parseInt(String(body.athlete_count), 10) : null,
        ilgilendigi_paket: body.interested_package || body.package || null,
        mesaj: body.message || null,
        durum: 'yeni',
      })
      .select()
      .single()

    if (error) {
      console.error('Tanıtım talep hatası:', error)
      return NextResponse.json(
        { error: error.code === '23502' ? 'Zorunlu alanlar eksik. Ad ve e-posta doldurulmalı.' : 'Veritabanı hatası' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Tanıtım API hatası:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
