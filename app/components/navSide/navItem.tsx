import Image from "next/image";
import { FaInbox } from "react-icons/fa6";

interface NavItemProps {
  title: string;
  link?: string;
  active?: boolean;
  onClick: () => void;
}

export default function NavItem({ title, link, active, onClick }: NavItemProps) {
  const isAllArticles = title === "All Articles";
  let origin = "";
  if (link) {
    try {
      const domain = new URL(link);
      origin = domain.host;
    } catch {
      origin = "";
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-fit w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded px-2 py-2 text-left hover:text-accent ${
        active ? "bg-accent-subtle text-accent" : ""
      }`}
    >
      {(isAllArticles && <FaInbox />) || (
        <Image
          src={`https://icons.duckduckgo.com/ip3/${origin || "example.com"}.ico`}
          alt="link"
          height={20}
          width={20}
          className="rounded-full"
        />
      )}
      <span className="ml-2 truncate">{title}</span>
    </button>
  );
}
