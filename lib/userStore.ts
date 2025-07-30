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
  description: string;
  quantity : number;
  orders?: Order[];
};

type ShippingDetails = {
  type: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
};

export type Order = {
  id: string;
  date: string;
  items: Product[];
  total: number;
  shippingAddress: ShippingDetails;
  paymentMethod: string;
};

type User = {
  name: string;
  email: string;
  password: string;
  cart: Product[];
  wishlist: Product[];
  shippingDetails: ShippingDetails[];
  orders: Order[];
};

interface UserState {
  gusteUser: User | null;
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
  deleteUser: (email: string) => void;

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;

  quantity: (id: number) => number;
  updateQuantity: (id: number, quantity: number) => void;

  addShippingDetails: (details: ShippingDetails) => void;
  updateShippingDetails: (details: ShippingDetails) => void;
  deleteShippingDetails: (typeToDelete: string) => void;

  addOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  clearOrders: () => void;

  updateUser: (user: User) => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      gusteUser: null,
      currentUser: null,
      users: [],

      register: (name, email, password, shippingDetails) => {
        const { users, gusteUser } = get();
        if (users.some((u) => u.email === email)) return false;

        const newUser: User = {
          name,
          email,
          password,
          cart: gusteUser ? [...gusteUser.cart] : [],
          wishlist: [],
          shippingDetails: shippingDetails ? [shippingDetails] : [],
          orders: [],
        };
        set({ users: [...users, newUser], currentUser: newUser, gusteUser: null });
        document.cookie = `authenticated=true;  Max-Age=${60 * 60 * 24 * 30}; path=/`;
        return true;
      },

      login: (email, password) => {
        const { users, gusteUser } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) return false;

        if (gusteUser) {
          set({ currentUser: { ...user, cart: [...gusteUser.cart, ...user.cart] }, gusteUser: null });
        } else {
          set({ currentUser: user, gusteUser: null });
        }
        document.cookie = `authenticated=true; Max-Age=${60 * 60 * 24 * 30}; path=/`;
        return true;
      },

      logout: () => {
        set({ currentUser: null });
        document.cookie = `authenticated=; Max-Age=0; path=/`;
      },

      deleteUser: (email) => {
        const { users } = get();
        const updatedUsers = users.filter((u) => u.email !== email);
        set({ users: updatedUsers });
      },

      isAuthenticated: () => {
        return !!get().currentUser;
      },

addToCart: (product) => {
  const { currentUser, users, gusteUser } = get();
  const quantityToAdd = product.quantity || 1;

  if (currentUser) {
    const existingProduct = currentUser.cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = currentUser.cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      updatedCart = [...currentUser.cart, { ...product, quantity: quantityToAdd }];
    }

    const updatedUser = { ...currentUser, cart: updatedCart };
    const updatedUsers = users.map((u) => u.email === currentUser.email ? updatedUser : u);

    set({ currentUser: updatedUser, users: updatedUsers });
  } else {
    const existingProduct = gusteUser?.cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = gusteUser!.cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      updatedCart = [...(gusteUser?.cart || []), { ...product, quantity: quantityToAdd }];
    }

    set({
      gusteUser: {
        name: 'Guest',
        email: '',
        password: '',
        cart: updatedCart,
        wishlist: [],
        shippingDetails: [],
        orders: [],
      }
    });
  }
},

      removeFromCart: (id) => {
        const { currentUser, users, gusteUser } = get();

        if (currentUser) {
          const updatedCart = currentUser.cart.filter((item) => item.id !== id);
          const updatedUser = { ...currentUser, cart: updatedCart };
          const updatedUsers = users.map((u) => u.email === currentUser.email ? updatedUser : u);
          set({ currentUser: updatedUser, users: updatedUsers });
        } else if (gusteUser) {
          const updatedCart = gusteUser.cart.filter((item) => item.id !== id);
          set({ gusteUser: { ...gusteUser, cart: updatedCart } });
        }
      },


      clearCart: () => {
        const { currentUser, users, gusteUser } = get();

        if (currentUser) {
          const updatedUser = { ...currentUser, cart: [] };
          const updatedUsers = users.map((u) => u.email === currentUser.email ? updatedUser : u);
          set({ currentUser: updatedUser, users: updatedUsers });
        } else if (gusteUser) {
          set({ gusteUser: { ...gusteUser, cart: [] } });
        }
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

      quantity: (id) => {
        const { currentUser, gusteUser } = get();
        const user = currentUser || gusteUser;
        if (!user) return 0;

        const item = user.cart.find((item) => item.id === id);
        return item?.quantity || 0;
      },


      updateQuantity: (id, quantity) => {
      const { currentUser, users, gusteUser } = get();

      if (currentUser) {
        const updatedCart = currentUser.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        const updatedUser = { ...currentUser, cart: updatedCart };
        const updatedUsers = users.map((u) => u.email === currentUser.email ? updatedUser : u);
        set({ currentUser: updatedUser, users: updatedUsers });
      } else if (gusteUser) {
        const updatedCart = gusteUser.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ gusteUser: { ...gusteUser, cart: updatedCart } });
      }
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

      addOrder: (order: Order) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser = {
          ...currentUser,
          orders: [...(currentUser.orders || []), order],
        };

        const updatedUsers = users.map(u =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      deleteOrder: (id: string) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser = {
          ...currentUser,
          orders: currentUser.orders.filter((order) => order.id !== id),
        };

        const updatedUsers = users.map(u =>
          u.email === currentUser.email ? updatedUser : u
        );

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      clearOrders: () => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, orders: [] };

        const updatedUsers = users.map(u =>
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
    { name: "user-store" }
  )
);

