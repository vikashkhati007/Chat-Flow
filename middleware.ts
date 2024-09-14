import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const customMiddleware = withAuth(
  (req) => {
    if (!req.nextauth.token) {
      return NextResponse.redirect("/");
    }
  },
  {
    pages: {
      signIn: "/",
    },
  }
);

export default customMiddleware;

export const config = { matcher: ["/chats", "/guests", "/dashboard", "/api/:path*"] };