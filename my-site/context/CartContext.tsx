'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react'
import { Product } from '@/data/products'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; slug: string }
  | { type: 'SET_QTY'; slug: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.product.slug === action.product.slug)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.slug === action.product.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.product.slug !== action.slug) }
    case 'SET_QTY':
      if (action.qty <= 0)
        return { items: state.items.filter(i => i.product.slug !== action.slug) }
      return {
        items: state.items.map(i =>
          i.product.slug === action.slug ? { ...i, quantity: action.qty } : i
        ),
      }
    case 'CLEAR':
      return { items: [] }
    case 'LOAD':
      return { items: action.items }
  }
}

type CartContextValue = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const stored = localStorage.getItem('acordz-cart')
      if (stored) dispatch({ type: 'LOAD', items: JSON.parse(stored) })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('acordz-cart', JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: product => dispatch({ type: 'ADD', product }),
        removeItem: slug => dispatch({ type: 'REMOVE', slug }),
        setQty: (slug, qty) => dispatch({ type: 'SET_QTY', slug, qty }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
