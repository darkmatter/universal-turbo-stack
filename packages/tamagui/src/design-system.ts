// Design system source of truth for semantic colors and tokens
// This file can generate both Tailwind CSS variables and Tamagui themes.

export type SemanticColors = {
  // base semantic colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  // charts
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  // sidebar
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  // radius and shadows
  radius: string;
  shadow2xs: string;
  shadowXs: string;
  shadowSm: string;
  shadow: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  shadow2xl: string;
  trackingNormal: string;
};

export type DesignSystem = {
  light: SemanticColors;
  dark: SemanticColors;
};

// Values aligned with tooling/tailwind/theme.css
export const designSystem: DesignSystem = {
  light: {
    background: "oklch(0.9875 0.0045 314.8053)",
    foreground: "oklch(0.2277 0.0105 312.0161)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.2277 0.0105 312.0161)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.2277 0.0105 312.0161)",
    primary: "oklch(0.5605 0.1911 350.0331)",
    primaryForeground: "oklch(1 0 0)",
    secondary: "oklch(0.967 0.0106 316.4921)",
    secondaryForeground: "oklch(0.4536 0.0226 309.5036)",
    muted: "oklch(0.967 0.0106 316.4921)",
    mutedForeground: "oklch(0.5653 0.021 306.4429)",
    accent: "oklch(0.967 0.0106 316.4921)",
    accentForeground: "oklch(0.5605 0.1911 350.0331)",
    destructive: "oklch(0.6368 0.2078 25.3313)",
    destructiveForeground: "oklch(1 0 0)",
    border: "oklch(0.9419 0.016 310.0997)",
    input: "oklch(1 0 0)",
    ring: "oklch(0.5605 0.1911 350.0331)",
    chart1: "oklch(0.5605 0.1911 350.0331)",
    chart2: "oklch(0.6747 0.1492 345.9482)",
    chart3: "oklch(0.7729 0.1045 344.4709)",
    chart4: "oklch(0.8625 0.0636 341.4088)",
    chart5: "oklch(0.9411 0.0261 343.2843)",
    sidebar: "oklch(0.967 0.0106 316.4921)",
    sidebarForeground: "oklch(0.4536 0.0226 309.5036)",
    sidebarPrimary: "oklch(0.5605 0.1911 350.0331)",
    sidebarPrimaryForeground: "oklch(1 0 0)",
    sidebarAccent: "oklch(0.9419 0.016 310.0997)",
    sidebarAccentForeground: "oklch(0.5605 0.1911 350.0331)",
    sidebarBorder: "oklch(0.9155 0.0235 310.6964)",
    sidebarRing: "oklch(0.5605 0.1911 350.0331)",
    radius: "0.75rem",
    shadow2xs: "0px 2px 10px 0px hsl(0 0% 0% / 0.03)",
    shadowXs: "0px 2px 10px 0px hsl(0 0% 0% / 0.03)",
    shadowSm:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05)",
    shadow:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05)",
    shadowMd:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.05), 0px 2px 4px -1px hsl(0 0% 0% / 0.05)",
    shadowLg:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.05), 0px 4px 6px -1px hsl(0 0% 0% / 0.05)",
    shadowXl:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.05), 0px 8px 10px -1px hsl(0 0% 0% / 0.05)",
    shadow2xl: "0px 2px 10px 0px hsl(0 0% 0% / 0.13)",
    trackingNormal: "0rem",
  },
  dark: {
    background: "oklch(0.1836 0.0111 311.9111)",
    foreground: "oklch(0.9788 0.0057 308.3962)",
    card: "oklch(0.1836 0.0111 311.9111)",
    cardForeground: "oklch(0.9788 0.0057 308.3962)",
    popover: "oklch(0.1836 0.0111 311.9111)",
    popoverForeground: "oklch(0.9788 0.0057 308.3962)",
    primary: "oklch(0.6747 0.1492 345.9482)",
    primaryForeground: "oklch(0.1836 0.0111 311.9111)",
    secondary: "oklch(0.2551 0.0142 310.7968)",
    secondaryForeground: "oklch(0.721 0.0184 308.1777)",
    muted: "oklch(0.2551 0.0142 310.7968)",
    mutedForeground: "oklch(0.6288 0.0177 309.9946)",
    accent: "oklch(0.2551 0.0142 310.7968)",
    accentForeground: "oklch(0.6747 0.1492 345.9482)",
    destructive: "oklch(0.3958 0.1331 25.723)",
    destructiveForeground: "oklch(1 0 0)",
    border: "oklch(0.2941 0.0175 310.1142)",
    input: "oklch(0.2551 0.0142 310.7968)",
    ring: "oklch(0.6747 0.1492 345.9482)",
    chart1: "oklch(0.6747 0.1492 345.9482)",
    chart2: "oklch(0.5605 0.1911 350.0331)",
    chart3: "oklch(0.4988 0.1668 350)",
    chart4: "oklch(0.4373 0.1428 349.7487)",
    chart5: "oklch(0.3738 0.1177 349.3988)",
    sidebar: "oklch(0.2103 0.0107 311.9806)",
    sidebarForeground: "oklch(0.721 0.0184 308.1777)",
    sidebarPrimary: "oklch(0.6747 0.1492 345.9482)",
    sidebarPrimaryForeground: "oklch(0.1836 0.0111 311.9111)",
    sidebarAccent: "oklch(0.2551 0.0142 310.7968)",
    sidebarAccentForeground: "oklch(0.6747 0.1492 345.9482)",
    sidebarBorder: "oklch(0.2941 0.0175 310.1142)",
    sidebarRing: "oklch(0.6747 0.1492 345.9482)",
    radius: "0.75rem",
    shadow2xs: "0px 2px 10px 0px hsl(0 0% 0% / 0.1)",
    shadowXs: "0px 2px 10px 0px hsl(0 0% 0% / 0.1)",
    shadowSm:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.2), 0px 1px 2px -1px hsl(0 0% 0% / 0.2)",
    shadow:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.2), 0px 1px 2px -1px hsl(0 0% 0% / 0.2)",
    shadowMd:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.2), 0px 2px 4px -1px hsl(0 0% 0% / 0.2)",
    shadowLg:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.2), 0px 4px 6px -1px hsl(0 0% 0% / 0.2)",
    shadowXl:
      "0px 2px 10px 0px hsl(0 0% 0% / 0.2), 0px 8px 10px -1px hsl(0 0% 0% / 0.2)",
    shadow2xl: "0px 2px 10px 0px hsl(0 0% 0% / 0.5)",
    trackingNormal: "0rem",
  },
};

