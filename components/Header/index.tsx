"use client";
import { useSession } from "next-auth/react";

import { ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import LinkButton from "../LinkButton";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";
import LogoutIcon from "./LogoutIcon";

const items: { url: string; label: string }[] = [
  { url: "/article/form", label: "New Article" },
  { url: "/article/list", label: "Article List" },
  { url: "/sentence/search", label: "Sentence Search" },
  { url: "/sentence/form", label: "Sentence Form" },
  { url: "/outline", label: "Outline" },
];

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="grid h-12 shadow duration-100">
      <div className="container flex w-full items-center justify-between gap-16">
        <HomeIcon />
        <div className="flex grow justify-between">
          {items.map((item, index) => (
            <LinkButton
              key={index}
              href={item.url}
              variant="ghost"
              disabled={pathname === item.url}
            >
              {item.label}
            </LinkButton>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          {session?.user && session?.user.admin && <ShieldCheck />}
          {session?.user ? <LogoutIcon /> : <LoginIcon />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
