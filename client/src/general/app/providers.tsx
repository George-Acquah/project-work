"use client";

import { NavbarProvider } from "@/utils/contexts/NavbarVisibilityContext";
import OpenCloseProvider from "@/utils/contexts/OpenCloseContext";
import { ThemeProvider } from "@/utils/contexts/theme-contexts";

interface _IProviders {
  children: React.ReactNode;
  theme: string;
}

export function Providers({ children, theme }: _IProviders) {
  return (
    <NavbarProvider>
      <OpenCloseProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme={theme}
        >
          {children}
        </ThemeProvider>
      </OpenCloseProvider>
    </NavbarProvider>
  );
}
