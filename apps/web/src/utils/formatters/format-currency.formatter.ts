export function formatToBRL(
  value: number | string | null | undefined,
  options?: {
    showSymbol?: boolean
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  },
): string {
  if (value === null || value === undefined || value === '') {
    return options?.showSymbol !== false ? 'R$ 0,00' : '0,00'
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numericValue)) {
    return options?.showSymbol !== false ? 'R$ 0,00' : '0,00'
  }

  const {
    showSymbol = true,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {}

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  })

  return formatter.format(numericValue)
}

export function formatCurrency(
  value: number | string | null | undefined,
): string {
  return formatToBRL(value)
}

export function formatToBRLNumber(
  value: number | string | null | undefined,
): string {
  return formatToBRL(value, { showSymbol: false })
}
