// Tarayıcıda oturumu çerezlerde tutan Supabase istemcisi (middleware ile uyumlu).
import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = (url && key)
  ? createBrowserClient(url, key)
  : null
