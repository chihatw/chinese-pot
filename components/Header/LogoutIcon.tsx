"use client";

import { signOut } from "@/features/auth/services/auth";
import { fontZenMaruGothic } from "@/lib/fonts";
import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
const LogoutIcon = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleClick}>
            <DoorOpen />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black/40">
          <p className={`${fontZenMaruGothic.className}`}>登出</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogoutIcon;
