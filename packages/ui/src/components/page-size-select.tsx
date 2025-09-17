import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ordones/ui/components/select'

type PageSizeSelectorProps = {
  pageSize: number
  onPageSizeChange: (size: number) => void
}

export function PageSizeSelect({
  pageSize,
  onPageSizeChange,
}: PageSizeSelectorProps) {
  return (
    <Select
      value={String(pageSize)}
      onValueChange={(value) => onPageSizeChange(Number(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Tamanho da pagina" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items por pagina</SelectLabel>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
