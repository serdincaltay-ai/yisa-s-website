// /app/ozellikler/OzelliklerContent.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { 
  EVALUATION_SYSTEM, 
  AI_ENGINES, 
  PHV, 
  BRANCHES, 
  PERSPECTIVES 
} from '@/lib/knowledge/yisas'

export default function OzelliklerContent() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">Özellikler</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Türkiye&apos;nin en kapsamlı çocuk sporcu değerlendirme sistemi
            </p>
          </motion.div>
        </div>
      </section>

      {/* 900 Alan */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {EVALUATION_SYSTEM.total} Alan Değerlendirme
            </h2>
            <p className="text-slate-400">{EVALUATION_SYSTEM.formula}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {EVALUATION_SYSTEM.categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4
                  hover:border-amber-500/30 transition-all group"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h3 className="font-medium text-white text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Perspektif */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              10 Perspektif Değerlendirme
            </h2>
            <p className="text-slate-400">Her sporcu 10 farklı açıdan değerlendirilir</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PERSPECTIVES.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Motorları */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              6 AI Motoru
            </h2>
            <p className="text-slate-400">Her görev için en uygun yapay zeka</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_ENGINES.map((engine, i) => (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${engine.color}20` }}
                  >
                    {engine.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{engine.name}</h3>
                    <p className="text-sm" style={{ color: engine.color }}>{engine.role}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">{engine.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHV */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">{PHV.name}</h2>
              <p className="text-lg text-slate-300 mb-2">{PHV.fullName}</p>
              <p className="text-slate-400 mb-6">{PHV.description}</p>
              
              <ul className="space-y-3">
                {PHV.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 
                      flex items-center justify-center text-sm">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {PHV.stages.map((stage, i) => (
                <div key={stage.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">{stage.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${stage.risk === 'Düşük' ? 'bg-emerald-500/20 text-emerald-400' :
                        stage.risk === 'Orta' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'}`}>
                      Risk: {stage.risk}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{stage.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branşlar */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">10 Branş Desteği</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRANCHES.map((branch, i) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center
                  hover:border-amber-500/30 transition-all"
              >
                <div className="text-3xl mb-2">{branch.icon}</div>
                <h3 className="font-medium text-white text-sm">{branch.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Hemen Deneyin
          </h2>
          <p className="text-slate-400 mb-8">
            14 gün ücretsiz demo ile tüm özellikleri keşfedin.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4
              bg-gradient-to-r from-amber-500 to-orange-600 
              text-slate-900 font-semibold rounded-xl
              hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Tanıtım Talep Et
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
