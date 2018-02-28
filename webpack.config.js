/*
* @author  Hamid belahrach
*/

const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("public"),
    filename: "output.js"
  },
  devServer: {
    hot: true,
    publicPath: "/",
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: {
      index: `/index.html`,
      verbose: false
    },
    inline: true,
    open: true,
    port: 8081
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".scss",
      ".css",
      ".jpeg",
      ".jpg",
      ".gif",
      ".png"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: ["css-hot-loader"].concat(
          ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                  sourceMap: true
                }
              },
              "sass-loader",
              "postcss-loader"
            ]
          })
        )
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
        loaders: [
          "file-loader?context=src/assets/images/&name=images/[path][name].[ext]",
          {
            // images loader
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: "75-90",
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin("styles.css"),
    new HtmlWebpackPlugin({
      hash: false,
      template: path.resolve(__dirname, "./public/index.html"),
      inject: "body",
      filename: "index.html"
    })
  ]
};

module.exports = config;

if (process.env.NODE_ENV === "production") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}
