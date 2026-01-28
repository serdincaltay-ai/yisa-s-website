// /app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import AIEnginesSection from '@/components/home/AIEnginesSection'
import PHVSection from '@/components/home/PHVSection'
import PricingPreview from '@/components/home/PricingPreview'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AIEnginesSection />
      <PHVSection />
      <PricingPreview />
      <CTASection />
    </>
  )
}
