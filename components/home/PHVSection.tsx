// /components/home/PHVSection.tsx
'use client'

import { motion } from 'framer-motion'
import { PHV } from '@/lib/knowledge/yisas'
import { Shield, TrendingUp, Heart, AlertTriangle } from 'lucide-react'

const icons = [Shield, TrendingUp, Heart, AlertTriangle]

export default function PHVSection() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
              <Heart size={16} />
              Sporcu Sağlığı Önceliğimiz
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="text-gradient">{PHV.name}</span>
            </h2>
            <p className="text-lg text-slate-300 mb-4">
              {PHV.fullName}
            </p>
            <p className="text-slate-400 mb-8">
              {PHV.description}
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {PHV.benefits.map((benefit, i) => {
                const Icon = icons[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Icon size={20} className="text-emerald-400" />
                    </div>
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Warning */}
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-300">
                  {PHV.warning}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* PHV Stages */}
            <div className="space-y-4">
              {PHV.stages.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{stage.name}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full
                      ${stage.risk === 'Düşük' ? 'bg-emerald-500/20 text-emerald-400' :
                        stage.risk === 'Orta' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'}`}>
                      Risk: {stage.risk}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{stage.description}</p>
                  
                  {/* Progress bar visualization */}
                  <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(i + 1) * 25}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.15 }}
                      className={`h-full rounded-full
                        ${stage.risk === 'Düşük' ? 'bg-emerald-500' :
                          stage.risk === 'Orta' ? 'bg-amber-500' :
                          'bg-red-500'}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
