// /app/robot/page.tsx
import { Metadata } from 'next'
import RobotContent from './RobotContent'

export const metadata: Metadata = {
  title: 'YİSA-S Robot',
  description: 'AI destekli akıllı asistan. 7/24 sorularınızı yanıtlar, demo talep eder, yönlendirir.',
}

export default function RobotPage() {
  return <RobotContent />
}
