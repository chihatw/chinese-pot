"use client";
import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import LinkButton from "../LinkButton";
import AdminBadge from "./AdminBadge";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";
import LogoutIcon from "./LogoutIcon";

const items: { url: string; label: string }[] = [
  { url: "/article/list", label: "Article List" },
  { url: "/sentence/recent", label: "Recent Sentences" },
  { url: "/sentence/form", label: "Sentence Form" },
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
          {session?.user && session?.user.admin && <AdminBadge />}
          {session?.user ? <LogoutIcon /> : <LoginIcon />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
