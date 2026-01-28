// /app/api/panel/bayilik-listesi/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function GET() {
  if (!url || !anonKey) {
    return NextResponse.json({ list: [], error: 'Yapılandırma eksik. Supabase URL ve anahtar tanımlı olmalı.' }, { status: 200 })
  }
  const cookieStore = cookies()
  const supabaseAuth = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value },
      set() {},
      remove() {},
    },
  })
  const { data: { session } } = await supabaseAuth.getSession()
  if (!session?.user) {
    return NextResponse.json({ list: [], error: 'Oturum gerekli' }, { status: 401 })
  }
  try {
    const client = supabaseAdmin ?? createClient(url, anonKey)
    const { data, error } = await client
      .from('franchise_applications')
      .select('id, ad, soyad, email, telefon, il, ilce, deneyim, yatirim_butcesi, motivasyon, durum, olusturma_tarihi')
      .order('olusturma_tarihi', { ascending: false })
      .limit(200)

    if (error) {
      return NextResponse.json({ error: error.message, list: [] }, { status: 200 })
    }
    return NextResponse.json({ list: data ?? [] })
  } catch (err) {
    return NextResponse.json({ list: [], error: 'Hata' }, { status: 200 })
  }
}
