import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";

export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  collection: string;
  image: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "addedAt">) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  moveToTop: (id: number) => void;
  sortItems: (by: "date" | "price" | "name") => void;
}

export const useWishlist = create<WishlistStore>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        if (!items.some((i) => i.id === item.id)) {
          set({ items: [...items, { ...item, addedAt: Date.now() }] });
          toast({
            title: "Added to Wishlist",
            description: `${item.name} has been added to your wishlist`,
          });
        }
      },
      removeItem: (id) => {
        const { items } = get();
        const item = items.find((i) => i.id === id);
        set({ items: items.filter((item) => item.id !== id) });
        if (item) {
          toast({
            title: "Removed from Wishlist",
            description: `${item.name} has been removed from your wishlist`,
          });
        }
      },
      isInWishlist: (id) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },
      clearWishlist: () => {
        set({ items: [] });
        toast({
          title: "Wishlist Cleared",
          description: "All items have been removed from your wishlist",
        });
      },
      moveToTop: (id) => {
        const { items } = get();
        const item = items.find((i) => i.id === id);
        if (item) {
          set({
            items: [
              { ...item, addedAt: Date.now() },
              ...items.filter((i) => i.id !== id),
            ],
          });
        }
      },
      sortItems: (by) => {
        const { items } = get();
        const sortedItems = [...items];
        switch (by) {
          case "date":
            sortedItems.sort((a, b) => b.addedAt - a.addedAt);
            break;
          case "price":
            sortedItems.sort(
              (a, b) =>
                parseFloat(b.price.replace("$", "")) -
                parseFloat(a.price.replace("$", "")),
            );
            break;
          case "name":
            sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
        set({ items: sortedItems });
      },
    }),
    {
      name: "wishlist-storage",
      version: 1,
    },
  ),
);
