import { useAppState } from "@/app/store/useAppStore";
import { useEffect, useMemo } from "react";
import { FaAngleLeft, FaMoon, FaSun } from "react-icons/fa6";
import ListItem from "./listItem";
import { useFeedState } from "@/app/store/useFeedStore";
import { RssFeedItem } from "@/app/types/rss";

export default function ListSide() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
  const title = useAppState((state) => state.title);
  const selectedSourceUrl = useAppState((state) => state.selectedSourceUrl);
  const selectedItem = useAppState((state) => state.selectedItem);
  const theme = useAppState((state) => state.theme);
  const feeds = useFeedState((state) => state.feeds);
  const isLoading = useFeedState((state) => state.isLoading);
  const error = useFeedState((state) => state.error);

  const setIsMenuOpen = useAppState((state) => state.changeMenu);
  const setTheme = useAppState((state) => state.changeTheme);
  const selectItem = useAppState((state) => state.selectItem);

  const articles = useMemo(() => {
    return feeds
      .filter((feed) => !selectedSourceUrl || feed.feedUrl === selectedSourceUrl)
      .flatMap((feed) =>
        feed.items.map((item) => ({
          item: item as RssFeedItem,
          feedTitle: feed.title,
        })),
      )
      .sort((first, second) => {
        const firstDate = new Date(
          first.item.isoDate ?? first.item.pubDate ?? "",
        ).getTime();
        const secondDate = new Date(
          second.item.isoDate ?? second.item.pubDate ?? "",
        ).getTime();

        return (Number.isNaN(secondDate) ? 0 : secondDate) -
          (Number.isNaN(firstDate) ? 0 : firstDate);
      });
  }, [feeds, selectedSourceUrl]);

  useEffect(() => {
    const width = window.innerWidth;

    if (width >= 768) {
      setIsMenuOpen(true); // tablet/desktop
    } else {
      setIsMenuOpen(false); // mobile
    }
  }, [setIsMenuOpen]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="header gap-3">
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded p-2 hover:bg-bg-secondary"
        >
          <FaAngleLeft className={`${isMenuOpen ? "" : "rotate-180"}`} />
        </button>
        <span className="w-full text-center text-sm font-bold text-text-primary">
          {title}
        </span>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme()}
          className="rounded p-2 hover:bg-bg-secondary"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {error && (
        <div className="border-b border-border bg-bg-secondary px-4 py-3 text-xs text-error">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading && (
          <div className="p-4 text-sm text-text-secondary">Loading feeds…</div>
        )}

        {!isLoading && articles.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold text-text-primary">
              No articles yet
            </p>
            <p className="mt-2 text-xs leading-5 text-text-secondary">
              Add an RSS feed from the sidebar to start reading.
            </p>
          </div>
        )}

        {articles.map(({ item, feedTitle }) => (
          <ListItem
            key={item.guid ?? item.link ?? `${feedTitle}-${item.title}`}
            item={item}
            feedTitle={feedTitle}
            isSelected={selectedItem === item}
            onSelect={selectItem}
          />
        ))}
      </div>
    </div>
  );
}
