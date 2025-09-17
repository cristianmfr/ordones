import { parseAsStringEnum, useQueryStates } from 'nuqs'

const pageOrderParamsSchema = {
  order: parseAsStringEnum(['relevance', 'asc', 'desc', 'min', 'max']),
}

export function usePageOrderParams() {
  const [params, setParams] = useQueryStates(pageOrderParamsSchema)
  return { ...params, setParams }
}
