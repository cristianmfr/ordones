import { ApolloProvider } from '@apollo/client'
import Toaster from '@ordones/ui/components/toaster'
import { ThemeProvider } from '@ordones/ui/providers/theme-provider'
import { Suspense } from 'react'
import { apolloClient } from '@/config/apollo.config'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          {children}
          <Toaster theme='dark' position='bottom-right' richColors />
        </ThemeProvider>
      </ApolloProvider>
    </Suspense>
  )
}
