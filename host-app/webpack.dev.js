const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/bootstrap.js", //default location looks for index.js
  output: {
    path: path.resolve(__dirname, "build"), //default: dist
    filename: "main.js", //default: main.js
  },
  //   mode: "production",
  //For running webpack in development server mode configuration starts (have webpack-dev-server dependency installed first)
  mode: "development",
  devServer: {
    port: 3000,
    hot: true, // Fpr hot reloading in dev server (reloading content with persisting state) (install dependencies first: npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh)
    historyApiFallback: true, //to configure your host app’s server to serve index.html for all unmatched routes
  },
  //For running webpack in development server mode configuration ends
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
    new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {
        // used to import remote app components in current app
        todoform_app: "todoform_app@http://localhost:3001/remoteEntry.js", //The key should match with the imported compoa2nent name defined in the remote app. In the value, MFAName@domain of the remote app in which remote component is running
        todolist_app: "todolist_app@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        ...dependencies,
      },
      // shared: {
      //   react: {
      //     singleton: true,
      //     requiredVersion: dependencies.react,
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     requiredVersion: dependencies["react-dom"],
      //   },
      // },
    }),
  ],
};
