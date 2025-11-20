import { withExpo } from "@expo/next-adapter";
import { createJiti } from "jiti";

// next.config.js
// const { withReactNativeCSSWebpack } = require("react-native-css/webpack");

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
      "react-native-svg": "react-native-svg-web",
      // "lucide-react-native": "lucide-react",
    },
    resolveExtensions: [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
    // rules: {
    //   "*.[tj]sx?": {
    //     loaders: [
    //       {
    //         loader: "babel-loader",
    //         options: {
    //           plugins: [
    //             "nativewind/babel" /* Add other babel plugins here */,
    //           ],
    //         },
    //       },
    //     ],
    //   },
    // },
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "react-native",
    "react-native-web",
    "react-native-safe-area-context",
    "react-native-reanimated",
    "react-native-css",
    "react-native-svg",
    "react-native-worklets",
    "@rn-primitives/accordion",
    "@rn-primitives/alert-dialog",
    "@rn-primitives/aspect-ratio",
    "@rn-primitives/avatar",
    "@rn-primitives/checkbox",
    "@rn-primitives/collapsible",
    "@rn-primitives/context-menu",
    "@rn-primitives/dialog",
    "@rn-primitives/dropdown-menu",
    "@rn-primitives/hover-card",
    "@rn-primitives/label",
    "@rn-primitives/menubar",
    "@rn-primitives/navigation-menu",
    "@rn-primitives/portal",
    "@rn-primitives/popover",
    "@rn-primitives/progress",
    "@rn-primitives/radio-group",
    "@rn-primitives/select",
    "@rn-primitives/separator",
    "@rn-primitives/slot",
    "@rn-primitives/switch",
    "@rn-primitives/table",
    "@rn-primitives/tabs",
    "@rn-primitives/toggle",
    "@rn-primitives/toggle-group",
    "@rn-primitives/tooltip",
    "lucide-react-native",
    "nativewind",
    "react-native-css-interop",
    "@rn-primitives/slot",
    "expo",
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/tamagui",
    "@acme/validators",
    "@acme/tailwind-config",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  typescript: { ignoreBuildErrors: true },

  allowedDevOrigins: ["100.95.205.8" /* Add your IP here */],

  experimental: {
    // forceSwcTransforms: true,
    // reactCompiler: true,
  },
  compiler: {
    define: {
      // __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
    },
  },
  // Ensure webpack (production build) uses the same aliases/extensions as Turbopack (dev)
  webpack: (/** @type {any} */ config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
      "react-native-svg": "react-native-svg-web",
    };
    config.resolve.extensions = [
      ".web.mjs",
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...(config.resolve.extensions || []),
    ];
    return config;
  },
};

export default withExpo(config);

// export default withReactNativeCSSWebpack(withExpo(config), {
//   enableReactNativeAlias: true,
// });
