import { Data } from "./localStorage";
import { Source } from "./rss";

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
    feeds : {[key: string]: unknown}[]
    setFeeds : (data: {[key: string]: unknown}[])=>void
}

export interface SourceStore {
    sources : Source[]
    setSources : (data: Source)=>void
}