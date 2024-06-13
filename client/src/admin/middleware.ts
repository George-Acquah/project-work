import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Configuration to match specific paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Routes that require authentication
const loggedInRoutes = ["/dashboard"];
const loggedOutRoutes = ["/auth/login"];

// The main middleware function
export default auth((req) => {
  const isAuthenticated = !!req.auth; // Check if the user is authenticated
  const { pathname } = req.nextUrl;

  // Rewrite unauthenticated users trying to access loggedInRoutes to login page
  if (!isAuthenticated && loggedInRoutes.some(path => pathname.startsWith(path))) {
    console.log('Rewriting to login: ');
    NextResponse.rewrite(new URL(`/auth/login`, req.nextUrl));
    return NextResponse.redirect(new URL(`/auth/login`, req.nextUrl));
  }

  // Rewrite authenticated users trying to access loggedOutRoutes to dashboard
  if (isAuthenticated && loggedOutRoutes.some(path => pathname.startsWith(path))) {
    console.log('Rewriting to dashboard: ');
    NextResponse.rewrite(new URL(`/dashboard`, req.nextUrl));
    return NextResponse.redirect(new URL(`/dashboard`, req.nextUrl));
  }

  // If the request does not match any of the specific routes, continue with the request
  console.log('Continuing with the request: ');
  return NextResponse.next();
});
