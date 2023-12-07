import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", name: "Home" },
  { href: "/scribe", name: "Journals" },
  { href: "/history", name: "History" },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-background">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-highlight">
        <div className="p-4 border-b border-highlight">
          <span className="text-3xl text-white font-extrabold">ScribeMe</span>
        </div>
        <ul className="mt-10 px-10 space-y-3">
          {links.map((link) => (
            <li
              key={link.href}
              className="py-2 text-xl font-bold text-white bg-highlight text-center rounded-lg "
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[69px] border-b border-highlight">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-69px)] pb-4 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
