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

interface WishlistState {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlist: [],
            addToWishlist: (product) => set((state) => ({ wishlist: [...state.wishlist, product] })),
            removeFromWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter((item) => item.id !== id) })),
            clearWishlist: () => set({ wishlist: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
)