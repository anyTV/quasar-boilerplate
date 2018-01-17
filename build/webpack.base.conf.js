const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const cssUtils = require('./css-utils');
const env = require('./env-utils');
const merge = require('webpack-merge');
const projectRoot = path.resolve(__dirname, '../');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const useCssSourceMap =
    (env.dev && config.dev.cssSourceMap) ||
    (env.prod && config.build.productionSourceMap);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: config[env.prod ? 'build' : 'dev'].publicPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: config.aliases
    },
    module: {
        rules: [
            { // eslint
                enforce: 'pre',
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                include: projectRoot,
                exclude: /node_modules/,
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: cssUtils.postcss,
                    loaders: merge({ js: 'babel-loader' }, cssUtils.styleLoaders({
                        sourceMap: useCssSourceMap,
                        extract: env.prod
                    })),
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config[env.prod ? 'build' : 'dev'].env,
            'DEV': env.dev,
            'PROD': env.prod,
            '__THEME': '"' + env.platform.theme + '"'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: env.prod,
            options: {
                context: path.resolve(__dirname, '../src'),
                postcss: cssUtils.postcss
            }
        }),
        new ProgressBarPlugin({
            format: config.progressFormat
        })
    ],
    performance: {
        hints: false
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
