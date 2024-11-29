"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AppContextProvider } from "@/context/AppContext";
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
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <AppContextProvider>
              <CeleseonThemeProvider>{children}</CeleseonThemeProvider>
            </AppContextProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
