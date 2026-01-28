'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, LogOut, LayoutDashboard } from 'lucide-react'
import { supabaseClient } from '@/lib/supabase-client'
import { BRAND } from '@/lib/knowledge/yisas'

export default function PanelPage() {
  const router = useRouter()
  const [kullanici, setKullanici] = useState<{ email?: string; ad?: string } | null>(null)
  const [kontrol, setKontrol] = useState<'yukleniyor' | 'var' | 'yok'>('yukleniyor')

  useEffect(() => {
    const fn = async () => {
      if (!supabaseClient) {
        setKontrol('yok')
        return
      }
      const { data: { session } } = await supabaseClient.auth.getSession()
      if (!session?.user) {
        setKontrol('yok')
        return
      }
      setKullanici({
        email: session.user.email ?? undefined,
        ad: session.user.user_metadata?.ad ?? session.user.email?.split('@')[0] ?? 'Değerli Kullanıcı',
      })
      setKontrol('var')
    }
    fn()

    if (!supabaseClient) return
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setKontrol('yok')
        setKullanici(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (kontrol === 'yok') router.replace('/giris')
  }, [kontrol, router])

  const cikis = async () => {
    if (supabaseClient) await supabaseClient.auth.signOut()
    router.replace('/giris')
    router.refresh()
  }

  if (kontrol === 'yukleniyor') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-slate-400">Yükleniyor...</div>
      </div>
    )
  }

  if (kontrol === 'yok') return null

  return (
    <div className="min-h-[80vh] px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Üst: Çıkış */}
        <div className="flex justify-end mb-6">
          <button
            onClick={cikis}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>

        {/* Asistan karşılama */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
              <Bot size={28} className="text-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Hoş geldiniz, {kullanici?.ad ?? 'Değerli Kullanıcı'}!
              </h1>
              <p className="text-slate-400 mb-4">
                {BRAND.name} asistanınız burada. Size nasıl yardımcı olabilirim?
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/panel/demo-listesi"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  <LayoutDashboard size={18} />
                  Tanıtım talepleri
                </Link>
                <Link
                  href="/panel/bayilik-listesi"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  <LayoutDashboard size={18} />
                  Bayilik başvuruları
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-amber-500/50 text-slate-300 rounded-xl transition-colors text-sm font-medium"
                >
                  Siteye git
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              Giriş yaptığınız e-posta: <span className="text-slate-400">{kullanici?.email}</span>
            </p>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-slate-500 text-sm">
          <Link href="/" className="text-amber-400 hover:text-amber-300">Ana sayfaya dön</Link>
        </p>
      </div>
    </div>
  )
}
