import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { API, switchErrRes } from "./app/lib/data";
import { refreshToken } from "./app/lib/actions";
import { credentials } from "./app/lib/constants";

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        try {
          const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();

          if (response.ok && data && data.statusCode === 200) {
            const login_data = data.data;

            if (login_data.user.userType === process.env.AUTHORIZE_ADMIN) {
              console.log("You're not an admin");
              throw new Error(data.message || "Authentication failed");
            }

            return login_data;
          } else {
            // Handle non-200 status codes or other errors
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return { ...token, ...user };
      }

      // if (new Date().getTime() < token.tokens.expiresIn!) {
      //   return token;
      // }
      // ***************************************************************
      // added code
      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }
      // **************************************************************
      return token;

      // return await refreshToken(token);
    },

    async session({ session, token }) {
      // Example: Adding a default value for emailVerified
      const emailVerified = null; // Replace false with how you determine the verification status

      // Now, extend the session.user with the emailVerified property
      session.user = {
        ...token.user,
        emailVerified: emailVerified,
      };
      // session.user = token.user;
      session.access_token = token.tokens.access_token;
      session.refresh_token = token.tokens.refresh_token;
      return session;
    },
  },
  session: {
    // Use JWT for session so we can store the tokens
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
