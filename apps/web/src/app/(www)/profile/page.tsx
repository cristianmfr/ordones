import { useQuery } from '@apollo/client'
import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'
import { createFileRoute } from '@tanstack/react-router'
import {
  CreditCardIcon,
  IdCardIcon,
  LogOutIcon,
  MapPinIcon,
  ShieldIcon,
  ShoppingBagIcon,
  User2Icon,
} from 'lucide-react'
import { UserProfileCard } from '@/components/user/user-profile-card'
import { USER_AUTHENTICATED } from '@/graphql/queries/user.queries'
import { useAuthentication } from '@/hooks/use-authentication.hook'
import { middleware } from '@/middleware'

export const Route = createFileRoute('/(www)/profile/')({
  component: ProfilePage,
  beforeLoad: ({ location }) => {
    return middleware(location.pathname)
  },
})

function ProfilePage() {
  const { data: currentUserQuery } = useQuery(USER_AUTHENTICATED)
  const { logout } = useAuthentication()
  const currentUser = currentUserQuery?.userAuthenticated

  const options = [
    {
      icon: IdCardIcon,
      title: 'Informações pessoais',
      description: 'Documentos de identidade e atividade econômica',
      link: '/profile/me',
    },
    {
      icon: User2Icon,
      title: 'Sua conta',
      description: 'Dados que representam a conta na Ordones.',
      link: '/profile/account',
    },
    {
      icon: ShoppingBagIcon,
      title: 'Pedidos',
      description: 'Seus pedidos realizados na Ordones',
      link: '/profile/orders',
    },
    {
      icon: ShieldIcon,
      title: 'Segurança',
      description: 'Informações de segurança da sua conta.',
      link: '/profile/security',
    },
    {
      icon: MapPinIcon,
      title: 'Endereços',
      description: 'Endereços salvos na sua conta.',
      link: '/profile/address',
    },
    {
      icon: CreditCardIcon,
      title: 'Pagamento',
      description: 'Métodos de pagamento salvos.',
      link: '/profile/me',
    },
  ]

  return (
    <div className='flex flex-col w-full h-[40rem] items-center justify-start'>
      <div className='grid grid-cols-10 w-full gap-4'>
        <div className='flex w-full gap-4 col-span-6 col-start-3 mt-4 rounded-lg h-[8rem] items-center justify-between px-6'>
          <div className='flex items-center gap-4'>
            <div className='flex flex-col items-center justify-center size-20 bg-muted-foreground text-white/50 rounded-full'>
              <User2Icon className='size-10' />
            </div>
            <div className='flex flex-col'>
              <Label className='text-lg font-medium'>
                {currentUser?.name ?? '-'}
              </Label>
              <Label className='text-sm font-normal text-muted-foreground'>
                {currentUser?.email ?? '-'}
              </Label>
            </div>
          </div>
          <div className='flex flex-col h-full items-center justify-center'>
            <Button variant='secondary' size='icon' onClick={logout}>
              <LogOutIcon />
            </Button>
          </div>
        </div>
        <div className='col-span-6 col-start-3 grid grid-cols-3 w-full gap-4'>
          {options.map((option, index) => (
            <UserProfileCard
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
              link={option.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
