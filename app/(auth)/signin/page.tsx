import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { SignInForm } from "@/features/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/"); // ログインしている場合は、リダイレクト
  }
  return (
    <div className="">
      <SignInForm />
    </div>
  );
}
