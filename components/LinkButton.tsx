"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsLoading(true);
    router.push(href);
  };
  return (
    <Button onClick={handleClick} className="flex items-center gap-2">
      {children}
      {isLoading ? <Loader2 className="animate-spin" /> : null}
    </Button>
  );
};

export default LinkButton;
