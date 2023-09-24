"use client";
import { fontZenMaruGothic } from "@/lib/fonts";
import { ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AdminBadge = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ShieldCheck />
        </TooltipTrigger>
        <TooltipContent className="bg-black/40">
          <p className={`${fontZenMaruGothic.className}`}>管理者徽章</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AdminBadge;
