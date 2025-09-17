export function getCurrentPage(skip: number, take: number): number {
  if (take <= 0) return 1
  return Math.floor(skip / take) + 1
}

export function getSkipFromPage(page: number, take: number): number {
  if (page <= 1) return 0
  return (page - 1) * take
}

export function getTotalPages(total: number, take: number): number {
  if (take <= 0 || total <= 0) return 1
  return Math.ceil(total / take)
}

export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages
}
