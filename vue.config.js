const {
    defineConfig
} = require("@vue/cli-service");
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {
//     VueLoaderPlugin
// } = require('vue-loader/dist/index')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { name } = require('./package');
// module.exports = defineConfig({
let remoteUrl = 'http://localhost:8083'
module.exports = {
    // publicPath: "http://localhost:8080", // /
    publicPath: process.env.NODE_ENV === 'production'
    ? '/his/'
    : "/",
    transpileDependencies: true,
    //   external: {
    //     vue: 'Vue',
    //     'vue-router': 'VueRouter',
    //     vuex: 'Vuex',
    //     axios: 'axios',

    //   },
    productionSourceMap: true,
    devServer: {
        hot: true,
        // disableHostCheck: true,
        // 修改默认端口，和注册时一直
        host: "localhost",
        port: 8080,
        open: true,
        // overlay: {
        //   warnings: false,
        //   errors: true
        // },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        //   proxy: {
        //     '/outpNurse': {
        //         target: 'http://localhost:8080/',
        //     }
        //   }
    },
    configureWebpack: {
        mode: 'development', // production development
        // external: {
        //     vue: 'Vue',
        //     'vue-router': 'VueRouter',
        //     vuex: 'Vuex',cls

        //     axios: 'axios',

        //   },
        // devtool: 'source-map',
        entry: {
            main: './src/main.js'
        },
        cache: {
            type: "memory" // filessystem memory
        },
        resolve: {
            
            extensions: [".vue", ".js", "json"],
            alias: {
                vue$: "vue/dist/vue.esm.js",
                "@": resolve("src"),
                crypto: false,
                stream: false,
                assert: false,
                http: false
            }
        },
        // output: {
        //     path: resolve('./dist'),
        //     filename: "[name].js",
        //     chunkFilename: "[name].js"
        // },
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            // jsonpFunction: `webpackJsonp_${name}`,
            chunkLoadingGlobal: `webpackJsonp_${name}`,
        },
        // output: {
        //     path: resolve('./dist'),
        //     filename: "[name].js",
        //     chunkFilename: "[name].js",
        //     clean:true
        // },
        devtool: false,
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env',
                                // 'es2015',
                                //  {modules: false}
                            ],
                            plugins: [
                                '@babel/plugin-syntax-top-level-await', // 此处为新增配置
                                "transform-remove-strict-mode", // 去除严格模式
                                // '@babel/plugin-transform-runtime',
                            ]
                        }
                    }]
                },
                // {
                //     test: /\.vue$/,
                //     use: [
                //         'vue-loader'
                //     ]
                // }
            ]
        },
        optimization: {
            splitChunks: false
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./public/vendor/vendor-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, './public/vendor/vendor.dll.js'),
                publicPath: '/vendor',
                outputPath: '/vendor'
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                templateParameters: {
                    BASE_URL: `./`
                },
                filename: 'entry1.html', // 此处新增
                inject: 'body',
                chunks: ['lib_remote','qiankunmain', 'outpNurse','main'],
                chunksSortMode: "manual"
                // url: BASE_URL,  //需要这里传参
            }),
            // new VueLoaderPlugin(),
            // new CleanWebpackPlugin(),
            // new ModuleFederationPlugin({
            //     name: 'main_app',
            //     filename: 'remoteEntry.js',
            //     remotes: {
            //         lib_remote: `lib_remote@${remoteUrl}/remoteEntry.js`
            //     },
            //     shared: {
            //         vue: {
            //             eager: true,
            //             singleton: true,
            //         }
            //     }
            // })
        ],
        experiments: {
            topLevelAwait: true, // 此处为新增配置
        }
    }
};