import { useMemo } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useAppState } from "@/app/store/useAppStore";

const formatDate = (value?: string) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function Content() {
  const selectedItem = useAppState((state) => state.selectedItem);

  const articleHtml = useMemo(() => {
    return selectedItem?.content ?? selectedItem?.description ?? "";
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-semibold text-text-primary">
          Select an article to read
        </p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
          Choose a story from the list to preview it here, or open it in the
          original site.
        </p>
      </div>
    );
  }

  return (
    <article className="h-full w-full overflow-y-auto p-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-2xl font-bold leading-tight text-text-primary">
          {selectedItem.title ?? "Untitled article"}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
          {formatDate(selectedItem.isoDate ?? selectedItem.pubDate) && (
            <time>{formatDate(selectedItem.isoDate ?? selectedItem.pubDate)}</time>
          )}
          {(selectedItem.creator ||
            selectedItem.author ||
            selectedItem["dc:creator"]) && (
            <span>
              By{" "}
              {selectedItem.creator ??
                selectedItem.author ??
                selectedItem["dc:creator"]}
            </span>
          )}
        </div>
        {selectedItem.link && (
          <a
            href={selectedItem.link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Open original
            <FaArrowUpRightFromSquare size={12} />
          </a>
        )}
      </header>

      {articleHtml ? (
        <div
          className="prose prose-sm mt-6 max-w-none text-text-primary prose-a:text-accent prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: articleHtml }}
        />
      ) : (
        <p className="mt-6 text-sm leading-6 text-text-secondary">
          This feed item does not include preview content. Open the original
          article to read it.
        </p>
      )}
    </article>
  );
}
