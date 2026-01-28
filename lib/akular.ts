// ═══════════════════════════════════════════════════════════════════
// YİSA-S — TÜM AKÜLER (Projede Tanımlı ve Aktiflik Kontrolü)
// GPT, Claude, Together, Gemini, v0, Cursor, GitHub, Vercel, Supabase, Railway
// ═══════════════════════════════════════════════════════════════════

export type AkuTipi = 'ai' | 'platform' | 'deploy' | 'dev'

export interface AkuTanimi {
  id: string
  name: string
  envKeys: string[]
  tip: AkuTipi
  aciklama: string
  docUrl?: string
}

/** Projede tanımlı tüm aküler. envKeys'teki değişkenlerden biri doluysa "aktif" sayılır. */
export const AKULAR: AkuTanimi[] = [
  {
    id: 'gpt',
    name: 'GPT',
    envKeys: ['OPENAI_API_KEY'],
    tip: 'ai',
    aciklama: 'OpenAI GPT — hızlı iletişim, anlık içerik üretimi',
    docUrl: 'https://platform.openai.com/docs',
  },
  {
    id: 'claude',
    name: 'Claude',
    envKeys: ['ANTHROPIC_API_KEY'],
    tip: 'ai',
    aciklama: 'Anthropic Claude — derin analiz, NeebChat varsayılan motor',
    docUrl: 'https://docs.anthropic.com',
  },
  {
    id: 'together',
    name: 'Together',
    envKeys: ['TOGETHER_API_KEY'],
    tip: 'ai',
    aciklama: 'Together AI — ekonomik, yüksek hacimli rutin görevler',
    docUrl: 'https://docs.together.ai',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    envKeys: ['GOOGLE_GENERATIVE_AI_API_KEY', 'GEMINI_API_KEY'],
    tip: 'ai',
    aciklama: 'Google Gemini — görsel analiz, video/foto hareket analizi',
    docUrl: 'https://ai.google.dev/docs',
  },
  {
    id: 'v0',
    name: 'v0',
    envKeys: ['VERCEL_URL', 'VITE_VERCEL_*'],
    tip: 'platform',
    aciklama: 'Vercel v0 — UI bileşeni üretimi, tasarım',
    docUrl: 'https://v0.dev',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    envKeys: ['CURSOR_WORKSPACE_ID', 'CURSOR_*'],
    tip: 'dev',
    aciklama: 'Cursor IDE — geliştirme, ROB-CURSOR kurulum görevleri',
  },
  {
    id: 'github',
    name: 'GitHub',
    envKeys: ['GITHUB_TOKEN', 'GITHUB_ACTIONS', 'GITHUB_REPOSITORY'],
    tip: 'platform',
    aciklama: 'GitHub — repo, CI/CD, sürüm takibi',
    docUrl: 'https://docs.github.com',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    envKeys: ['VERCEL', 'VERCEL_URL', 'VERCEL_ENV'],
    tip: 'deploy',
    aciklama: 'Vercel — Next.js deploy, edge, otomatik build',
    docUrl: 'https://vercel.com/docs',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    envKeys: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    tip: 'platform',
    aciklama: 'Supabase — Auth, PostgreSQL, RLS, panel ve formlar',
    docUrl: 'https://supabase.com/docs',
  },
  {
    id: 'railway',
    name: 'Railway',
    envKeys: ['RAILWAY_ENVIRONMENT', 'RAILWAY_PROJECT_ID', 'RAILWAY_SERVICE_ID', 'RAILWAY_TOKEN'],
    tip: 'deploy',
    aciklama: 'Railway — alternatif deploy, DB, servis barındırma',
    docUrl: 'https://docs.railway.app',
  },
]

/** Sunucu tarafında kullanım: hangi akülerin env değişkenleri tanımlı (aktif). */
export function getAkuDurumu(): { id: string; name: string; aktif: boolean; tip: AkuTipi }[] {
  return AKULAR.map((a) => ({
    id: a.id,
    name: a.name,
    aktif: a.envKeys.some((k) => typeof process !== 'undefined' && !!process.env?.[k]),
    tip: a.tip,
  }))
}

/** Sadece AI tipi akülerden aktif olanların id listesi. */
export function getAktifAIMotorlari(): string[] {
  return getAkuDurumu()
    .filter((x) => x.tip === 'ai' && x.aktif)
    .map((x) => x.id)
}

/** id ile aku tanımı. */
export function getAkuById(id: string): AkuTanimi | undefined {
  return AKULAR.find((a) => a.id === id)
}
