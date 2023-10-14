"use client";
import { Button } from "@/components/ui/button";
import { SignInSchema } from "@/features/auth/schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

const SignInButton = ({
  progress,
  form,
  children,
}: {
  progress: number;
  form: UseFormReturn<SignInSchema, any, undefined>;
  children: ReactNode;
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        "relative z-[1] w-full overflow-hidden bg-gray-300",
        "before:absolute before:inset-0 before:-z-[1] before:inline-block  before:bg-main before:duration-700",
        (() => {
          switch (progress) {
            case 1:
              return "before:-translate-x-3/4";
            case 2:
              return "before:-translate-x-1/2";
            case 3:
              return "before:-translate-x-1/4";
            case 4:
              return "before:-translate-x-0";
            case 0:
            default:
              return "before:-translate-x-full";
          }
        })(),
        !form.formState.isValid ||
          form.formState.isSubmitting ||
          form.formState.isSubmitSuccessful
          ? "pointer-events-none"
          : "pointer-events-auto",
      )}
    >
      {children}

      {form.formState.isSubmitting && (
        <Loader2 className="ml-2 animate-spin" size={16} />
      )}
    </Button>
  );
};

export default SignInButton;
