"use client";

import { signOut } from "@/features/auth/services/auth";
import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
const LogoutIcon = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <DoorOpen />
    </Button>
  );
};

export default LogoutIcon;
