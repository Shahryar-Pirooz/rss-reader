import { create } from "zustand";

interface AppStore {
  isDark: boolean;
  isMenuOpen: boolean;
  changeTheme: () => void;
  changeMenu: (open: boolean) => void;
}

export const useAppState = create<AppStore>((set) => ({
  isDark: false,
  isMenuOpen: false,
  changeTheme: () => {
    set((state) => ({
      isDark: !state.isDark,
    }));
  },
  changeMenu: (open) => {
    set(() => ({
      isMenuOpen: open,
    }));
  },
}));
