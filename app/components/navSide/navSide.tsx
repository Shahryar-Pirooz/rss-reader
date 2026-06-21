import { FaRss, FaPlus } from "react-icons/fa6";
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
        <div className="h-full">123</div>
        <div className="h-fit flex flex-row text-sm text-text-tertiary justify-start items-center space-x-4 cursor-pointer hover:text-text-primary active:scale-95 select-none">
          <FaPlus />
          <span>Add Feed</span>
        </div>
      </div>
    </>
  );
}
