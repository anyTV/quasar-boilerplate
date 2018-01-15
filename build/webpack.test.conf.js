const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssUtils = require('./css-utils');
const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: cssUtils
            .styleRules({
                sourceMap: true,
                postcss: true
            })
            .concat([{
                test: /\.html$/,
                loader: 'html-loader'
            }])
    },
    // use inline sourcemap for karma-sourcemap-loader
    devtool: '#inline-source-map',
    resolveLoader: {
        alias: {
            /**
             * Necessary to to make lang="scss" work when using vue-loader's ?inject option
             * The issue with this is that lang="scss" actually needs to use sass-loader,
             * so when it goes to load it can't find scss-loader as that is not a loader available.
             * see discussion at https://github.com/vuejs/vue-loader/issues/724
             * for more info: https://webpack.github.io/docs/loaders.html
             */
            'scss-loader': 'sass-loader'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/env/test')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
