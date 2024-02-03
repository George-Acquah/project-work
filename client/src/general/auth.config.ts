import type { NextAuthConfig } from "next-auth";
import { UserType } from "./app/lib/constants";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "auth/register",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/parking-lots") ||
        nextUrl.pathname.startsWith("/driver") ||
        nextUrl.pathname.startsWith("/owner");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        // return Response.redirect(
        //   auth?.user.userType === UserType.PARK_OWNER
        //     ? new URL("http://localhost:3002/owner", nextUrl)
        //     : new URL("http://localhost:3002/driver", nextUrl)
        // );
        return Response.redirect( new URL("http://localhost:3002/parking-lots", nextUrl)
        );
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
