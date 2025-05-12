const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const dependencies = require("./package.json").dependencies;

const todoformAppUrl = "https://micro-frontend-todo-app.vercel.app";
const todolistAppUrl = "https://micro-frontend-todo-app-list.vercel.app";

module.exports = {
  entry: "./src/bootstrap.js", //default location looks for index.js
  output: {
    path: path.resolve(__dirname, "build"), //default: dist
    filename: "main.js", //default: main.js
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/, //for parsing modern js to plain old js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i, //for parsing all types of modern css to plain css
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // for parsing image or static files
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ModuleFederationPlugin({
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {
        todoform_app: `todoform_app@${todoformAppUrl}/remoteEntry.js`,
        todolist_app: `todolist_app@${todolistAppUrl}/remoteEntry.js`,
      },
      shared: {
        ...dependencies,
      },
    }),
  ],
};
