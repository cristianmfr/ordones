import { useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import { Form } from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import { Label } from '@ordones/ui/components/label'
import type { Option } from '@ordones/ui/components/multiselect'
import { MultiSelectField } from '@ordones/ui/components/multiselect-field'
import { Separator } from '@ordones/ui/components/separator'
import { Slider } from '@ordones/ui/components/slider'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { CATEGORIES } from '@/graphql/queries/categories.queries'
import { TAGS } from '@/graphql/queries/tags.queries'
import { useProductsFilters } from '@/hooks/use-product-filters.hook'

const filtersSchema = z.object({
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
})

export function ProductsFilters() {
  const { params, setParams } = useProductsFilters()

  const [priceRange, setPriceRange] = useState([
    params.minPrice ?? 0,
    params.maxPrice ?? 1000,
  ])

  const form = useForm<z.infer<typeof filtersSchema>>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      categories: params.categories ?? [],
      tags: params.tags ?? [],
      minPrice: params.minPrice ?? 0,
      maxPrice: params.maxPrice ?? 1000,
      search: '',
    },
  })

  useEffect(() => {
    form.reset({
      categories: params.categories ?? [],
      tags: params.tags ?? [],
      minPrice: params.minPrice ?? 0,
      maxPrice: params.maxPrice ?? 1000,
      search: '',
    })
    setPriceRange([params.minPrice ?? 0, params.maxPrice ?? 1000])
  }, [params, form])

  const { data: tagsData, loading: tagsLoading } = useQuery(TAGS, {
    variables: {
      query: {
        skip: 0,
        take: 1000,
      },
    },
  })

  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    CATEGORIES,
    {
      variables: {
        query: {
          skip: 0,
          take: 1000,
        },
      },
    }
  )

  const tags: Option[] = tagsData?.tags?.items
    ? tagsData.tags.items.map(tag => ({
        label: tag.name,
        value: tag.id,
      }))
    : []

  const categories: Option[] = categoriesData?.categories?.items
    ? categoriesData.categories.items.map(category => ({
        label: category.name,
        value: category.id,
      }))
    : []

  const handleSubmit = (data: z.infer<typeof filtersSchema>) => {
    const newParams: any = {}

    if (data.categories && data.categories.length > 0) {
      newParams.categories = data.categories
    }
    if (data.tags && data.tags.length > 0) {
      newParams.tags = data.tags
    }
    if (priceRange?.[0] && priceRange[0] > 0) {
      newParams.minPrice = priceRange[0]
    }
    if (priceRange?.[1] && priceRange[1] < 1000) {
      newParams.maxPrice = priceRange[1]
    }
    if (data.search?.trim()) {
      newParams.search = data.search.trim()
    }

    newParams.skip = 0

    setParams(newParams)
  }

  const handleClear = () => {
    form.reset({
      categories: [],
      tags: [],
      minPrice: 0,
      maxPrice: 1000,
      search: '',
    })
    setPriceRange([0, 1000])
    setParams({
      categories: null,
      tags: null,
      minPrice: null,
      maxPrice: null,
      search: null,
      skip: 0,
    })
  }

  const handlePriceChange = (newValue: number[]) => {
    setPriceRange(newValue)
    form.setValue('minPrice', newValue[0])
    form.setValue('maxPrice', newValue[1])
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='bg-card/30 grid w-full gap-4 rounded-lg border p-6'>
        <Label className='text-sm font-medium'>Filtros</Label>
        <div className='relative flex w-full items-center'>
          <IconSearch className='text-muted-foreground absolute left-4 size-4' />
          <Input
            placeholder='Pesquisar nos resultados'
            className='pl-10'
            {...form.register('search')}
          />
        </div>
        <Separator />
        <MultiSelectField
          name='categories'
          control={form.control}
          label='Categorias'
          placeholder='Selecione as categorias'
          items={categories}
          isLoading={categoriesLoading}
        />
        <MultiSelectField
          name='tags'
          control={form.control}
          label='Tags'
          placeholder='Selecione as tags'
          items={tags}
          isLoading={tagsLoading}
        />
        <Separator />
        <div className='flex w-full flex-col gap-4'>
          <Label className='text-sm font-medium'>Preço</Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={1000}
            showTooltip
          />
          <div className='flex w-full items-center justify-between'>
            <Label className='text-muted-foreground text-xs'>
              R$ {priceRange[0]}
            </Label>
            <Label className='text-muted-foreground text-xs'>
              R$ {priceRange[1]}
            </Label>
          </div>
        </div>
        <div className='grid w-full grid-cols-2 gap-2'>
          <Button type='button' variant='secondary' onClick={handleClear}>
            Limpar
          </Button>
          <Button type='submit'>Filtrar</Button>
        </div>
      </form>
    </Form>
  )
}
