import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    rating: number;
    category: string;
    type: string;
}

interface CartState {
    cart: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
            removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
            
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
)