export function calculateInstallmentsValues(
  baseValue: number,
  installments: number,
): number {
  return baseValue / installments
}

export function calculateValueByPercentage(
  baseValue: number,
  percentage: number,
): number {
  const decimalPercentage = percentage / 100
  const discountedValue = baseValue * decimalPercentage

  return baseValue - discountedValue
}
