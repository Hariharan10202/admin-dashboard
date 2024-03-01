import { withAuth } from "next-auth/middleware";
import { publicRoutes } from "./routes";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const { nextUrl } = req;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      if (isPublicRoute) {
        if (token) {
          return NextResponse.redirect(new URL("/dashborad", nextUrl));
        }
        return true;
      }
      if (!isPublicRoute && !token) {
        return Response.redirect(new URL("/signin", req.url));
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
