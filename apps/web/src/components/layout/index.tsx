import { HeadContent, Outlet } from '@tanstack/react-router'
import { Footer } from './footer'
import { Header } from './header'

export function Layout() {
  return (
    <>
      <HeadContent />
      <Header />

      <div className='flex w-full flex-1 flex-col'>
        <div className='flex h-full w-full flex-col gap-4'>
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  )
}
