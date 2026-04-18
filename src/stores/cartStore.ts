import { create } from "zustand";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  wishlist: [],

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.find((p) => p.id === product.id);
      return {
        wishlist: exists ? state.wishlist.filter((p) => p.id !== product.id) : [...state.wishlist, product],
      };
    });
  },

  isInWishlist: (productId) => get().wishlist.some((p) => p.id === productId),

  getTotal: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
