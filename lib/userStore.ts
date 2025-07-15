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

type ShippingDetails = {
  type: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
};

type User = {
  name: string;
  email: string;
  password: string;
  cart: Product[];
  wishlist: Product[];
  shippingDetails: ShippingDetails[];
};


interface UserState {
  currentUser: User | null;
  users: User[];

  register: (
    name: string,
    email: string,
    password: string,
    shippingDetails?: ShippingDetails
  ) => boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;

  addShippingDetails: (details: ShippingDetails) => void;
  updateShippingDetails: (details: ShippingDetails) => void;
  deleteShippingDetails: (typeToDelete: string) => void;

  updateUser: (user: User) => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      register: (name, email, password, shippingDetails) => {
        const { users } = get();
        if (users.some((u) => u.email === email)) return false;

        const newUser: User = {
          name,
          email,
          password,
          cart: [],
          wishlist: [],
          shippingDetails: shippingDetails ? [shippingDetails] : [],
        };

        set({
          users: [...users, newUser],
          currentUser: newUser,
        });

        document.cookie = `authenticated=true;  Max-Age=${60 * 60 * 24 * 30}; path=/`;
        return true;
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) return false;

        set({ currentUser: user });
        document.cookie = `authenticated=true; Max-Age=${60 * 60 * 24 * 30}; path=/`;
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

      addShippingDetails: (details) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const exists = currentUser.shippingDetails.some(
          (item) => item.type.toLowerCase() === details.type.toLowerCase()
        );
        if (exists) return;

        const updatedUser = {
          ...currentUser,
          shippingDetails: [...currentUser.shippingDetails, details],
        };

        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      updateShippingDetails: (updatedDetail) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedShippingDetails = currentUser.shippingDetails.map((detail) =>
          detail.type === updatedDetail.type ? updatedDetail : detail
        );

        const updatedUser = { ...currentUser, shippingDetails: updatedShippingDetails };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      deleteShippingDetails: (typeToDelete: string) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedShippingDetails = currentUser.shippingDetails.filter(
          (detail) => detail.type !== typeToDelete
        );

        const updatedUser = { ...currentUser, shippingDetails: updatedShippingDetails };
        const updatedUsers = users.map((u) =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      updateUser: (user) => {
        const { users } = get();
        const updatedUsers = users.map((u) =>
          u.email === user.email ? user : u
        );

        set({ currentUser: user, users: updatedUsers });
      },
    }),
    {
      name: 'user-store',
    }
  )
);
