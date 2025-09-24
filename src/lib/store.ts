import { create } from 'zustand';
import { Match, UserData, CartItem } from '@/types';

interface StoreState {
  selectedMatch: Match | null;
  userData: UserData | null;
  cart: CartItem[];
  setSelectedMatch: (match: Match | null) => void;
  setUserData: (data: UserData | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (packageId: string) => void;
  clearCart: () => void;
  isInCart: (packageId: string) => boolean;
}

export const useStore = create<StoreState>((set, get) => ({
  selectedMatch: null,
  userData: null,
  cart: [],
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  setUserData: (data) => set({ userData: data }),
  addToCart: (item) => set((state) => {
    let newCart = [...state.cart.filter(i => i.packageId !== item.packageId)];

    // If adding full package, clear all individual packages
    if (item.packageId === 'all-sports-package') {
      newCart = [item];
    }
    // If adding individual package and full package is in cart, remove full package
    else if (state.cart.some(i => i.packageId === 'all-sports-package')) {
      newCart = [item];
    }
    // Otherwise just add the item
    else {
      newCart = [...newCart, item];
    }

    return { cart: newCart };
  }),
  removeFromCart: (packageId) => set((state) => ({
    cart: state.cart.filter(item => item.packageId !== packageId)
  })),
  clearCart: () => set({ cart: [] }),
  isInCart: (packageId) => get().cart.some(item => item.packageId === packageId),
}));