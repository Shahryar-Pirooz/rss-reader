import { create } from "zustand";

interface AppStore {
  theme: "light" | "dark";
  isMenuOpen: boolean;
  changeTheme: () => void;
  changeMenu: (open: boolean) => void;
}

export const useAppState = create<AppStore>((set) => ({
  theme: "light",
  isMenuOpen: false,
  changeTheme: () => {
    set((state) => ({
      theme: state.theme == "light" ? "dark" : "light",
    }));
  },
  changeMenu: (open) => {
    set(() => ({
      isMenuOpen: open,
    }));
  },
}));
