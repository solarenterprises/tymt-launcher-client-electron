import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpack from "webpack";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
];

module.exports = {
  // Extend the main and renderer configurations
  mainConfig: (config: any) => {
    return config;
  },
  rendererConfig: (config: any) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        url: require.resolve("url-browserify"),
        buffer: require.resolve("buffer"),
        assert: require.resolve("assert"),
      },
    };

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),
      ...plugins, // Add ForkTsCheckerWebpackPlugin here
    ];

    return config;
  },
};
