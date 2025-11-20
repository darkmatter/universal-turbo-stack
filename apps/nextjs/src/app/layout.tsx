import "raf/polyfill";

import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import "@acme/tailwind-config/web.css";

import { AppProviders } from "@/components/app-providers";
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "@/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Universal Turbo Stack",
  description:
    "Simple monorepo with cross-platform capabilities for web & mobile apps",
  openGraph: {
    title: "Universal Turbo Stack",
    description:
      "Simple monorepo with cross-platform capabilities for web & mobile apps",
    url: "https://github.com/coopermaruyama/universal-turbo-stack",
    siteName: "Universal Turbo Stack",
  },
  twitter: {
    card: "summary_large_image",
    site: "@_cooperton",
    creator: "@_cooperton",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          montserrat.variable,
          sourceCodePro.variable,
        )}
      >
        <AppProviders>
          <TRPCReactProvider>
            <div
              id="root"
              style={{
                height: "100%",
                flex: "1 1 0%",
                overflowY: "auto",
              }}
            >
              {props.children}
            </div>
            <Toaster />
            <div className="absolute right-4 bottom-4">
              <ThemeToggle />
            </div>
          </TRPCReactProvider>
        </AppProviders>
      </body>
    </html>
  );
}
