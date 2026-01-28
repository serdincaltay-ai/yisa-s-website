// /lib/supabase.ts — sunucu/API için; env yoksa null döner, çağıran kontrol etmeli
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Types
export interface DemoRequest {
  id?: string
  name: string
  email: string
  phone?: string
  company_name?: string
  athlete_count?: number
  interested_package?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  status?: string
  created_at?: string
}

export interface FranchiseApplication {
  id?: string
  name: string
  email: string
  phone: string
  city: string
  district?: string
  experience?: string
  investment_budget?: string
  motivation?: string
  status?: string
  created_at?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category?: string
  status?: string
  created_at?: string
}

export interface NewsletterSubscriber {
  id?: string
  email: string
  name?: string
  kvkk_consent: boolean
  created_at?: string
}
