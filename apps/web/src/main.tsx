import '@ordones/ui/styles/globals.css'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { routeTree } from './route-tree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </StrictMode>
  )
}
