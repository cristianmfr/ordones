import type { Category } from '@ordones/codegen/generated'
import { Label } from '@ordones/ui/components/label'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className='bg-card/30 hover:border-primary flex w-full flex-col rounded-lg border p-6 transition ease-in'>
      <div className='flex w-full flex-col gap-2'>
        <Label className='text-md font-medium'>{category.name}</Label>
        <Label className='text-muted-foreground text-sm font-light'>
          {category.description}
        </Label>
      </div>
    </div>
  )
}
