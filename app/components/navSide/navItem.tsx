interface NavItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

export default function NavItem({ title, icon, link }: NavItemProps) {
  return (
    <a className="no-underline w-full justify-start" href={link}>
      <div className="flex flex-row w-full h-fit py-2 justify-start items-center space-x-2 cursor-pointer hover:text-accent">
        {icon}
        <span className="ml-2">{title}</span>
      </div>
    </a>
  );
}
