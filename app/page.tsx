"use client";

import ListSide from "./components/listSide/listSide";
import NavSide from "./components/navSide/navSide";
import Content from "./components/content/content";
import { useAppState } from "./store/useAppStore";

export default function Home() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
  const theme = useAppState((state) => state.theme);
  const setIsMenuOpen = useAppState((state) => state.changeMenu);

  return (
    <div
      data-theme={theme}
      className="mx-auto flex h-screen w-full max-w-7xl flex-row overflow-hidden bg-bg-primary text-text-primary shadow-lg"
    >
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex overflow-hidden border-r border-border bg-bg-primary md:static ${
          isMenuOpen ? "w-72" : "w-0"
        }`}
      >
        <NavSide />
      </div>
      <div className="w-full border-r border-border md:w-[38%] lg:w-[34%]">
        <ListSide />
      </div>
      <div className="hidden flex-1 md:block">
        <Content />
      </div>
    </div>
  );
}
