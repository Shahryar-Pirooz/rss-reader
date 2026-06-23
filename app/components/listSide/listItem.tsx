import { RssFeed, RssFeedItem } from "@/app/types/rss";

export default function ListItem({ feed }: { feed: RssFeed }) {
  console.log("feed", feed);
  return (
    <>
      <div>{feed.title}</div>
    </>
  );
}
//TODO: fix this card
