"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const CopyToClipBoardButton = ({ text }: { text: string }) => {
  const { toast } = useToast();
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "copied!!", variant: "destructive" });
  };
  return <Button onClick={handleClick}>Copy to Clipboard</Button>;
};

export default CopyToClipBoardButton;
