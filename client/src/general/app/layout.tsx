import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/shared/font";
import { bodyBg } from "./ui/shared/themes";
import ToggleTheme from "@/app/ui/shared/toggle-theme";
import { Providers } from "./providers";
import { themeKey } from "@/utils/contexts/contexts";
import { cookies } from "next/headers";

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
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased ${bodyBg}`}>
        <Providers theme={theme!}>
          {children}
          <ToggleTheme />
        </Providers>
      </body>
    </html>
  );
}
