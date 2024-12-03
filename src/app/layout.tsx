"use client";
import { ClerkProvider } from "@clerk/nextjs";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CeleseonContextProvider } from "@/context/CeleseonContext";
import CeleseonThemeProvider from "@/themes/themeProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#26D0CE", colorText: "#1A2980" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <AppRouterCacheProvider>
            <CeleseonContextProvider>
              <InitColorSchemeScript attribute="class" />
              <CeleseonThemeProvider>{children}</CeleseonThemeProvider>
            </CeleseonContextProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
