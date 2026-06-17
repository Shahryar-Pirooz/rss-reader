import ListSide from "./components/listSide/listSide";
import NavSide from "./components/navSide/navSide";
import Content from "./components/content/content";

export default function Home() {
  return (
    <div className="container mx-auto p-4 w-full h-screen flex flex-row">
      <div className="w-1/4 hidden md:block border-r border-border "><NavSide/></div>
      <div className="w-full md:w-1/4 border-r border-border "><ListSide/></div>
      <div className="w-1/2 hidden md:block "><Content/></div>
    </div>
  )
}
