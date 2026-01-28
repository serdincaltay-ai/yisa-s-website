// /app/api/franchise/route.ts
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
    const nameStr = String(body.ad ?? body.name ?? '').trim()
    const [ad, ...soyadParts] = nameStr.split(/\s+/)
    const soyad = soyadParts.join(' ') || null

    const email = (body.email ?? '').toString().trim()
    const telefon = String(body.telefon ?? body.phone ?? '').trim()
    const il = String(body.il ?? body.sehir ?? '').trim()
    if (!email || !telefon || !il) {
      return NextResponse.json(
        { error: 'E-posta, telefon ve il alanları zorunludur.' },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl!, supabaseKey!)
    const { data, error } = await supabase
      .from('franchise_applications')
      .insert({
        ad: ad || 'Belirtilmemiş',
        soyad: soyad || null,
        email,
        telefon,
        il,
        ilce: body.ilce ? String(body.ilce).trim() : null,
        deneyim: body.deneyim ? String(body.deneyim).trim() : null,
        yatirim_butcesi: body.yatirim_butcesi ? String(body.yatirim_butcesi).trim() : null,
        motivasyon: body.motivasyon ? String(body.motivasyon).trim() : null,
        durum: 'yeni',
      })
      .select()
      .single()

    if (error) {
      console.error('Bayilik başvuru hatası:', error)
      return NextResponse.json(
        { error: error.code === '23502' ? 'Zorunlu alanlar eksik. Telefon ve il doldurulmalı.' : 'Veritabanı hatası' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Bayilik API hatası:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
