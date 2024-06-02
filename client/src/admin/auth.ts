import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials"
import { authConfig } from "./auth.config";
import { API } from "./app/lib/data";
import { refreshToken } from "./app/lib/actions";
import { credentials } from "./app/lib/constants";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        console.log(email, password);

        const response = await fetch(`${API}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) return null;
        const resJson = await response.json();
        const user = resJson.data;

        if (user.user.userType === process.env.AUTHORIZE_ADMIN) {
          return user;
        }
        return null;
        // return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.tokens.expiresIn!) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.access_token = token.tokens.access_token;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
