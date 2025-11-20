import { createTamagui, createTokens } from "@tamagui/core";
import { createInterFont } from "@tamagui/font-inter";

import { themes } from "./src/themes";

// Create Inter font
const interFont = createInterFont();
const tokens = createTokens({
  size: {
    0: 0,
    0.25: 2,
    0.5: 4,
    0.75: 6,
    1: 8,
    1.5: 12,
    2: 16,
    2.5: 20,
    3: 24,
    3.5: 28,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
    9: 72,
    10: 80,
    11: 88,
    12: 96,
    14: 112,
    16: 128,
    20: 160,
    24: 192,
    28: 224,
    32: 256,
    36: 288,
    40: 320,
    44: 352,
    48: 384,
    52: 416,
    56: 448,
    60: 480,
    64: 512,
    72: 576,
    80: 640,
    96: 768,
  },
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  radius: {
    0: 0,
    1: 3,
    2: 6,
    3: 8,
    4: 12,
    true: 6,
  },
  zIndex: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  },
  color: {
    white: "#fff",
    black: "#000",
    transparent: "transparent",
  },
});

export const config = createTamagui({
  // Tokens - design system values
  tokens,

  // Use our shadcn-inspired themes
  themes,

  // Fonts
  fonts: {
    inter: interFont,
    body: interFont,
    heading: interFont,
  },

  // Media queries
  media: {
    xs: { maxWidth: 479 },
    sm: { maxWidth: 639 },
    md: { maxWidth: 767 },
    lg: { maxWidth: 895 },
    xl: { maxWidth: 1023 },
    xxl: { minWidth: 1024 },
    gtXs: { minWidth: 480 },
    gtSm: { minWidth: 640 },
    gtMd: { minWidth: 768 },
    gtLg: { minWidth: 896 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  },

  // Shorthands for common style properties
  shorthands: {
    px: "paddingHorizontal",
    py: "paddingVertical",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    mx: "marginHorizontal",
    my: "marginVertical",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    bg: "backgroundColor",
    f: "flex",
    fd: "flexDirection",
    fw: "flexWrap",
    ai: "alignItems",
    ac: "alignContent",
    jc: "justifyContent",
    ta: "textAlign",
    pos: "position",
    t: "top",
    r: "right",
    b: "bottom",
    l: "left",
    w: "width",
    h: "height",
    minW: "minWidth",
    maxW: "maxWidth",
    minH: "minHeight",
    maxH: "maxHeight",
    ov: "overflow",
    bc: "borderColor",
    bw: "borderWidth",
    br: "borderRadius",
    btlr: "borderTopLeftRadius",
    btrr: "borderTopRightRadius",
    bblr: "borderBottomLeftRadius",
    bbrr: "borderBottomRightRadius",
    zi: "zIndex",
    o: "opacity",
  },

  settings: {
    allowedStyleValues: "somewhat-strict-web",
    autocompleteSpecificTokens: "except-special",
    themeClassNameOnRoot: true,
  },
});
// console.log(process.env);
export type Conf = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
type AppConfig = typeof config;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}
