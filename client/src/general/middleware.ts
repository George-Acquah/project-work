import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./app/lib/routes";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  
    if (isApiAuthRoute) return null;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
      }
      return null;
  }
  
    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = pathname;

      if (req.nextUrl.search) {
        callbackUrl += req.nextUrl.search;
      }
    }

})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
