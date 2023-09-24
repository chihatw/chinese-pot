"use client";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const HomeIcon = () => {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              pathname === "/" ? `pointer-events-none` : `pointer-events-auto`,
            )}
          >
            <BookOpen className="text-gray-700" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-black/40">
          <p className={fontZenMaruGothic.className}>返回首頁</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HomeIcon;
