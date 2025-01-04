import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".svg"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      // url: require.resolve("url-browserify"),
      buffer: require.resolve("buffer/"),
      // assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      vm: require.resolve("vm-browserify"),
      // process: require.resolve("process/browser"),
    },
    alias: {
      // process: "process/browser",
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
