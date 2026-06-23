import { RssFeedItem } from "@/app/types/rss";

type ListItemProps = {
  item: RssFeedItem;
  feedTitle?: string;
  isSelected: boolean;
  onSelect: (item: RssFeedItem) => void;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function ListItem({
  item,
  feedTitle,
  isSelected,
  onSelect,
}: ListItemProps) {
  const date = formatDate(item.isoDate ?? item.pubDate);
  const excerpt = item.contentSnippet ?? item.description ?? "";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full border-b border-border-subtle p-4 text-left hover:bg-bg-secondary ${
        isSelected ? "bg-accent-subtle" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary">
          {item.title ?? "Untitled article"}
        </h3>
        {date && (
          <time className="shrink-0 text-xs text-text-tertiary">{date}</time>
        )}
      </div>
      {feedTitle && (
        <p className="mt-1 text-xs font-medium text-accent">{feedTitle}</p>
      )}
      {excerpt && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-text-secondary">
          {excerpt}
        </p>
      )}
    </button>
  );
}
