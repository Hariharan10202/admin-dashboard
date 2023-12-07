import { withAuth } from "next-auth/middleware";

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
