import type { Product } from '@ordones/codegen/generated'
import Cookies from 'js-cookie'

type WishlistEventType = 'item-added' | 'item-removed' | 'wishlist-cleared'
type WishlistEventListener = (
  eventType: WishlistEventType,
  productId?: string
) => void

class WishlistEventEmitter {
  private listeners: WishlistEventListener[] = []

  subscribe(listener: WishlistEventListener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  emit(eventType: WishlistEventType, productId?: string) {
    this.listeners.forEach(listener => listener(eventType, productId))
  }
}

const wishlistEvents = new WishlistEventEmitter()

export interface WishlistItem {
  id: string
  name: string
  price: number
  sku: string
  stock: number
  image?: string
  addedAt: string
}

const WISHLIST_SESSION_KEY = 'ordones_wishlist'

export function isUserAuthenticated(): boolean {
  return !!Cookies.get('access_token')
}

class WishlistSessionStorage {
  private getStoredWishlist(): WishlistItem[] {
    try {
      const stored = sessionStorage.getItem(WISHLIST_SESSION_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to parse wishlist from session storage:', error)
      return []
    }
  }

  private setStoredWishlist(items: WishlistItem[]): void {
    try {
      sessionStorage.setItem(WISHLIST_SESSION_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save wishlist to session storage:', error)
    }
  }

  addItem(product: Product): boolean {
    if (isUserAuthenticated()) {
      console.warn(
        'User is authenticated, wishlist should be handled server-side'
      )
      return false
    }

    const items = this.getStoredWishlist()
    const existingIndex = items.findIndex(item => item.id === product.id)

    if (existingIndex >= 0) {
      return false
    }

    const wishlistItem: WishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      stock: product.stock,
      image: product.images?.[0]?.presignedUrl || undefined,
      addedAt: new Date().toISOString(),
    }

    items.push(wishlistItem)
    this.setStoredWishlist(items)
    wishlistEvents.emit('item-added', product.id)
    return true
  }

  removeItem(productId: string): boolean {
    if (isUserAuthenticated()) {
      console.warn(
        'User is authenticated, wishlist should be handled server-side'
      )
      return false
    }

    const items = this.getStoredWishlist()
    const filteredItems = items.filter(item => item.id !== productId)

    if (filteredItems.length === items.length) {
      return false
    }

    this.setStoredWishlist(filteredItems)
    wishlistEvents.emit('item-removed', productId)
    return true
  }

  hasItem(productId: string): boolean {
    if (isUserAuthenticated()) {
      return false
    }

    const items = this.getStoredWishlist()
    return items.some(item => item.id === productId)
  }

  getItems(): WishlistItem[] {
    if (isUserAuthenticated()) {
      return []
    }

    return this.getStoredWishlist()
  }

  getCount(): number {
    if (isUserAuthenticated()) {
      return 0
    }

    return this.getStoredWishlist().length
  }

  clearAll(): void {
    try {
      sessionStorage.removeItem(WISHLIST_SESSION_KEY)
      wishlistEvents.emit('wishlist-cleared')
    } catch (error) {
      console.error('Failed to clear wishlist from session storage:', error)
    }
  }

  getItemsForMigration(): WishlistItem[] {
    try {
      const stored = sessionStorage.getItem(WISHLIST_SESSION_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to get wishlist items for migration:', error)
      return []
    }
  }
}

export const wishlistLocalStore = new WishlistSessionStorage()

export const addToWishlist = (product: Product) =>
  wishlistLocalStore.addItem(product)
export const removeFromWishlist = (productId: string) =>
  wishlistLocalStore.removeItem(productId)
export const isInWishlist = (productId: string) =>
  wishlistLocalStore.hasItem(productId)
export const getWishlistItems = () => wishlistLocalStore.getItems()
export const getWishlistCount = () => wishlistLocalStore.getCount()
export const clearWishlist = () => wishlistLocalStore.clearAll()
export const getWishlistItemsForMigration = () =>
  wishlistLocalStore.getItemsForMigration()

export const subscribeToWishlistChanges = (listener: WishlistEventListener) =>
  wishlistEvents.subscribe(listener)
