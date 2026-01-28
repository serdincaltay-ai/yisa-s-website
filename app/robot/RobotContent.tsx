// /app/robot/RobotContent.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, MessageSquare, Zap, Shield, Clock, ArrowRight } from 'lucide-react'
import { AI_ENGINES, ROBOT_ACTIONS } from '@/lib/knowledge/yisas'

const ROBOT_FEATURES = [
  {
    icon: MessageSquare,
    title: '7/24 Aktif',
    description: 'Gece gündüz sorularınızı anında yanıtlar',
  },
  {
    icon: Zap,
    title: 'Anında Yanıt',
    description: 'Ortalama 2 saniyede akıllı cevaplar',
  },
  {
    icon: Shield,
    title: 'KVKK Uyumlu',
    description: 'Verileriniz güvende, gizlilik önceliğimiz',
  },
  {
    icon: Clock,
    title: 'Öğrenen Sistem',
    description: 'Her konuşmada daha akıllı hale gelir',
  },
]

export default function RobotContent() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6">
                <Bot size={16} />
                AI Destekli Asistan
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="text-gradient">YİSA-S Robot</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Claude AI tarafından desteklenen akıllı asistanımız, 
                tüm sorularınızı anında yanıtlar ve size yardımcı olur.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const event = new CustomEvent('openRobot')
                    window.dispatchEvent(event)
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5
                    bg-gradient-to-r from-amber-500 to-orange-600 
                    text-slate-900 font-semibold rounded-xl
                    hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                >
                  <Bot size={20} />
                  Robot ile Konuş
                </button>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-6 py-3.5
                    bg-slate-800 text-white font-medium rounded-xl
                    border border-slate-700 hover:border-amber-500/50 transition-all"
                >
                  Tanıtım Talep Et
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Robot Visual */}
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl 
                border border-slate-700/50 p-8 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 
                    flex items-center justify-center mx-auto mb-6 animate-float">
                    <Bot size={48} className="text-slate-900" />
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Merhaba! 👋</h3>
                    <p className="text-slate-400">Size nasıl yardımcı olabilirim?</p>
                  </div>

                  {/* Quick Actions Preview */}
                  <div className="grid grid-cols-2 gap-3">
                    {ROBOT_ACTIONS.quick.slice(0, 4).map((action, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 bg-slate-900/50 rounded-xl text-center
                          border border-slate-700/50 text-sm text-slate-300"
                      >
                        {action.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Robot Özellikleri</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROBOT_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 
                  flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Power */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                6 AI Motoru ile Güçlendirilmiş
              </h2>
              <p className="text-slate-400 mb-8">
                YİSA-S Robot, en gelişmiş yapay zeka motorlarını kullanarak 
                size en doğru ve hızlı yanıtları sunar.
              </p>

              <div className="space-y-4">
                {AI_ENGINES.slice(0, 3).map((engine, i) => (
                  <div key={engine.id} className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${engine.color}20` }}
                    >
                      {engine.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{engine.name}</p>
                      <p className="text-sm text-slate-500">{engine.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/ozellikler"
                className="inline-flex items-center gap-2 mt-8 text-amber-400 hover:text-amber-300"
              >
                Tüm AI motorlarını gör
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Sample Conversation */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <p className="text-sm text-slate-500 mb-4">Örnek Konuşma</p>
                
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-amber-500 text-slate-900 rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">PHV nedir?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-white rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">
                        PHV (Peak Height Velocity), çocuğun en hızlı büyüdüğü dönemi ifade eder. 
                        Bu dönemde büyüme plakları hassastır ve antrenman yoğunluğunun 
                        dikkatli ayarlanması gerekir. 📈
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-amber-500 text-slate-900 rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">Fiyatlar ne kadar?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-white rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">
                        3 paketimiz var: Başlangıç ₺2.500/ay, Profesyonel ₺7.500/ay (en popüler), 
                        Kurumsal ₺15.000/ay. Tanıtım talep ederseniz 14 gün ücretsiz deneyin! 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Hemen Deneyin
          </h2>
          <p className="text-slate-400 mb-8">
            Sağ alt köşedeki robot simgesine tıklayın ve konuşmaya başlayın.
          </p>
          <button
            onClick={() => {
              const widget = document.querySelector('[data-robot-widget]')
              if (widget) (widget as HTMLButtonElement).click()
            }}
            className="inline-flex items-center gap-2 px-8 py-4
              bg-gradient-to-r from-amber-500 to-orange-600 
              text-slate-900 font-semibold rounded-xl text-lg
              hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            <Bot size={24} />
            Robot ile Konuş
          </button>
        </div>
      </section>
    </div>
  )
}
