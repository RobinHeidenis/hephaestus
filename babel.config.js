module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          ["inline-import", { extensions: [".sql"] }],
          "react-native-paper/babel",
          "react-native-reanimated/plugin",
        ],
      },
    },
  };
};
