// /app/blog/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-950">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-lg text-slate-400 mb-12">
            Sporcu gelişimi, yapay zeka ve çocuk sağlığı hakkında yazılar
          </p>
          
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12">
            <p className="text-slate-400">Yakında içerikler eklenecek...</p>
          </div>
        </div>
      </section>
    </div>
  )
}
