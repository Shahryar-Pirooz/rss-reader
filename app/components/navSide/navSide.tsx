"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaPlus, FaRss, FaTrash } from "react-icons/fa6";
import { useAppState } from "@/app/store/useAppStore";
import { useFeedState, useSourceState } from "@/app/store/useFeedStore";
import { FeedSuccess, Source } from "@/app/types/rss";
import NavItem from "./navItem";

const STORAGE_KEY = "sources";

const fetchFeeds = async (sources: Source[]) => {
  if (sources.length === 0) {
    return { data: { feeds: [], errors: [] } };
  }

  const response = await fetch("/api/rss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: sources.map((source) => source.url) }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to fetch feeds");
  }

  return response.json();
};

const normalizeUrl = (url: string) => {
  const parsed = new URL(url.trim());
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Feed URL must start with http:// or https://");
  }

  return parsed.toString();
};

export default function NavSide() {
  const isModalOpen = useAppState((state) => state.isAddFeedMenuOpen);
  const selectedSourceUrl = useAppState((state) => state.selectedSourceUrl);
  const setIsModalOpen = useAppState((state) => state.changeAddFeedMenu);
  const selectSource = useAppState((state) => state.selectSource);
  const sources = useSourceState((state) => state.sources);
  const setSources = useSourceState((state) => state.setSources);
  const addSource = useSourceState((state) => state.addSource);
  const removeSource = useSourceState((state) => state.removeSource);
  const setFeeds = useFeedState((state) => state.setFeeds);
  const setLoading = useFeedState((state) => state.setLoading);
  const setError = useFeedState((state) => state.setError);
  const [formError, setFormError] = useState<string | null>(null);
  const hasLoadedStorage = useRef(false);

  useEffect(() => {
    const storage = window.localStorage.getItem(STORAGE_KEY);
    if (storage) {
      try {
        const parsed = JSON.parse(storage);
        if (Array.isArray(parsed)) {
          setSources(
            parsed.filter(
              (source): source is Source =>
                typeof source?.name === "string" &&
                typeof source?.url === "string",
            ),
          );
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    hasLoadedStorage.current = true;
  }, [setSources]);

  useEffect(() => {
    if (!hasLoadedStorage.current) {
      return;
    }

    let isCurrent = true;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchFeeds(sources);
        if (!isCurrent) {
          return;
        }

        const feeds = data.data.feeds.map((item: FeedSuccess) => ({
          ...item.feed,
          feedUrl: item.url,
        }));

        setFeeds(feeds);

        if (data.data.errors.length > 0) {
          setError(
            `${data.data.errors.length} feed${
              data.data.errors.length === 1 ? "" : "s"
            } could not be loaded.`,
          );
        }
      } catch (error) {
        if (isCurrent) {
          setFeeds([]);
          setError(error instanceof Error ? error.message : "Failed to fetch feeds");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [setError, setFeeds, setLoading, sources]);

  const handleCancel = () => {
    setFormError(null);
    setIsModalOpen(false);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("title") ?? "").trim();
    const urlValue = String(formData.get("url") ?? "").trim();

    if (!name) {
      setFormError("Feed title is required.");
      return;
    }

    let url: string;
    try {
      url = normalizeUrl(urlValue);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Enter a valid URL.");
      return;
    }

    if (sources.some((source) => source.url === url)) {
      setFormError("This feed is already in your sidebar.");
      return;
    }

    const nextSources = [...sources, { name, url }];
    addSource({ name, url });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSources));
    selectSource(url, name);
    setFormError(null);
    setIsModalOpen(false);
    event.currentTarget.reset();
  };

  const handleRemove = (source: Source) => {
    const nextSources = sources.filter((item) => item.url !== source.url);
    removeSource(source.url);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSources));
    if (selectedSourceUrl === source.url) {
      selectSource(null, "All Articles");
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col p-2">
        <div className="header flex-row space-x-2 select-none group">
          <FaRss className="text-accent group-hover:text-accent-hover" />
          <span className="text-sm font-bold text-text-primary group-hover:text-accent-hover">
            Reader
          </span>
        </div>

        <div className="py-2">
          <NavItem
            title="All Articles"
            active={selectedSourceUrl === null}
            onClick={() => selectSource(null, "All Articles")}
          />
        </div>

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
          {sources.map((source) => (
            <div key={source.url} className="group flex items-center gap-1">
              <NavItem
                title={source.name}
                link={source.url}
                active={selectedSourceUrl === source.url}
                onClick={() => selectSource(source.url, source.name)}
              />
              <button
                type="button"
                aria-label={`Remove ${source.name}`}
                onClick={() => handleRemove(source)}
                className="rounded p-2 text-text-tertiary opacity-0 hover:bg-bg-secondary hover:text-error group-hover:opacity-100"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex h-fit flex-row items-center justify-start space-x-4 rounded p-3 text-sm text-text-tertiary hover:text-text-primary active:scale-95"
        >
          <FaPlus />
          <span>Add Feed</span>
        </button>
      </div>

      {isModalOpen && (
        <form onSubmit={handleSave}>
          <button
            type="button"
            aria-label="Close add feed dialog"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={handleCancel}
          />
          <div className="fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col space-y-4 rounded-lg border border-border bg-bg-secondary p-6 shadow-lg">
            <h2 className="text-lg font-bold text-text-primary">Add Feed</h2>
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm text-text-primary"
              >
                Title
              </label>
              <input
                name="title"
                type="text"
                id="title"
                autoFocus
                className="w-full rounded border border-border bg-bg-primary px-3 py-2 text-text-primary"
              />
            </div>
            <div>
              <label htmlFor="url" className="mb-1 block text-sm text-text-primary">
                RSS URL
              </label>
              <input
                name="url"
                type="url"
                id="url"
                placeholder="https://example.com/feed.xml"
                className="w-full rounded border border-border bg-bg-primary px-3 py-2 text-text-primary"
              />
            </div>
            {formError && <p className="text-sm text-error">{formError}</p>}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded bg-bg-tertiary px-4 py-2 text-sm text-text-primary hover:bg-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
