import { create } from 'zustand';
import { Match, UserData } from '@/types';

interface StoreState {
  selectedMatch: Match | null;
  userData: UserData | null;
  setSelectedMatch: (match: Match | null) => void;
  setUserData: (data: UserData | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedMatch: null,
  userData: null,
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  setUserData: (data) => set({ userData: data }),
}));