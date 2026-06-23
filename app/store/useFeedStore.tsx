import { create } from "zustand";
import { FeedStore, SourceStore } from "../types/store";
import { Source } from "../types/rss";

export const useSourceState = create<SourceStore>((set) => ({
  sources: [],
  setSources: (source: Source) => {
    set((state) => ({
      sources: [...state.sources, source],
    }));
  },
}));

export const useFeedState = create<FeedStore>((set) => ({
  feeds: [],
  setFeeds: (feeds) => {
    set((state) => ({
      feeds: [...state.feeds, ...feeds],
    }));
  },
}));
