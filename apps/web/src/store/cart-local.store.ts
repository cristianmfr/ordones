import type { Product } from '@ordones/codegen/generated'
import Cookies from 'js-cookie'

// Event system for cart updates
type CartEventType =
  | 'item-added'
  | 'item-removed'
  | 'item-updated'
  | 'cart-cleared'
type CartEventListener = (eventType: CartEventType, productId?: string) => void

class CartEventEmitter {
  private listeners: CartEventListener[] = []

  subscribe(listener: CartEventListener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  emit(eventType: CartEventType, productId?: string) {
    this.listeners.forEach(listener => listener(eventType, productId))
  }
}

const cartEvents = new CartEventEmitter()

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  sku: string
  stock: number
  image?: string
  addedAt: string
}

const CART_SESSION_KEY = 'ordones_cart'

export function isUserAuthenticated(): boolean {
  return !!Cookies.get('access_token')
}

class CartSessionStorage {
  private getStoredCart(): CartItem[] {
    try {
      const stored = sessionStorage.getItem(CART_SESSION_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to parse cart from session storage:', error)
      return []
    }
  }

  private setStoredCart(items: CartItem[]): void {
    try {
      sessionStorage.setItem(CART_SESSION_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save cart to session storage:', error)
    }
  }

  addItem(product: Product, quantity: number = 1): boolean {
    if (isUserAuthenticated()) {
      console.warn('User is authenticated, cart should be handled server-side')
      return false
    }

    const items = this.getStoredCart()
    const existingIndex = items.findIndex(item => item.id === product.id)

    if (existingIndex >= 0) {
      const existingItem = items[existingIndex]
      if (existingItem) {
        existingItem.quantity += quantity
      }
      this.setStoredCart(items)
      cartEvents.emit('item-updated', product.id)
      return true
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      sku: product.sku,
      stock: product.stock,
      image: product.images?.[0]?.presignedUrl || undefined,
      addedAt: new Date().toISOString(),
    }

    items.push(cartItem)
    this.setStoredCart(items)
    cartEvents.emit('item-added', product.id)
    return true
  }

  removeItem(productId: string): boolean {
    if (isUserAuthenticated()) {
      console.warn('User is authenticated, cart should be handled server-side')
      return false
    }

    const items = this.getStoredCart()
    const filteredItems = items.filter(item => item.id !== productId)

    if (filteredItems.length === items.length) {
      return false
    }

    this.setStoredCart(filteredItems)
    cartEvents.emit('item-removed', productId)
    return true
  }

  updateItemQuantity(productId: string, quantity: number): boolean {
    if (isUserAuthenticated()) {
      console.warn('User is authenticated, cart should be handled server-side')
      return false
    }

    if (quantity <= 0) {
      return this.removeItem(productId)
    }

    const items = this.getStoredCart()
    const itemIndex = items.findIndex(item => item.id === productId)

    if (itemIndex === -1) {
      return false
    }

    const item = items[itemIndex]
    if (item) {
      item.quantity = quantity
      this.setStoredCart(items)
      cartEvents.emit('item-updated', productId)
      return true
    }

    return false
  }

  hasItem(productId: string): boolean {
    if (isUserAuthenticated()) {
      return false
    }

    const items = this.getStoredCart()
    return items.some(item => item.id === productId)
  }

  getItemQuantity(productId: string): number {
    if (isUserAuthenticated()) {
      return 0
    }

    const items = this.getStoredCart()
    const item = items.find(item => item.id === productId)
    return item?.quantity || 0
  }

  getItems(): CartItem[] {
    if (isUserAuthenticated()) {
      return []
    }

    return this.getStoredCart()
  }

  getCount(): number {
    if (isUserAuthenticated()) {
      return 0
    }

    return this.getStoredCart().reduce(
      (total, item) => total + item.quantity,
      0
    )
  }

  getTotal(): number {
    if (isUserAuthenticated()) {
      return 0
    }

    return this.getStoredCart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  clearAll(): void {
    try {
      sessionStorage.removeItem(CART_SESSION_KEY)
      cartEvents.emit('cart-cleared')
    } catch (error) {
      console.error('Failed to clear cart from session storage:', error)
    }
  }

  getItemsForMigration(): CartItem[] {
    try {
      const stored = sessionStorage.getItem(CART_SESSION_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to get cart items for migration:', error)
      return []
    }
  }
}

export const cartLocalStore = new CartSessionStorage()

export const addToCart = (product: Product, quantity?: number) =>
  cartLocalStore.addItem(product, quantity)
export const removeFromCart = (productId: string) =>
  cartLocalStore.removeItem(productId)
export const updateCartItemQuantity = (productId: string, quantity: number) =>
  cartLocalStore.updateItemQuantity(productId, quantity)
export const isInCart = (productId: string) => cartLocalStore.hasItem(productId)
export const getCartItemQuantity = (productId: string) =>
  cartLocalStore.getItemQuantity(productId)
export const getCartItems = () => cartLocalStore.getItems()
export const getCartCount = () => cartLocalStore.getCount()
export const getCartTotal = () => cartLocalStore.getTotal()
export const clearCart = () => cartLocalStore.clearAll()
export const getCartItemsForMigration = () =>
  cartLocalStore.getItemsForMigration()

// Export event subscription function
export const subscribeToCartChanges = (listener: CartEventListener) =>
  cartEvents.subscribe(listener)
