/**
 * Convert cents (integer) to real value (float)
 * @param cents - Value in cents (integer)
 * @returns Value in reais (float)
 * @example
 * centsToReal(1999) // returns 19.99
 * centsToReal(500) // returns 5.00
 */
export function centsToReal(cents: number): number {
  return cents / 100
}

/**
 * Convert real value (float) to cents (integer)
 * @param real - Value in reais (float)
 * @returns Value in cents (integer)
 * @example
 * realToCents(19.99) // returns 1999
 * realToCents(5.00) // returns 500
 */
export function realToCents(real: number): number {
  return Math.round(real * 100)
}