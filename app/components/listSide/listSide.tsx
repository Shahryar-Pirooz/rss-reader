import { useAppState } from "@/app/store/useAppStore";
import { useEffect } from "react";
import { FaSun, FaAngleLeft } from "react-icons/fa6";
import ListItem from "./listItem";
import { useFeedState } from "@/app/store/useFeedStore";

export default function ListSide() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
  const title = useAppState((state) => state.title);
  // const sources = useSourceState((state) => state.sources);
  const feeds = useFeedState((state) => state.feeds);

  const setIsMenuOpen = useAppState((state) => state.changeMenu);
  const setTheme = useAppState((state) => state.changeTheme);

  useEffect(() => {
    const width = window.innerWidth;

    if (width >= 768) {
      setIsMenuOpen(true); // tablet/desktop
    } else {
      setIsMenuOpen(false); // mobile
    }
  }, []);

  useEffect(() => {
    console.log("feeds", feeds);
  }, [feeds]);

  return (
    <>
      <div className="h-full w-full flex flex-col p-2">
        <div className="header">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaAngleLeft className={`${isMenuOpen ? "" : "rotate-180"}`} />
          </div>
          <div onClick={() => setTheme()}>
            <FaSun />
          </div>
          <span className="w-full text-center font-bold text-sm text-text-primary">
            {title}
          </span>
        </div>
        <div>
          {feeds.map((feed) => (
            <ListItem key={feed.url} feed={feed} />
          ))}
        </div>
      </div>
    </>
  );
}
