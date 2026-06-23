import { RssFeed, RssFeedItem, Source } from "./rss";

export interface AppStore {
  theme: "light" | "dark";
  isMenuOpen: boolean;
  isAddFeedMenuOpen: boolean;
  selectedSourceUrl: string | null;
  selectedItem: RssFeedItem | null;
  title: string;
  changeTheme: () => void;
  changeMenu: (open: boolean) => void;
  changeAddFeedMenu: (open: boolean) => void;
  changeTitle: (title: string) => void;
  selectSource: (url: string | null, title: string) => void;
  selectItem: (item: RssFeedItem | null) => void;
}

export interface FeedStore {
  feeds: RssFeed[];
  isLoading: boolean;
  error: string | null;
  setFeeds: (feeds: RssFeed[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface SourceStore {
  sources: Source[];
  setSources: (sources: Source[]) => void;
  addSource: (source: Source) => void;
  removeSource: (url: string) => void;
}
