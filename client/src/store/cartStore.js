import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const { cartItems } = get()
    const existing = cartItems.find((item) => item.id === product.id)
    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      set({ cartItems: updated })
    } else {
      set({ cartItems: [...cartItems, { ...product, quantity: 1 }] })
    }
  },

  removeFromCart: (productId) => {
    const { cartItems } = get()
    const existing = cartItems.find((item) => item.id === productId)
    if (!existing) return

    if (existing.quantity > 1) {
      const updated = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      set({ cartItems: updated })
    } else {
      set({ cartItems: cartItems.filter((item) => item.id !== productId) })
    }
  },

  clearCart: () => set({ cartItems: [] }),

  getItemCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
  getCartTotalMinor: () =>
    get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
})) 