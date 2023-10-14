"use client";

import TextField from "@/features/auth/components/TextField";
import { SignUpSchema } from "@/features/auth/schema";
import { signUpFirebaseWithEmailAndPassword } from "@/features/auth/services/auth";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import SignUpButton from "./SignUpButton";

const SignUpForm = () => {
  const [progress, setProgress] = useState(0);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema), // note zod 3.22.0 occor error
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpSchema) => {
    const result = await signUpFirebaseWithEmailAndPassword(
      data.email,
      data.password,
    );
    if (result?.error) {
      const { prop, message } = result.error;
      form.setError(prop, { message });
    }
  };

  useEffect(() => {
    form.watch((value) => {
      // progress
      let progress = 0;
      const email = value.email;

      if (!!email) {
        progress++;

        const result = z.string().email().safeParse(email);
        if (result.success) {
          progress++;
        }
      }
      const password = value.password;
      if (!!password) {
        progress++;

        const result = z.string().min(6).safeParse(password);
        if (result.success) {
          progress++;
        }
      }

      const confirmPassword = value.confirmPassword;

      if (!!confirmPassword) {
        progress++;
        if (confirmPassword.length > 5 && confirmPassword === password) {
          progress++;
        }
      }

      setProgress(progress);

      // reset root error
      form.setError("root", { message: undefined });
    });
  }, [form.watch, form]);

  return (
    <div className="relative px-10 pb-10 pt-11">
      <div className=" absolute -top-8 left-4 grid aspect-square h-16 place-content-center rounded-full bg-zinc-100">
        <UserPlus2 size={42} />
      </div>
      <div>
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
              <TextField
                control={form.control}
                name="confirmPassword"
                label={
                  <span className="flex items-center gap-x-1">
                    <KeyRound size={14} />
                    <span
                      className={cn(
                        fontZenMaruGothic.className,
                        "font-[300] tracking-wider",
                      )}
                    >
                      請再輸入密碼
                    </span>
                  </span>
                }
                value={form.watch("confirmPassword")}
                type="password"
              />
            </div>
            <div className="relative">
              <SignUpButton form={form} progress={progress}>
                <span
                  className={cn(fontZenMaruGothic.className, "tracking-widest")}
                >
                  建立帳號
                </span>
              </SignUpButton>
              {form.formState.errors.root?.message ? (
                <div className="absolute text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.root?.message}
                </div>
              ) : null}
            </div>
          </form>
          <p
            className={cn(
              "mt-8 text-center text-sm font-[300] text-gray-600",
              fontZenMaruGothic.className,
            )}
          >
            已持有帳號，請
            <Link href="/signin" className="text-main hover:underline">
              登入
            </Link>
            .
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
