import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  type: string;
};

type User = {
  name: string;
  email: string;
  password: string;
  cart: Product[];
  wishlist: Product[];
};

interface UserState {
  currentUser: User | null;
  users: User[];
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;

  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      register: (name, email, password) => {
        const { users } = get();
        if (users.some((u) => u.email === email)) return false;

        const newUser: User = { name, email, password, cart: [], wishlist: [] };
        set({
          users: [...users, newUser],
          currentUser: newUser,
        });
        document.cookie = `authenticated=true; Max-Age=Infinity; path=/`;
        return true;
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) return false;

        set({ currentUser: user });
        document.cookie = `authenticated=true; Max-Age=Infinity; path=/`;
        return true;
      },

      logout: () => {
        set({ currentUser: null });
        document.cookie = `authenticated=; Max-Age=0; path=/`;
      },

      isAuthenticated: () => {
        return !!get().currentUser;
      },
        
      addToCart: (product) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedCart = [...currentUser.cart, product];
        const updatedUser = { ...currentUser, cart: updatedCart };

        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      removeFromCart: (id) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedCart = currentUser.cart.filter((item) => item.id !== id);
        const updatedUser = { ...currentUser, cart: updatedCart };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      clearCart: () => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, cart: [] };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      addToWishlist: (product) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedWishlist = [...currentUser.wishlist, product];
        const updatedUser = { ...currentUser, wishlist: updatedWishlist };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      removeFromWishlist: (id) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedWishlist = currentUser.wishlist.filter((item) => item.id !== id);
        const updatedUser = { ...currentUser, wishlist: updatedWishlist };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      clearWishlist: () => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, wishlist: [] };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },
    }),
    {
      name: 'user-store',
    }
  )
);

