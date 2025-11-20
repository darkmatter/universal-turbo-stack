import { createTamagui } from "@tamagui/core";
import { createInterFont } from "@tamagui/font-inter";

import { config } from "../tamagui.config";

// Test that our config exports properly
export const testConfig = config;

// Verify that themes are properly structured
export function validateThemes() {
  const themeKeys = Object.keys(config.themes);
  console.log("Available themes:", themeKeys);

  // Check that we have light and dark variants
  const hasLight = themeKeys.some((key) => key.includes("light"));
  const hasDark = themeKeys.some((key) => key.includes("dark"));

  console.log("Has light themes:", hasLight);
  console.log("Has dark themes:", hasDark);

  // Check that themes have required shadcn tokens
  const lightTheme = config.themes.light;
  if (lightTheme) {
    const requiredTokens = [
      "background",
      "foreground",
      "card",
      "cardForeground",
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
      "muted",
      "mutedForeground",
      "accent",
      "accentForeground",
      "destructive",
      "destructiveForeground",
      "border",
      "input",
      "ring",
    ];

    const missingTokens = requiredTokens.filter(
      (token) => !(token in lightTheme),
    );

    if (missingTokens.length === 0) {
      console.log("✅ All required shadcn tokens are present");
    } else {
      console.log("❌ Missing tokens:", missingTokens);
    }
  }

  return { hasLight, hasDark, themeKeys };
}

// Test component that uses our themes
export function ThemeTest() {
  return {
    message: "Tamagui shadcn port loaded successfully",
    availableThemes: Object.keys(config.themes),
    tokenCount: Object.keys(config.tokens.size).length,
  };
}
