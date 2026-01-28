// YİSA-S PWA — Web App Manifest
import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/knowledge/yisas'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yisa-s.com'
  return {
    name: `${BRAND.name} - ${BRAND.fullName}`,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0f172a',
    theme_color: '#f59e0b',
    categories: ['spor', 'egitim', 'saglik'],
    lang: 'tr',
    icons: [
      { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon-192.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon-192.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Ana Sayfa', short_name: 'Ana Sayfa', url: '/', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
      { name: 'Tanıtım Talep', short_name: 'Tanıtım', url: '/demo', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
      { name: 'Bayilik', short_name: 'Bayilik', url: '/franchise', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
      { name: 'Giriş', short_name: 'Giriş', url: '/giris', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
    ],
  }
}
