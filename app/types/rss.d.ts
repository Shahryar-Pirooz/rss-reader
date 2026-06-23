export type Source = {
  name: string,
  url: string
}

export type RssReq = {
  urls: string[];
}

export type FeedSuccess = {
  url: string
  feed: Output<unknown>
}

export type FeedError = {
  url: string
  error: string
}


export type RssFeedItem = {
  title?: string;
  link?: string;

  pubDate?: string;
  isoDate?: string;

  creator?: string;
  author?: string;
  "dc:creator"?: string;

  content?: string;
  contentSnippet?: string;
  description?: string;

  guid?: string;
  categories?: string[];

  enclosure?: {
    url?: string;
    type?: string;
    length?: string | number;
    [key: string]: unknown;
  };

  [key: string]: unknown;
};


export type RssFeedImage = {
  url?: string;
  title?: string;
  link?: string;
  width?: string | number;
  height?: string | number;

  [key: string]: unknown;
};


export type RssFeed = {
  title?: string;
  link?: string;
  description?: string;

  language?: string;
  copyright?: string;
  generator?: string;

  lastBuildDate?: string;
  pubDate?: string;
  updated?: string;

  image?: RssFeedImage;

  paginationLinks?: {
    self?: string;
    next?: string;
    previous?: string;
    [key: string]: string | undefined;
  };

  items: RssFeedItem[];
};

