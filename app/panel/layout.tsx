import type { Metadata } from 'next'
import { BRAND } from '@/lib/knowledge/yisas'

export const metadata: Metadata = {
  title: `Kontrol Paneli | ${BRAND.name}`,
  description: 'YİSA-S yönetim ve kontrol paneli',
  robots: { index: false, follow: false },
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
