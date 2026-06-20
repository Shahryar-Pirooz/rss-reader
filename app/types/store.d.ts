export interface AppStore {
  theme: "light" | "dark";
  isMenuOpen: boolean;
  changeTheme: () => void;
  changeMenu: (open: boolean) => void;
}

export interface FeedStore {
    feeds : {[key: string]: unknown}[]
    setFeeds : (data: {[key: string]: unknown}[])=>void
}