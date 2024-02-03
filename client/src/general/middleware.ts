import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};

export function middleware(request: NextRequest) {
  request.cookies.delete("nextjs");

  const response = NextResponse.next();

  return response;
}
// export function middleware(request: NextRequest) {
//   const reservationStatus = request.cookies.get("__ls_val");
//   const reservationPayload = request.cookies.get(
//     process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD
//   );

//     if (reservationPayload && reservationStatus) {
//       // request.cookies.delete(process.env.NEXT_PUBLIC_REQUEST_RESERVATION);
//       // request.cookies.delete(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_DATA);
//       // request.cookies.delete(process.env.NEXT_PUBLIC_AVAILABLE_SLOTS);
//       // request.cookies.delete(
//       //   process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD
//       // );
//       console.log(request.cookies.has("__ls_val")); // => true
//       request.cookies.delete("__ls_val");
//       console.log("Ima gon work");
//     }

//   const response = NextResponse.next();

//   return response;
// }