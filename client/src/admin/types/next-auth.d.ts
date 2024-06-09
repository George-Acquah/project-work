// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


// Extend the default Session type with additional properties
declare module "next-auth" {
  interface Session {
    user: _ISessionUser;
    access_token: string;
    refresh_token: string;
  }
}

// Extend the default JWT type with additional properties
declare module "next-auth/jwt" {
  interface JWT {
    /** The custom user returned by the server to be used as session */
    user: _ISessionUser;
    /** The custom tokens returned by the server to be used as session */
    tokens: _ITokens;
  }
}
