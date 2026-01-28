// /app/fiyatlandirma/page.tsx
import { Metadata } from 'next'
import FiyatlandirmaContent from './FiyatlandirmaContent'

export const metadata: Metadata = {
  title: 'Fiyatlandırma',
  description: 'YİSA-S paketleri: Başlangıç, Profesyonel ve Kurumsal. İhtiyacınıza uygun planı seçin.',
}

export default function FiyatlandirmaPage() {
  return <FiyatlandirmaContent />
}
