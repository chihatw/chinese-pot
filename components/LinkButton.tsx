"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const LinkButton = ({
  href,
  children,
  variant = "default",
  disabled = false,
}: {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | undefined;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2"
      variant={variant}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
