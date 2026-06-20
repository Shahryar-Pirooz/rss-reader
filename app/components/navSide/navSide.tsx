import { FaRss } from "react-icons/fa6";
import NavItem from "./navItem";

export default function NavSide() {
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
          <NavItem />
        </div>
      </div>
    </>
  );
}
