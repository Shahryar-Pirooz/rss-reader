import { create } from "zustand";
import { AppStore } from "../types/store";

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
