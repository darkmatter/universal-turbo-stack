"use client";

import { PortalHost } from "@acme/ui";
import { useServerInsertedHTML } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
// import { StyleSheet } from "react-native";

import { ThemeProvider } from "./theme-provider";
import { NextTamaguiProvider } from "./NextTamaguiProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useTheme();

  useServerInsertedHTML(() => {
    // const _ = StyleSheet.getSheet();
    return (
      <>
        <style jsx global>{`
          html {
            font-family: "Montserrat", sans-serif;
          }
          body {
            background-color: var(--background);
            color: var(--color);
          }
        `}</style>
        {/* <style
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        /> */}
      </>
    );
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextTamaguiProvider>
        {children}
        <PortalHost />
      </NextTamaguiProvider>
    </ThemeProvider>
  );
};
