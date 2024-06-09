// types/next-auth.d.ts

import { JWT } from "@auth/core/jwt";
import { Session } from "next-auth";

// Extend the User type with the properties you expect
interface _ISessionUser {
  id: number;
  email: string;
  userType: _TUserType;
  image: string;
}

// Extend the default Session type with additional properties
declare module "next-auth" {
  interface Session {
    user: _ISessionUser;
    access_token: string;
    refresh_token: string;
  }
}

// Extend the default JWT type with additional properties
declare module "@auth/core/jwt" {
  interface JWT {
    /** The custom user returned by the server to be used as session */
    user: _ISessionUser;
    /** The custom tokens returned by the server to be used as session */
    tokens: _ITokens;
  }
}
