"use client";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const LoginIcon = () => {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              pathname === "/signin"
                ? `pointer-events-none`
                : `pointer-events-auto`,
            )}
          >
            <User2 />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-black/40">
          <p className={fontZenMaruGothic.className}>登入畫面</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LoginIcon;
