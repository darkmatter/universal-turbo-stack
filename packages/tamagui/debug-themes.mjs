import { themes } from "./themes.js";

// Log the light theme to see what tokens are available
console.log("=== Light Theme Tokens ===");
console.log(Object.keys(themes.light));

console.log("\n=== Sample Token Values ===");
console.log("background:", themes.light.background);
console.log("foreground:", themes.light.foreground);
console.log("primary:", themes.light.primary);
console.log("primaryForeground:", themes.light.primaryForeground);
console.log("borderColor:", themes.light.borderColor);

// Check if foreground token exists
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
  (token) => !(token in themes.light),
);

if (missingTokens.length === 0) {
  console.log("\n✅ All required shadcn tokens are present");
} else {
  console.log("\n❌ Missing tokens:", missingTokens);
}