export function generateTailwindThemeCSS(ds: DesignSystem): string {
  const root = ds.light;
  const dark = ds.dark;
  const css = `:root {\n${[
    ["--background", root.background],
    ["--foreground", root.foreground],
    ["--card", root.card],
    ["--card-foreground", root.cardForeground],
    ["--popover", root.popover],
    ["--popover-foreground", root.popoverForeground],
    ["--primary", root.primary],
    ["--primary-foreground", root.primaryForeground],
    ["--secondary", root.secondary],
    ["--secondary-foreground", root.secondaryForeground],
    ["--muted", root.muted],
    ["--muted-foreground", root.mutedForeground],
    ["--accent", root.accent],
    ["--accent-foreground", root.accentForeground],
    ["--destructive", root.destructive],
    ["--destructive-foreground", root.destructiveForeground],
    ["--border", root.border],
    ["--input", root.input],
    ["--ring", root.ring],
    ["--chart-1", root.chart1],
    ["--chart-2", root.chart2],
    ["--chart-3", root.chart3],
    ["--chart-4", root.chart4],
    ["--chart-5", root.chart5],
    ["--sidebar", root.sidebar],
    ["--sidebar-foreground", root.sidebarForeground],
    ["--sidebar-primary", root.sidebarPrimary],
    ["--sidebar-primary-foreground", root.sidebarPrimaryForeground],
    ["--sidebar-accent", root.sidebarAccent],
    ["--sidebar-accent-foreground", root.sidebarAccentForeground],
    ["--sidebar-border", root.sidebarBorder],
    ["--sidebar-ring", root.sidebarRing],
    ["--radius", root.radius],
  ]
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}\n\n@variant dark {\n${[
    ["--background", dark.background],
    ["--foreground", dark.foreground],
    ["--card", dark.card],
    ["--card-foreground", dark.cardForeground],
    ["--popover", dark.popover],
    ["--popover-foreground", dark.popoverForeground],
    ["--primary", dark.primary],
    ["--primary-foreground", dark.primaryForeground],
    ["--secondary", dark.secondary],
    ["--secondary-foreground", dark.secondaryForeground],
    ["--muted", dark.muted],
    ["--muted-foreground", dark.mutedForeground],
    ["--accent", dark.accent],
    ["--accent-foreground", dark.accentForeground],
    ["--destructive", dark.destructive],
    ["--destructive-foreground", dark.destructiveForeground],
    ["--border", dark.border],
    ["--input", dark.input],
    ["--ring", dark.ring],
    ["--chart-1", dark.chart1],
    ["--chart-2", dark.chart2],
    ["--chart-3", dark.chart3],
    ["--chart-4", dark.chart4],
    ["--chart-5", dark.chart5],
    ["--sidebar", dark.sidebar],
    ["--sidebar-foreground", dark.sidebarForeground],
    ["--sidebar-primary", dark.sidebarPrimary],
    ["--sidebar-primary-foreground", dark.sidebarPrimaryForeground],
    ["--sidebar-accent", dark.sidebarAccent],
    ["--sidebar-accent-foreground", dark.sidebarAccentForeground],
    ["--sidebar-border", dark.sidebarBorder],
    ["--sidebar-ring", dark.sidebarRing],
    ["--radius", dark.radius],
  ]
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`;
  return css;
}

