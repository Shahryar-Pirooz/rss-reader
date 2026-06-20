import { create } from "zustand";
import { FeedStore } from "../types/store";

export const useFeedState = create<FeedStore>((set) => ({
  feeds: [],
  setFeeds: (feeds) => {
    set((state) => ({
      feeds: [...state.feeds, { ...feeds }],
    }));
  },
}));
