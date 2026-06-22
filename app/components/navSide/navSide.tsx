"use client";

import { FaRss, FaPlus, FaInbox } from "react-icons/fa6";
import NavItem from "./navItem";
import { useSourceState } from "@/app/store/useFeedStore";
import { Source } from "@/app/types/rss";
import { useAppState } from "@/app/store/useAppStore";
import { useEffect } from "react";

export default function NavSide() {
  const isModalOpen = useAppState((state) => state.isAddFeedMenuOpen);
  const setIsModalOpen = useAppState((state) => state.changeAddFeedMenu);
  const sources = useSourceState((state) => state.sources);
  const setSources = useSourceState((state) => state.setSources);

  useEffect(() => {
    const storage = window.localStorage.getItem("sources");
    if (storage) {
      const parsed: Source[] = JSON.parse(storage) ?? sources;
      parsed.map((source) => setSources(source));
    }
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSave = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("title") as string;
    const url = formData.get("url") as string;
    const exist = sources.some((s) => s.url === url);
    if (name && url && !exist) {
      const newSource: Source = { name, url };
      const updatedSources = [...sources, newSource];
      setSources(newSource);
      window.localStorage.setItem("sources", JSON.stringify(updatedSources));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-full w-full flex flex-col p-2">
        <div className="header flex flex-row space-x-2 items-center select-none group">
          <FaRss className="text-accent group-hover:text-accent-hover" />
          <span className="font-bold text-sm text-text-primary group-hover:text-accent-hover">
            Reader
          </span>
        </div>
        <div className="header">
          <NavItem title="All Articles" />
        </div>
        <div className="h-full">
          {sources.map((source, index) => {
            return (
              <NavItem key={index} title={source.name} link={source.url} />
            );
          })}
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="h-fit flex flex-row text-sm text-text-tertiary justify-start items-center space-x-4 cursor-pointer hover:text-text-primary active:scale-95 select-none"
        >
          <FaPlus />
          <span>Add Feed</span>
        </div>
      </div>

      {isModalOpen && (
        <form onSubmit={handleSave}>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCancel}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg-secondary border border-border p-6 rounded-lg flex flex-col space-y-4 z-50">
            <h2 className="text-lg font-bold text-text-primary">Add Feed</h2>
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-text-primary mb-1"
              >
                Title:
              </label>
              <input
                name="title"
                defaultValue=""
                type="text"
                id="title"
                className="w-full px-3 py-2 bg-bg-primary border border-border rounded text-text-primary"
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="block text-sm text-text-primary mb-1"
              >
                URL:
              </label>
              <input
                name="url"
                defaultValue=""
                type="text"
                id="url"
                className="w-full px-3 py-2 bg-bg-primary border border-border rounded text-text-primary"
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm bg-bg-tertiary text-text-primary rounded hover:bg-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent-hover"
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
