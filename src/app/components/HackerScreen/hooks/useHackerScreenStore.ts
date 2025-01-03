import { create } from 'zustand';

type HackerScreenState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useHackerScreenStore = create<HackerScreenState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));