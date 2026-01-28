// /components/home/AIEnginesSection.tsx
'use client'

import { motion } from 'framer-motion'
import { AI_ENGINES } from '@/lib/knowledge/yisas'

export default function AIEnginesSection() {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            <span className="text-gradient">6 AI Motoru</span> ile Güç
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Her görev için en uygun yapay zeka motorunu otomatik seçen 
            akıllı orkestrasyon sistemi.
          </p>
        </motion.div>

        {/* AI Engines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_ENGINES.map((engine, i) => (
            <motion.div
              key={engine.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6
                hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${engine.color}20` }}
                >
                  {engine.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {engine.name}
                  </h3>
                  <p className="text-sm font-medium mb-2" style={{ color: engine.color }}>
                    {engine.role}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {engine.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
