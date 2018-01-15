const path = require('path');
const config = require('../config');
const cssUtils = require('./css-utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const fsUtils = require('./fs-utils');

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: cssUtils.styleRules({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            postcss: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: config.build.productionSourceMap,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            serviceWorkerLoader: `<script>${fsUtils.loadMinified(path.join(__dirname,
                './service-worker-prod.js'))}</script>`
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    (
                        module.resource.indexOf('quasar') > -1 ||
                        module.resource.indexOf(
                            path.join(__dirname, '../node_modules')
                        ) === 0
                    )
                );
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/statics'),
                to: 'statics',
                ignore: ['.*']
            }
        ]),
        // service worker caching
        new SWPrecacheWebpackPlugin({
            cacheId: 'my-quasar-app',
            filename: 'service-worker.js',
            staticFileGlobs: ['dist/**/*.{js,html,css,woff,ttf,eof,woff2,json,svg,gif,jpg,png,mp3}'],
            minify: true,
            stripPrefix: 'dist/'
        })
    ]
});