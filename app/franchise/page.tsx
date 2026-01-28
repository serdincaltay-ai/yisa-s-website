// /app/franchise/page.tsx
import { Metadata } from 'next'
import FranchiseContent from './FranchiseContent'

export const metadata: Metadata = {
  title: 'Bayilik',
  description: 'YİSA-S franchise fırsatı. Kendi bölgenizde sporcu analiz sistemi bayisi olun.',
}

export default function FranchisePage() {
  return <FranchiseContent />
}
