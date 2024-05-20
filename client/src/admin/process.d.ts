declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV: string;
    AUTHORIZE_ADMIN: string;
  }
}
