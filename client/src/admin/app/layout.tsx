import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/font";
import { bodyBg } from "./ui/themes";
import { cookies } from "next/headers";
import { themeKey } from "@/constants/theme.constants";
import { Providers } from "./providers";
import ThemeToggler from "./ui/toggle-theme";
import SessionModal from "./ui/modals/session.modal";
import { Suspense } from "react";
import ErrorModal from "./ui/modals/error.modal";

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
  const themeCookie = cookieStore.get(themeKey);
  const theme = themeCookie?.value;

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased ${bodyBg} overflow-x-hidden`}>
        <Providers theme={theme!}>
          <Suspense fallback={<p> Loading ....</p>}>
            <SessionModal />
          </Suspense>
          <Suspense fallback={<p> Loading ....</p>}>
            <ErrorModal />
          </Suspense>
          {children}
          <ThemeToggler />
        </Providers>
      </body>
    </html>
  );
}
