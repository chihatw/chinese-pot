import { z } from "zod";

export interface User {
  uid: string;
  admin: boolean;
}

export const SignInSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電郵地址" }),
  password: z.string().min(6, { message: "請輸入六字以上的密碼" }),
});

export type SignInSchema = z.infer<typeof SignInSchema>;

// https://zod.dev/?id=refine
export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "請輸入有效的電郵地址" }),
    password: z.string().min(6, { message: "請輸入六字以上的密碼" }),
    confirmPassword: z.string().min(6, { message: "請輸入六字以上的密碼" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof SignUpSchema>;
