import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/shared/font";
import { bodyBg } from "./ui/shared/themes";
import ToggleTheme from "@/app/ui/shared/toggle-theme";
import { cookies } from "next/headers";
import { clientCookiesKeys } from "./lib/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Parking",
    default: "Smart Parking Landing",
  },
  description: "The official Smart Parking Admin Landing website",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function RootLayout({ children }: any) {
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
