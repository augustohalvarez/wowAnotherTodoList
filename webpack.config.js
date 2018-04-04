const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["react", "es2015", "stage-1"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },

  // Dev tools are provided by webpack
  // Source maps help map errors to original react code
  devtool: 'cheap-module-eval-source-map',

  // Configuration for webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    host: 'localhost', // Defaults to `localhost`
    port: 8080, // Defaults to 8080
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        pathRewrite: {"^/api" : ""}
      }
    }
  }
};
