'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabase-client'
import { BRAND } from '@/lib/knowledge/yisas'

export default function GirisPage() {
  const router = useRouter()
  const [eposta, setEposta] = useState('')
  const [sifre, setSifre] = useState('')
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [yapilandirmaYok, setYapilandirmaYok] = useState(false)

  useEffect(() => {
    setYapilandirmaYok(!supabaseClient)
  }, [])

  const handleGiris = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    if (!supabaseClient) {
      setHata('Giriş yapılandırması eksik. .env.local dosyasında Supabase URL ve anahtar tanımlı olmalı.')
      return
    }
    setYukleniyor(true)
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email: eposta, password: sifre })
      if (error) {
        setHata(error.message === 'Invalid login credentials' ? 'E-posta veya şifre hatalı.' : error.message)
        setYukleniyor(false)
        return
      }
      if (data?.session) {
        router.push('/panel')
        router.refresh()
      }
    } catch {
      setHata('Giriş yapılırken bir hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Kontrol Paneline Giriş</h1>
            <p className="text-slate-400 text-sm">{BRAND.name} yönetim paneline hoş geldiniz.</p>
          </div>

          {yapilandirmaYok && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm mb-4">
              Supabase yapılandırması eksik. <code className="text-amber-300">.env.local</code> içinde <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code> ve <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> tanımlı olmalı.
            </div>
          )}
          <form onSubmit={handleGiris} className="space-y-5">
            <div>
              <label htmlFor="eposta" className="block text-sm text-slate-400 mb-1.5">E-posta</label>
              <input
                id="eposta"
                type="email"
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                required
                placeholder="ornek@eposta.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="sifre" className="block text-sm text-slate-400 mb-1.5">Şifre</label>
              <input
                id="sifre"
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {hata && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {hata}
              </div>
            )}

            <button
              type="submit"
              disabled={yukleniyor || yapilandirmaYok}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50"
            >
              {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            <Link href="/" className="text-amber-400 hover:text-amber-300">Ana sayfaya dön</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
