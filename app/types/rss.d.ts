import type { Item, Output } from "rss-parser";

export type Source = {
  name: string;
  url: string;
};

export type RssReq = {
  urls: string[];
};

export type FeedSuccess = {
  url: string;
  feed: RssFeed;
};

export type FeedError = {
  url: string;
  error: string;
};

export type RssFeedItem = Item & {
  author?: string;
  description?: string;
  "dc:creator"?: string;
};

export type RssFeed = Output<Record<string, unknown>>;
