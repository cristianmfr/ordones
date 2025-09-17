import { Button } from '@ordones/ui/components/button'
import { Logo } from '@ordones/ui/components/logo'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ordones/ui/components/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ordones/ui/components/popover'
import { cn } from '@ordones/ui/lib/utils'
import { IconUser } from '@tabler/icons-react'
import { Link, useLocation } from '@tanstack/react-router'
import { CartSheet } from '../cart/cart-sheet'
import { WishlistSheet } from '../wishlist/wishlist-sheet'

const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/categories', label: 'Categorias' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Quem Somos' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className='border-b px-4 md:px-6'>
      <div className='flex h-16 items-center justify-between gap-4'>
        <div className='flex flex-1 items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className='group size-8 md:hidden'
                variant='ghost'
                size='icon'>
                <svg
                  className='pointer-events-none'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M4 12L20 12'
                    className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-36 p-1 md:hidden'>
              <NavigationMenu className='max-w-none *:w-full'>
                <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className='w-full'>
                      <NavigationMenuLink href={link.href} className='py-1.5'>
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo className='w-20' />
            </Link>
          </div>
        </div>
        <div className='py-2 max-md:hidden'>
          <NavigationMenu>
            <NavigationMenuList className='gap-2'>
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      link.href === pathname && link.href.includes(pathname)
                        ? 'text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary'
                        : 'text-muted-foreground hover:text-white',
                      'py-1.5 font-medium hover:brightness-90'
                    )}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className='flex flex-1 items-center justify-end gap-2'>
          <WishlistSheet />
          <CartSheet />
          <Button type='button' variant='ghost' asChild>
            <Link to='/profile'>
              <IconUser />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
