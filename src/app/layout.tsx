import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import CellesseonTheme from "@/components/layout/CellesseonTheme";
import type { Metadata, Viewport } from "next";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/globals.css";
import MainWrapper from "@/components/layout/MainWrapper";

export const metadata: Metadata = {
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
};

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
          <p className="bg-red-600 text-yellow-400">main layout</p>
          <AppRouterCacheProvider>
            <InitColorSchemeScript attribute="data-cellesseon-theme" />
            <CellesseonTheme>
              <MainWrapper>{children}</MainWrapper>
            </CellesseonTheme>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
