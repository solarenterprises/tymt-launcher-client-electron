import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new webpack.ProvidePlugin({
    Buffer: ["buffer", "Buffer"],
    // process: "process/browser",
  }),
  new Dotenv(),
];
