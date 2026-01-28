// /app/ozellikler/page.tsx
import { Metadata } from 'next'
import OzelliklerContent from './OzelliklerContent'

export const metadata: Metadata = {
  title: 'Özellikler',
  description: '900 alan değerlendirme, 6 AI motoru, PHV takibi ve 10 branş desteği ile YİSA-S özelliklerini keşfedin.',
}

export default function OzelliklerPage() {
  return <OzelliklerContent />
}
