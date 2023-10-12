"use client";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

const HomeIcon = () => {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        pathname === "/" ? `pointer-events-none` : `pointer-events-auto`,
      )}
    >
      <BookOpen className="text-gray-700" />
    </Link>
  );
};

export default HomeIcon;
