"use client";
import { ClerkProvider } from "@clerk/nextjs";
// import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "@/themes/muiTheme";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/globals.css";

/* export const metadata: Metadata = {
  title: "Cellesseon",
  description: "Cellesseon Smart Assistent",
};

export const viewport: Viewport = {
  themeColor: "dark",
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6A0DAD",
          colorText: "#008080",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <AppRouterCacheProvider>
            <InitColorSchemeScript attribute="data-celeseon-theme" />
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
