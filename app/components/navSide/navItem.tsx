import Image from "next/image";
import { FaInbox } from "react-icons/fa6";

interface NavItemProps {
  title: string;
  link?: string;
}

export default function NavItem({ title, link }: NavItemProps) {
  const isAllArticles = title === "All Articles";
  let origin;
  if (link) {
    const domain = new URL(link);
    origin = domain.host;
  }
  return (
    <a className="no-underline w-full justify-start" href={link}>
      <div className="flex flex-row w-full h-fit py-2 justify-start items-center space-x-2 cursor-pointer hover:text-accent">
        {(isAllArticles && <FaInbox />) || (
          <Image
            src={`https://icons.duckduckgo.com/ip3/${origin}.ico`}
            alt="link"
            height={20}
            width={20}
            className="rounded-full"
          />
        )}
        <span className="ml-2">{title}</span>
      </div>
    </a>
  );
}
