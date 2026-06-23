import { create } from "zustand";
import { FeedStore, SourceStore } from "../types/store";
import { Source } from "../types/rss";

export const useSourceState = create<SourceStore>((set) => ({
  sources: [],
  setSources: (sources: Source[]) => {
    set(() => ({
      sources,
    }));
  },
  addSource: (source: Source) => {
    set((state) => ({
      sources: state.sources.some((item) => item.url === source.url)
        ? state.sources
        : [...state.sources, source],
    }));
  },
  removeSource: (url: string) => {
    set((state) => ({
      sources: state.sources.filter((source) => source.url !== url),
    }));
  },
}));

export const useFeedState = create<FeedStore>((set) => ({
  feeds: [],
  isLoading: false,
  error: null,
  setFeeds: (feeds) => {
    set(() => ({
      feeds,
    }));
  },
  setLoading: (loading) => {
    set(() => ({
      isLoading: loading,
    }));
  },
  setError: (error) => {
    set(() => ({
      error,
    }));
  },
}));
