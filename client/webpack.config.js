const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js", // Main entry point for the app
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js", // Output file name
      path: path.resolve(__dirname, "dist"), // Output directory
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html", // Template for generating HTML
        title: "Just Another Text Editor", // Title of app
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "Text Editor",
        description: "A note-taking app with offline capabilities",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/, // Handles js files
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", // transpile JS
            options: {
              presets: ["@babel/preset-env"], // ES6+ support
            },
          },
        },
      ],
    },
  };
};
