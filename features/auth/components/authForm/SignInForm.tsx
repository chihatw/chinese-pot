"use client";

import TextField from "@/features/auth/components/authForm/TextField";
import { SignInSchema } from "@/features/auth/schema";
import { signInAppWithEmailAndPassword } from "@/features/auth/services/auth";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { KeyRound, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../../../../components/ui/form";

import GoogleSignInButton from "../GoogleSignInButton";
import ResetPasswordButton from "./ResetPasswordButton";
import SignInButton from "./SignInButton";

const SignInForm = () => {
  const [progress, setProgress] = useState(0);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema), // note zod 3.22.0 occor error
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    form.watch((value) => {
      // progress
      let progress = 0;
      const email = value.email;
      if (!!email) {
        progress++;

        const result = z.string().email().safeParse(email);
        result.success && progress++;
      }
      const password = value.password;
      if (!!password) {
        progress++;

        const result = z.string().min(6).safeParse(password);
        result.success && progress++;
      }

      setProgress(progress);

      // reset root error
      form.setError("root", { message: undefined });
    });
  }, [form.watch, form]);

  const onSubmit = async (data: SignInSchema) => {
    const result = await signInAppWithEmailAndPassword(
      data.email,
      data.password,
    );

    if (result?.error) {
      const { prop, message } = result.error;
      form.setError(prop, { message });
    }
  };

  return (
    <div className="relative px-10 pb-10 pt-11">
      <div className=" absolute -top-8 left-4 grid aspect-square h-16 place-content-center rounded-full bg-zinc-100">
        <User2 size={42} />
      </div>
      <div className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-10 pb-10">
              <TextField
                control={form.control}
                name="email"
                label={
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
                }
                value={form.watch("email")}
                type="email"
              />
              <TextField
                control={form.control}
                name="password"
                label={
                  <span className="flex items-center gap-x-1">
                    <KeyRound size={14} />
                    <span
                      className={cn(
                        fontZenMaruGothic.className,
                        "font-[300] tracking-wider",
                      )}
                    >
                      密碼
                    </span>
                  </span>
                }
                value={form.watch("password")}
                type="password"
              />
            </div>
            <div className="absolute -right-0 top-[110px]">
              <ResetPasswordButton />
            </div>
            <div className="relative">
              <SignInButton form={form} progress={progress}>
                <span
                  className={cn(fontZenMaruGothic.className, "tracking-widest")}
                >
                  登入
                </span>
              </SignInButton>
              {form.formState.errors.root?.message ? (
                <div className="absolute text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.root?.message}
                </div>
              ) : null}
            </div>
          </form>
          <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-x-2">
            <Separator className="border" />
            <div>or</div>
            <Separator className="border" />
          </div>
          <GoogleSignInButton>
            <span className={cn(fontZenMaruGothic.className, "tracking-wider")}>
              使用Google帳戶登入
            </span>
          </GoogleSignInButton>
          <p
            className={cn(
              "mt-2 text-center text-sm font-[300] text-gray-600",
              fontZenMaruGothic.className,
            )}
          >
            若未持有帳號，請
            <Link href="/signup" className="text-main hover:underline">
              建立帳號
            </Link>
            .
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
