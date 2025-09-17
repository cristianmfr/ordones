import { DifferentialsBadges } from '@/components/differentials-badges'
import { HeroBanner } from '@/components/hero-banner'

export function HeroSection() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <HeroBanner />
      <DifferentialsBadges />
    </div>
  )
}
