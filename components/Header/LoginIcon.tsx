"use client";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

const LoginIcon = () => {
  const pathname = usePathname();
  return (
    <Link
      href="/signin"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        pathname === "/signin" ? `pointer-events-none` : `pointer-events-auto`,
      )}
    >
      <User2 />
    </Link>
  );
};

export default LoginIcon;
