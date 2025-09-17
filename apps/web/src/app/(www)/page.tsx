import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/sections/home-hero-section'
import { SalesSection } from '@/components/sections/home-sales-section'
import { WholesaleSection } from '@/components/sections/home-wholesale-section'

export const Route = createFileRoute('/(www)/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Início | Ordones',
      },
    ],
  }),
})

function HomePage() {
  return (
    <div className='flex w-full flex-col gap-4 p-6'>
      <HeroSection />
      <SalesSection />
      <WholesaleSection />
    </div>
  )
}
