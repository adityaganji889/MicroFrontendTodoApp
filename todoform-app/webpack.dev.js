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
    port: 3001,
    hot: true, // Fpr hot reloading in dev server (reloading content with persisting state) (install dependencies first: npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh)
    historyApiFallback: true, //to configure your remote app’s server to serve index.html for all unmatched routes
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
    //Exporting component remotely to host app starts
    new ModuleFederationPlugin({
      name: "todoform_app",
      filename: "remoteEntry.js",
      exposes: {
        // used when exporting this component to other remote app
        "./Todoform": "./src/components/Todoform.jsx",
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
    //Exporting component remotely to host app ends
  ],
};
