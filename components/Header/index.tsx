"use client";
import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import LinkButton from "../LinkButton";
import AdminBadge from "./AdminBadge";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";
import LogoutIcon from "./LogoutIcon";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="grid h-12 shadow duration-100">
      <div className="container flex w-full items-center justify-between gap-16">
        <HomeIcon />
        <div className="flex grow gap-8">
          <LinkButton
            href="/sentence/list"
            variant="ghost"
            disabled={pathname === "/sentence/list"}
          >
            Sentence List
          </LinkButton>
          <LinkButton
            href="/sentence/form"
            variant="ghost"
            disabled={pathname === "/sentence/form"}
          >
            Sentence Form
          </LinkButton>
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
