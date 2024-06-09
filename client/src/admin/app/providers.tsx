"use client";

import { ThemeProvider } from "@/utils/contexts/theme-context";

interface _IProviders {
  children: React.ReactNode;
  theme: string;
}

export function Providers({ children, theme }: _IProviders) {
  return (
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme={theme}
      >
          {children}
      </ThemeProvider>
  );
}
