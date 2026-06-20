import { useAppState } from "@/app/store/useAppStore";
import { useEffect } from "react";
import { FaSun, FaAngleLeft } from "react-icons/fa6";

export default function ListSide() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
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
        </div>
        <div>Items</div>
      </div>
    </>
  );
}
