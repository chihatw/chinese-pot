import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const GUEST_ONLY_PAGES = ["/signin", "/signup"];

// https://stackoverflow.com/questions/74191340/next-auth-middleware-default-is-not-working
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isLoginedUser = !!session?.email;

  // ログインユーザーはリダイレクト
  if (GUEST_ONLY_PAGES.includes(path)) {
    if (isLoginedUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 未ログインユーザーはリダイレクト
  if (!isLoginedUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// リダイレクト処理が必要なページ
// noto 配列の展開は使えない
export const config = {
  matcher: ["/signin", "/signup", "/article/:path*", "/sentence/:path*"],
};
