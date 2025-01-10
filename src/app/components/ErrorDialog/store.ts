import { create } from 'zustand';

interface ErrorDialogState {
  isOpen: boolean;
  filePath: string;
  errorCode: string | number;
  customMessage?: string;
  setOpen: (isOpen: boolean) => void;
  showError: (options: {
    filePath?: string;
    errorCode?: string | number;
    customMessage?: string;
  }) => void;
}

export const useErrorDialogStore = create<ErrorDialogState>((set) => ({
  isOpen: false,
  filePath: '',
  errorCode: '',
  customMessage: '',
  setOpen: (isOpen) => set({ isOpen }),
  showError: (options) => set({ isOpen: true, ...options }),
}));
