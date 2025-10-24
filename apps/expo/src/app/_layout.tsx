import "../../../../tooling/tailwind/base.css";

import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import type { Theme } from "@react-navigation/native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import * as storage from "@/lib/storage";
import { ThemeToggle } from "~/components/theme-toggle";
import { queryClient } from "~/lib/api";
import { NAV_THEME } from "~/lib/constants";
import { useIsomorphicLayoutEffect } from "~/lib/hooks/useIsomorphicLayoutEffect";
import AppThemeProvider from "../lib/theme-provider";
import { TamaguiProvider } from "tamagui";
import { config as tamaguiConfig } from "../../tamagui.config";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} themeClassNameOnRoot>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#c03484",
            },
            contentStyle: {
              backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
            },
          }}
        />
        <StatusBar />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}


export function BackupRootLayout () {
  const hasMounted = React.useRef(false);
  const colorScheme = useColorScheme();
  const isDarkColorScheme = colorScheme !== "light";
  const theme = NAV_THEME[colorScheme ?? "dark"];
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const _fontsLoaded = useFonts({
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_700Bold,
  });

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document?.documentElement.classList.add("bg-background");
      document?.body.classList.add("debug-screens");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <React.StrictMode>
      <GestureHandlerRootView style={{ flex: 1 }} className="debug-screens">
        <QueryClientProvider client={queryClient}>
          {/* <AppThemeProvider> */}
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            {/*
                  The Stack component displays the current page.
                  It also allows you to configure your screens
                */}
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarBackgroundColor: theme.background,
                animation: "none",
                contentStyle: {
                  backgroundColor: isDarkColorScheme
                    ? "hsl(240, 10%, 3.9%)" // dark background
                    : "hsl(240, 0%, 98%)", // light
                },
              }}
            />
            {/* Default Portal Host (one per app) */}
            <PortalHost />
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <ThemeToggle />
          </ThemeProvider>
          {/* </AppThemeProvider> */}
        </QueryClientProvider>
      </GestureHandlerRootView>
    </React.StrictMode>
  );