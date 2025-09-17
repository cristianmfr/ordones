export function calculateDiscountedPrice(
  price: number | string | null | undefined,
  discountPercent: number | string | null | undefined,
): number {
  if (
    price === null ||
    price === undefined ||
    discountPercent === null ||
    discountPercent === undefined
  ) {
    return 0
  }

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  const numericDiscount =
    typeof discountPercent === 'string'
      ? parseFloat(discountPercent)
      : discountPercent

  if (isNaN(numericPrice) || isNaN(numericDiscount)) {
    return 0
  }

  if (numericPrice < 0) {
    return 0
  }

  const clampedDiscount = Math.max(0, Math.min(100, numericDiscount))

  const discountAmount = (numericPrice * clampedDiscount) / 100
  const finalPrice = numericPrice - discountAmount

  return Math.round(finalPrice * 100) / 100
}

export function calculateDiscountAmount(
  price: number | string | null | undefined,
  discountPercent: number | string | null | undefined,
): number {
  if (
    price === null ||
    price === undefined ||
    discountPercent === null ||
    discountPercent === undefined
  ) {
    return 0
  }

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  const numericDiscount =
    typeof discountPercent === 'string'
      ? parseFloat(discountPercent)
      : discountPercent

  if (isNaN(numericPrice) || isNaN(numericDiscount)) {
    return 0
  }

  if (numericPrice < 0) {
    return 0
  }

  const clampedDiscount = Math.max(0, Math.min(100, numericDiscount))

  const discountAmount = (numericPrice * clampedDiscount) / 100

  return Math.round(discountAmount * 100) / 100
}

export function calculateSavingsPercent(
  originalPrice: number | string | null | undefined,
  finalPrice: number | string | null | undefined,
): number {
  if (
    originalPrice === null ||
    originalPrice === undefined ||
    finalPrice === null ||
    finalPrice === undefined
  ) {
    return 0
  }

  const numericOriginal =
    typeof originalPrice === 'string'
      ? parseFloat(originalPrice)
      : originalPrice
  const numericFinal =
    typeof finalPrice === 'string' ? parseFloat(finalPrice) : finalPrice

  if (isNaN(numericOriginal) || isNaN(numericFinal) || numericOriginal <= 0) {
    return 0
  }

  const savings = numericOriginal - numericFinal
  const savingsPercent = (savings / numericOriginal) * 100

  return Math.max(0, Math.min(100, Math.round(savingsPercent * 10) / 10))
}
