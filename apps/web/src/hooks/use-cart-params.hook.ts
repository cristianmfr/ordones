import { parseAsBoolean, useQueryStates } from 'nuqs'

export const cartParamsSchema = {
  buyProduct: parseAsBoolean,
}

export function useCartParams() {
  const [params, setParams] = useQueryStates(cartParamsSchema)
  return { params, setParams }
}
