const { defineConfig } = require("@vue/cli-service");
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// module.exports = defineConfig({
module.exports = {  
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest:require('./public/vendor/vendor-manifest.json')
        }),
        new AddAssetHtmlPlugin ({
            filepath: path.resolve(__dirname, './public/vendor/vendor.dll.js'),
            // publicPath: './vendor',
            // outputPath: './vendor'
        })
    ],
    resolve: {
        alias: {
            "@" : path.resolve(__dirname, 'src/')
        }
    }
  }
};
