// import NextAuth from "next-auth";
// import { fetchUserById } from "./app/lib/requests";
// import authConfig from "./auth.config";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   callbacks: {
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user._id = token.sub;
//       }
//       if (token.role && session.user) {
//         session.user.role = 'token.role;'
//       }
//       if (session.user) {
//         // session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
//         session.user.email = 'token.email';
//         session.user.name = 'token.name';
//         session.user.isOAuth = 'token.isOAuth';
//       }

//       return session;
//     },

//     async jwt({ token }) {
//       console.log("signin tokens: ", { ...token });
//       if (!token.sub) return token;
//       const existingUser = await fetchUserById(token.sub);
//       console.log(existingUser);
//       if (!existingUser) return token;

//       // const existingAccount = await getAccountByUserId(existingUser.id);

//       // token.isOAuth = !!existingAccount;
//       token.name = `${existingUser.profile.first_name} ${existingUser.profile.last_name}`;
//       token.email = existingUser.email;
//       token.role = existingUser.userType;
//       return token;
//     },
//   },

//   session: { strategy: "jwt" },
//   ...authConfig,
// });

import NextAuth from "next-auth";
// import Credentials from "@auth/core/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { API } from "./app/lib/data";
import { refreshToken } from "./app/lib/actions";
import { credentials } from "./app/lib/constants";

export const { handlers: { GET, POST}, auth, signIn, signOut, update } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

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
        // if (user.user.userType === process.env.AUTHORIZE_ADMIN) {
        //   return user;
        // }
        // return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.tokens.expiresIn!) {
        console.log(token.tokens);
        return token;
      }

      console.log('refreshed: ',token.tokens);
      return await refreshToken(token.tokens);
    },

    async session({ session, token }) {
      session.user._id = token.user._id;
      session.user.email = token.user.email;
      session.user._id = token.user._id;
      session.access_token = token.tokens.access_token;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
