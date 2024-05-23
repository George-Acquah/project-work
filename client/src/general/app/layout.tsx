import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/shared/font";
import { bodyBg } from "@/app/ui/shared/themes";
import ThemeToggler from "@/app/ui/shared/toggle-theme";
import { Providers } from "./providers";
import { themeKey } from "@/utils/contexts/contexts";
import { cookies } from "next/headers";
import Header from "@/app/ui/nav/header";
import { auth } from "@/auth";
import AuthModal from "./auth-modal";
import { getServerSideCookies } from "./lib/actions";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Parking",
    default: "Smart Parking Landing",
  },
  description: "The official Smart Parking Admin Landing website",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function RootLayout({ children }: _IChildren) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(themeKey);
  const theme = themeCookie?.value;

  const session = await auth();

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased ${bodyBg}`}>
        <Providers theme={theme!}>
          <Header loggedIn={ session?.access_token ? true : false} />
          {children}
          <ThemeToggler />
        </Providers>
      </body>
    </html>
  );
}
