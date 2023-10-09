"use client";
import { resetFirebasePassword } from "@/features/auth/services/auth";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Mail, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ResetPasswordButton = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const { success } = z.string().email().safeParse(input);
    setIsValidEmail(success);
  }, [input]);

  const resetPassword = async () => {
    resetFirebasePassword(input);
    toast({
      description: (
        <div className="flex items-center gap-x-1">
          <SendHorizontal />
          <span>
            <span className={cn(fontZenMaruGothic.className, "font-[300]")}>
              已經發送一封電子郵件到
            </span>
            <span className="font-bold">{input}</span>
            <span className={cn(fontZenMaruGothic.className, "font-[300]")}>
              了
            </span>
          </span>
        </div>
      ),
    });
    setInput("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link href="#" className="text-main hover:underline">
          <span
            className={cn(
              fontZenMaruGothic.className,
              "text-xs font-[300] tracking-wider",
            )}
          >
            忘記密碼
          </span>
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-normal">
            輸入電郵地址以重設密碼
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative h-9">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              className="peer absolute"
            />

            <FormLabel
              className={`absolute ${
                input
                  ? "-top-5 left-1 text-xs"
                  : "left-3 top-1.5 text-base peer-hover:left-2 peer-hover:top-1"
              }  duration-300 peer-focus:-top-5 peer-focus:left-1 peer-focus:text-xs`}
            >
              <span className="flex items-center gap-x-1">
                <Mail size={14} />
                <span
                  className={cn(
                    fontZenMaruGothic.className,
                    "font-[300] tracking-wider",
                  )}
                >
                  電郵地址
                </span>
              </span>
            </FormLabel>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={resetPassword}
            className={cn(
              "relativ",
              isValidEmail
                ? "pointer-events-auto bg-main"
                : "pointer-events-none bg-gray-300",
            )}
          >
            <span
              className={cn(fontZenMaruGothic.className, "tracking-widest")}
            >
              重設密碼
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordButton;
