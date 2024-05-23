import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/font";
import { bodyBg } from "./ui/themes";
import ToggleTheme from "./ui/toggle-theme";
import { cookies } from "next/headers";
import { clientCookiesKeys } from "./lib/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Parking Admin Dashboard",
    default: "Smart Parking Admin Dashboard",
  },
  description: "The official Smart Parking Admin Dashboard website",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function RootLayout({ children }: _IChildren) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(clientCookiesKeys.THEME);
  const theme = themeCookie?.value;

  return (
    <html lang="en" className={theme}>
      <body className={`${inter.className} antialiased ${bodyBg}`}>
        {children}
        <ToggleTheme />
      </body>
    </html>
  );
}
