import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Configuration to match specific paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// The main middleware function
export default auth((req) => {
    const isAuthenticated = !!req.auth; // Check if the user is authenticated
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard"); // Check if the request is for the dashboard

    // If the user is trying to access the dashboard without being authenticated
    if (isOnDashboard && !isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL("/auth/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    // If the user is authenticated but not on the dashboard, redirect to the dashboard
  if (!isOnDashboard && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin), {
        status: 303
      });
    }

    // Continue with the request if none of the above conditions are met
    return NextResponse.next();
});
