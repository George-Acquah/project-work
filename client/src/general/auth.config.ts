import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/login",
    newUser: "auth/register",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(
          new URL("http://localhost:3000/dashboard", nextUrl)
        );
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
