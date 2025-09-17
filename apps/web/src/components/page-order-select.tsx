import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ordones/ui/components/select'
import { usePageOrderParams } from '@/hooks/use-page-order-filter'

export function PageOrderSelect() {
  const { order, setParams } = usePageOrderParams()

  return (
    <div className='flex items-end justify-end'>
      <Select
        value={order || 'relevance'}
        onValueChange={value =>
          setParams({
            order: value as 'relevance' | 'asc' | 'desc' | 'min' | 'max',
          })
        }>
        <SelectTrigger>
          <SelectValue placeholder='Ordenar por' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='relevance'>Relevância</SelectItem>
          <SelectItem value='asc'>Título A-Z</SelectItem>
          <SelectItem value='desc'>Título Z-A</SelectItem>
          <SelectItem value='min'>Menor valor</SelectItem>
          <SelectItem value='max'>Maior valor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
