import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
        return false;
      } else if (req.nextUrl.pathname === "/dashboard" && token === null) {
        return false;
      } else if (req.nextUrl.pathname === "/" && token) {
        return true;
      }
      return true;
    },
  },
});
