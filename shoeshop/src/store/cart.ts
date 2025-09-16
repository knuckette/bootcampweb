import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export type CartItem = {
productId: string
variantId: string | null
name: string
slug: string
imageUrl?: string
sizeEu?: number | null
unitPriceCents: number
quantity: number
}


type CartState = {
items: CartItem[]
add: (item: CartItem) => void
remove: (productId: string, variantId: string | null) => void
clear: () => void
setQty: (productId: string, variantId: string | null, qty: number) => void
totalCents: () => number
}


export const useCart = create<CartState>()(
persist(
(set, get) => ({
items: [],
add: (item) => {
const key = (i: CartItem) => `${i.productId}:${i.variantId ?? ''}`
const exists = get().items.find((i) => key(i) === key(item))
if (exists) {
set({
items: get().items.map((i) =>
key(i) === key(item) ? { ...i, quantity: i.quantity + item.quantity } : i
),
})
} else {
set({ items: [...get().items, item] })
}
},
remove: (productId, variantId) =>
set({ items: get().items.filter((i) => !(i.productId === productId && i.variantId === variantId)) }),
clear: () => set({ items: [] }),
setQty: (productId, variantId, qty) =>
set({
items: get().items.map((i) =>
i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i
),
}),
totalCents: () => get().items.reduce((s, i) => s + i.unitPriceCents * i.quantity, 0),
}),
{ name: 'shoeshop-cart' }
)
)