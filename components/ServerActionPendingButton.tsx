"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// note useFormStatus は form の子要素の中で使う。form と同じ要素内では pending が false のまま

const ServerActionPendingButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending}>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">{label}</span>
        {pending ? <Loader2 className="animate-spin" /> : null}
      </div>
    </Button>
  );
};

export default ServerActionPendingButton;
