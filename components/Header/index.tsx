"use client";
import { useSession } from "next-auth/react";

import AdminBadge from "./AdminBadge";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";
import LogoutIcon from "./LogoutIcon";

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className="grid h-12 shadow duration-100">
      <div className="container flex w-full items-center justify-between">
        <HomeIcon />
        <div className="flex items-center gap-x-2">
          {session?.user && session?.user.admin && <AdminBadge />}
          {session?.user ? <LogoutIcon /> : <LoginIcon />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
