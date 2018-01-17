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
const WebpackMd5Hash = require('webpack-md5-hash');
const fsUtils = require('./fs-utils');
const pkg = require('../package.json');

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
            title: config.appTitle,
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
            serviceWorkerLoader: `
                <script>${fsUtils.loadMinified(path.join(__dirname, './service-worker-prod.js'))}</script>`,
            googleAnalyticsScript: `
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-46773919-28"></script>
                <script>${fsUtils.loadMinified(path.join(__dirname, './google-analytics.js'))}</script>`,
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
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
        // Webpack has a bug wherein chunkhash does not always generate unique hash
        // https://github.com/webpack/webpack/issues/1155
        new WebpackMd5Hash(),
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
            cacheId: pkg.name,
            filename: 'service-worker.js',
            staticFileGlobs: ['dist/**/*.{js,html,css,woff,ttf,eof,woff2,json,svg,gif,jpg,png,mp3}'],
            minify: true,
            stripPrefix: 'dist/'
        }),
    ]
});