export function createTamaguiThemesFrom(ds: DesignSystem) {
  const toTamagui = (c: SemanticColors) => ({
    background: c.background,
    backgroundHover: c.muted,
    backgroundPress: c.muted,
    backgroundFocus: c.muted,
    backgroundStrong: c.card,
    backgroundTransparent: "transparent",
    color: c.foreground,
    colorHover: c.foreground,
    colorPress: c.foreground,
    colorFocus: c.foreground,
    colorTransparent: "transparent",
    borderColor: c.border,
    borderColorHover: c.border,
    borderColorPress: c.border,
    borderColorFocus: c.ring,
    foreground: c.foreground,
    card: c.card,
    cardForeground: c.cardForeground,
    popover: c.popover,
    popoverForeground: c.popoverForeground,
    primary: c.primary,
    primaryForeground: c.primaryForeground,
    secondary: c.secondary,
    secondaryForeground: c.secondaryForeground,
    muted: c.muted,
    mutedForeground: c.mutedForeground,
    accent: c.accent,
    accentForeground: c.accentForeground,
    destructive: c.destructive,
    destructiveForeground: c.destructiveForeground,
    border: c.border,
    input: c.input,
    ring: c.ring,
    shadowColor: c.foreground,
    shadowColorHover: c.foreground,
    shadowColorPress: c.foreground,
    shadowColorFocus: c.foreground,
    placeholderColor: c.mutedForeground,
    primaryHover: c.primary,
    secondaryHover: c.secondary,
    destructiveHover: c.destructive,
    chart1: c.chart1,
    chart2: c.chart2,
    chart3: c.chart3,
    chart4: c.chart4,
    chart5: c.chart5,
  });

  return {
    light: toTamagui(ds.light),
    dark: toTamagui(ds.dark),
  } as const;
}
