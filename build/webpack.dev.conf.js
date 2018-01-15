const fs = require('fs');
const path = require('path');
const config = require('../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cssUtils = require('./css-utils');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/hot-reload.js', baseWebpackConfig.entry[name]];
});

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    module: {
        rules: cssUtils.styleRules({
            sourceMap: config.dev.cssSourceMap,
            postcss: true
        })
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
                './service-worker-dev.js'), 'utf-8')}</script>`
        }),
        new FriendlyErrorsPlugin({
            clearConsole: config.dev.clearConsoleOnRebuild
        })
    ]
});
