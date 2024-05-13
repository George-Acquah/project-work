// import type { NextAuthConfig } from "next-auth";
// import Credentials from 'next-auth/providers/credentials';

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
//         const { email, password } = credentials;

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//           {
//             method: "POST",
//             body: JSON.stringify({
//               email,
//               password,
//             }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) return null;

//         const resJson = await response.json();
//         const user = resJson.data;
//         return user;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from "next-auth";
import { UserType } from "./app/lib/constants";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "auth/register",
  },
  providers: [],
} satisfies NextAuthConfig;