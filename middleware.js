import { withAuth } from "next-auth/middleware";
import { apiAuthPrefix, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const { token } = req.nextauth;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    if (isApiRoute) {
      if (token) {
        return;
      }
      return Response.redirect(new URL("/login", nextUrl));
    }

    if (isPublicRoute) {
      if (token) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return;
    }

    if (!isPublicRoute && !token) {
      return Response.redirect(new URL("/login", nextUrl));
    }

    if (!isPublicRoute && token) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    return;
  },

  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};
