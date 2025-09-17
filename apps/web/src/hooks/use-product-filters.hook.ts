import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

export const productFiltersSchema = {
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  categories: parseAsArrayOf(parseAsString, ';'),
  tags: parseAsArrayOf(parseAsString, ';'),
  search: parseAsString,
  take: parseAsInteger,
  skip: parseAsInteger,
  order: parseAsStringEnum(['relevance', 'asc', 'desc', 'min', 'max']),
}

export function useProductsFilters() {
  const [params, setParams] = useQueryStates(productFiltersSchema)
  return { params, setParams }
}
