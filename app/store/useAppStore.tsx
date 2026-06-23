import { create } from "zustand";
import { AppStore } from "../types/store";

export const useAppState = create<AppStore>((set) => ({
  theme: "light",
  isMenuOpen: false,
  isAddFeedMenuOpen: false,
  selectedSourceUrl: null,
  selectedItem: null,
  title: "All Articles",
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
  selectSource: (url, title) => {
    set(() => ({
      selectedSourceUrl: url,
      selectedItem: null,
      title,
    }));
  },
  selectItem: (item) => {
    set(() => ({
      selectedItem: item,
    }));
  },
}));
