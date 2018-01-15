require('colors');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const env = require('./env-utils');
const config = require('../config');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const app = express();
const port = process.env.PORT || config.dev.port;
const uri = 'http://localhost:' + port;

console.log(' Starting dev server with "' + (process.argv[2] || env.platform.theme).bold + '" theme...');
console.log(' Will listen at ' + uri.bold);
if (config.dev.openBrowser) {
    console.log(' Browser will open when build is ready.\n');
}

const compiler = webpack(webpackConfig);

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: function () {
    }
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// proxy requests like API. See /config/index.js -> dev.proxyTable
// https://github.com/chimurai/http-proxy-middleware
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticsPath = path.posix.join(webpackConfig.output.publicPath, 'statics/');
app.use(staticsPath, express.static('./src/statics'));

// try to serve Cordova statics for Play App
app.use(express.static(env.platform.cordovaAssets));

console.log('> Starting server...');
const ready = new Promise(function (resolve) {
    devMiddleware.waitUntilValid(function () {
        console.log('> Listening at ' + uri + '\n');
        // open only on dev env
        if (config.dev.openBrowser && process.env.NODE_ENV === 'development') {
            opn(uri);
        }

        resolve();
    });
});

const server = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

module.exports = {
    server,
    ready,
    close: function () {
        server.close();
    }
};
