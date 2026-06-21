import { create } from "zustand";
import { FeedStore, SourceStore } from "../types/store";

export const useSourceState = create<SourceStore>((set) => ({
  sources: [],
  setSources: (sources) => {
    set((state) => ({
      sources: [...state.sources, ...sources],
    }));
  },
}));

export const useFeedState = create<FeedStore>((set) => ({
  feeds: [],
  setFeeds: (feeds) => {
    set((state) => ({
      feeds: [...state.feeds, { ...feeds }],
    }));
  },
}));
