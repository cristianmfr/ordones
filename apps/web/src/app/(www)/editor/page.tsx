import { createFileRoute } from '@tanstack/react-router'
import { MugEditor } from '@/components/editor'

export const Route = createFileRoute('/(www)/editor/')({
  component: EditorPage,
  head: () => ({
    meta: [
      {
        title: 'Editor de Canecas | Ordones',
      },
    ],
  }),
})

function EditorPage() {
  return (
    <div className='min-h-screen'>
      <MugEditor />
    </div>
  )
}
