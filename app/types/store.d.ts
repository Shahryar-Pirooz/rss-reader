import { Data } from "./localStorage";
import { RSSFeed, Source } from "./rss";

export interface AppStore {
  theme: "light" | "dark";
  isMenuOpen: boolean;
  isAddFeedMenuOpen: boolean;
  title:string,
  changeTheme: () => void;
  changeMenu: (open: boolean) => void;
  changeAddFeedMenu:(open:boolean) =>  void;
  changeTitle:(title:string) => void;
}

export interface FeedStore {
    feeds : RSSFeed[]
    setFeeds : (data: {[key: string]: unknown}[])=>void
}

export interface SourceStore {
    sources : Source[]
    setSources : (data: Source)=>void
}