import {
  getWishlistCount,
  getWishlistItems,
  isInWishlist,
  subscribeToWishlistChanges,
  type WishlistItem,
} from '@/store/wishlist-local.store'
import { useEffect, useState } from 'react'

export function useWishlistItems() {
  const [items, setItems] = useState<WishlistItem[]>(() => getWishlistItems())

  useEffect(() => {
    const unsubscribe = subscribeToWishlistChanges(() => {
      setItems(getWishlistItems())
    })

    return unsubscribe
  }, [])

  return items
}

export function useWishlistCount() {
  const [count, setCount] = useState(() => getWishlistCount())

  useEffect(() => {
    const unsubscribe = subscribeToWishlistChanges(() => {
      setCount(getWishlistCount())
    })

    return unsubscribe
  }, [])

  return count
}

export function useIsInWishlist(productId: string) {
  const [inWishlist, setInWishlist] = useState(() => isInWishlist(productId))

  useEffect(() => {
    const unsubscribe = subscribeToWishlistChanges(
      (eventType, changedProductId) => {
        if (
          changedProductId === productId ||
          eventType === 'wishlist-cleared'
        ) {
          setInWishlist(isInWishlist(productId))
        }
      },
    )

    return unsubscribe
  }, [productId])

  useEffect(() => {
    setInWishlist(isInWishlist(productId))
  }, [productId])

  return inWishlist
}
