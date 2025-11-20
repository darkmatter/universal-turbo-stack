/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-worklets/plugin",
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
        },
      ],
    ],
  };
};
