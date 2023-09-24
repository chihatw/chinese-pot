import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession & {
      uid: string;
      admin: boolean;
    };
  }
}
