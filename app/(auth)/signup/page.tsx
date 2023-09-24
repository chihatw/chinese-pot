import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { SignUpForm } from "@/features/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/"); // ログインしている場合は、リダイレクト
  }
  return (
    <div className="">
      <SignUpForm />
    </div>
  );
}
