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