import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(www)/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
