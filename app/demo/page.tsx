// /app/demo/page.tsx
import { Metadata } from 'next'
import DemoForm from './DemoForm'

export const metadata: Metadata = {
  title: 'Tanıtım Talep Et',
  description: '14 gün ücretsiz YİSA-S tanıtım hesabı talep edin. Kurulum desteği dahil.',
}

export default function DemoPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">
              <span className="text-gradient">Ücretsiz Tanıtım</span> Talep Edin
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              14 gün boyunca tüm özellikleri ücretsiz deneyin. 
              Kredi kartı gerekmez, kurulum desteği dahil.
            </p>

            <div className="space-y-4 mb-8">
              {[
                '14 gün tam erişim',
                'Kurulum ve eğitim desteği',
                'Gerçek veri ile test imkanı',
                'İptal yükümlülüğü yok',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 
                    flex items-center justify-center text-sm">✓</span>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Sorularınız mı var?</h3>
              <p className="text-slate-400 text-sm mb-3">
                Sağ alt köşedeki robot ile hemen konuşabilirsiniz.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <DemoForm />
          </div>
        </div>
      </div>
    </div>
  )
}
