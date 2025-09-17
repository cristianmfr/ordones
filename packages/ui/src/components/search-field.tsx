import { Input } from '@ordones/ui/components/input'
import { SearchIcon } from 'lucide-react'
import { useId } from 'react'

export function SearchField() {
  const id = useId()
  return (
    <div className="relative w-full max-w-sm">
      <Input
        id={id}
        className="peer pe-9 ps-9"
        placeholder="Pesquisar..."
        type="search"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
  )
}
