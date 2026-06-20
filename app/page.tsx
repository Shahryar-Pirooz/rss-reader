"use client";

import ListSide from "./components/listSide/listSide";
import NavSide from "./components/navSide/navSide";
import Content from "./components/content/content";
import { useAppState } from "./store/useAppStore";

export default function Home() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);

  return (
    <div className="container mx-auto p-4 w-full h-screen flex flex-row">
      <div
        className={`flex flex-row border-r border-border transition-all ${isMenuOpen ? "w-full md:w-2/10" : "w-0"} overflow-hidden`}
      >
        <NavSide />
      </div>
      <div className="w-full md:w-3/10 border-r border-border ">
        <ListSide />
      </div>
      <div className="w-1/2 hidden md:block ">
        <Content />
      </div>
    </div>
  );
}
