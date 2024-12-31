import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(
          (i) =>
            i.id === item.id && i.size === item.size && i.color === item.color,
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        const { items } = get();
        if (quantity === 0) {
          set({ items: items.filter((item) => item.id !== id) });
        } else {
          set({
            items: items.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce(
          (sum, item) =>
            sum + parseFloat(item.price.replace("$", "")) * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      version: 1,
    },
  ),
);
