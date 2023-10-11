import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
const ServerActionPendingIconButton = ({
  children,
  variant,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
  variant?:
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "link";
}) => {
  // note useFormStatus は form の子要素の中で使う。form と同じ要素内では pending が false のまま
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      variant={variant}
      size="icon"
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default ServerActionPendingIconButton;
