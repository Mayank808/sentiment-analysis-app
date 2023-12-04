import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", name: "Home" },
  { href: "/scribe", name: "Journals" },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">ScribeMe</span>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-70px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
