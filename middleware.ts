import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const GUEST_ONLY_PAGES = ["/signin", "/signup"];
const ADMIN_ONLY_PAGES = ["/admin"];

// https://stackoverflow.com/questions/74191340/next-auth-middleware-default-is-not-working
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const uid = session?.uid || "";
  const admin = session?.admin || false;

  // ゲスト専用ページ（ログイン等）は、ログインユーザーはリダイレクト
  if (GUEST_ONLY_PAGES.includes(path)) {
    if (!!uid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 管理者専用ページで、管理者でない場合は、リダイレクト
  if (ADMIN_ONLY_PAGES.includes(path)) {
    if (!admin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!uid) {
    // ユーザー情報を表示するページは、未ログインユーザーはリダイレクト
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// リダイレクト処理が必要なページ
// noto 配列の展開は使えない
export const config = {
  matcher: [
    "/admin",
    "/signin",
    "/signup",
    "/article/:path*",
    "/sentence/:path*",
    "/outline",
  ],
};
