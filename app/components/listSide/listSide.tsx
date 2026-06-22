import { useAppState } from "@/app/store/useAppStore";
import { useEffect } from "react";
import { FaSun, FaAngleLeft } from "react-icons/fa6";
import ListItem from "./listItem";

export default function ListSide() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
  const setIsMenuOpen = useAppState((state) => state.changeMenu);
  const setTheme = useAppState((state) => state.changeTheme);
  const title = useAppState((state) => state.title);

  useEffect(() => {
    const width = window.innerWidth;

    if (width >= 768) {
      setIsMenuOpen(true); // tablet/desktop
    } else {
      setIsMenuOpen(false); // mobile
    }
  }, []);

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
          <ListItem />
        </div>
      </div>
    </>
  );
}
