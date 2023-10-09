export { default } from "next-auth/middleware";

export const config = { matcher: ["/sentence/:path*"] };
