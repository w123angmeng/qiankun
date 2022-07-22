const { defineConfig } = require("@vue/cli-service");
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// module.exports = defineConfig({
module.exports = {  
//   publicPath: "/",
  transpileDependencies: true,
//   external: {
//     vue: 'Vue',
//     'vue-router': 'VueRouter',
//     vuex: 'Vuex',
//     axios: 'axios',

//   },
  configureWebpack: {
    // external: {
    //     vue: 'Vue',
    //     'vue-router': 'VueRouter',
    //     vuex: 'Vuex',
    //     axios: 'axios',
        
    //   },
    plugins: [
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest:require('./public/vendor/vendor-manifest.json')
        }),
        new AddAssetHtmlPlugin ({
            filepath: path.resolve(__dirname, './public/vendor/vendor.dll.js'),
            publicPath: './vendor',
            outputPath: './vendor'
        })
    ],
    devServer: {
        // hot: true,
        // disableHostCheck: true,
        // 修改默认端口，和注册时一直
        host: "localhost/",
        port: 8080,
        open: true,
        // overlay: {
        //   warnings: false,
        //   errors: true
        // },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
    },
    resolve: {
        alias: {
            "@" : path.resolve(__dirname, 'src/')
        }
    }
  }
};
