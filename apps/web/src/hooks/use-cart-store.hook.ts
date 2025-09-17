import { useEffect, useState } from 'react'
import {
  type CartItem,
  getCartCount,
  getCartItemQuantity,
  getCartItems,
  getCartTotal,
  isInCart,
  subscribeToCartChanges,
} from '@/store/cart-local.store'

export function useCartItems() {
  const [items, setItems] = useState<CartItem[]>(() => getCartItems())

  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(() => {
      setItems(getCartItems())
    })

    return unsubscribe
  }, [])

  return items
}

export function useCartCount() {
  const [count, setCount] = useState(() => getCartCount())

  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(() => {
      setCount(getCartCount())
    })

    return unsubscribe
  }, [])

  return count
}

export function useCartTotal() {
  const [total, setTotal] = useState(() => getCartTotal())

  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(() => {
      setTotal(getCartTotal())
    })

    return unsubscribe
  }, [])

  return total
}

export function useCartItemQuantity(productId: string) {
  const [quantity, setQuantity] = useState(() => getCartItemQuantity(productId))

  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(
      (eventType, changedProductId) => {
        if (changedProductId === productId || eventType === 'cart-cleared') {
          setQuantity(getCartItemQuantity(productId))
        }
      }
    )

    return unsubscribe
  }, [productId])

  useEffect(() => {
    setQuantity(getCartItemQuantity(productId))
  }, [productId])

  return quantity
}

export function useIsInCart(productId: string) {
  const [inCart, setInCart] = useState(() => isInCart(productId))

  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(
      (eventType, changedProductId) => {
        if (changedProductId === productId || eventType === 'cart-cleared') {
          setInCart(isInCart(productId))
        }
      }
    )

    return unsubscribe
  }, [productId])

  useEffect(() => {
    setInCart(isInCart(productId))
  }, [productId])

  return inCart
}
