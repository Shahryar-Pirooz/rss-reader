import { create } from "zustand";
import { AppStore } from "../types/store";

export const useAppState = create<AppStore>((set) => ({
  theme: "light",
  isMenuOpen: false,
  isAddFeedMenuOpen: false,
  title: "All Feeds",
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
  changeAddFeedMenu: (open) => {
    set(() => ({
      isAddFeedMenuOpen: open,
    }));
  },
  changeTitle: (title) => {
    set(() => ({
      title: title,
    }));
  },
}));
