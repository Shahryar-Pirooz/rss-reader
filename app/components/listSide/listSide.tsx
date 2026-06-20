import { useAppState } from "@/app/store/useAppStore";
import { useEffect } from "react";

export default function ListSide() {
  const isMenuOpen = useAppState((state) => state.isMenuOpen);
  const setIsMenuOpen = useAppState((state) => state.changeMenu);

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
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="size-8 rounded shadow flex flex-col gap-2 justify-center items-center cursor-pointer"
          >
            <div
              className={`h-0.5 w-4 bg-accent transition-transform duration-300 ${isMenuOpen ? "-rotate-45" : "rotate-0"}`}
            ></div>
            <div
              className={`h-0.5 w-4 bg-accent  transition-transform duration-300 ${isMenuOpen ? "rotate-45" : "rotate-0"}`}
            ></div>
          </div>
        </div>
        <div>Items</div>
      </div>
    </>
  );
}
