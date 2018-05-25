const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const pkg = require('./package');

// Configuration for your app
module.exports = function (ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: [
            /**
             * Enable only the plugins that your app is going to use.
             */
            'axios',
            'google-api',
            'jwt',
            'vue-analytics',
            'vue-i18next',
            'vuelidate',
        ],
        css: [
            'app.styl'
        ],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons',
            ctx.theme.ios ? 'ionicons' : null,
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: true,
        build: {
            // gzip: true, // use if deployment server does not have gzip by default
            scopeHoisting: true,
            vueRouterMode: 'history',
            publicPath: '/',
            analyze: process.env.ANALYZE,
            devtool: 'source-map',
            env: config.env,
            extendWebpack(cfg) {
                cfg.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules|quasar)/
                });

                cfg.resolve.alias = {
                    ...cfg.resolve.alias,
                    // add custom aliases below
                    '@': path.resolve(__dirname, './src/components'),
                };

                // ignore moment locales
                cfg.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
            }
        },
        devServer: {
            https: true,
            port: 8080,
            open: true, // opens browser window automatically
            // proxy: {
            //     '/api': {
            //         target: '',
            //         changeOrigin: true,
            //         pathRewrite: {
            //             '^/api': ''
            //         }
            //     }
            // }
        },
        framework: 'all',
        // --- includes everything; for dev only!
        // framework: {
        //     components: [],
        //     directives: [],
        //     // Quasar plugins
        //     plugins: []
        // },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa: {
            // workboxPluginMode: 'InjectManifest',
            // workboxOptions: {},
            manifest: {
                name: pkg.productName,
                short_name: pkg.name,
                description: pkg.description,
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [
                    {
                        'src': 'statics/icons/icon-128x128.png',
                        'sizes': '128x128',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-256x256.png',
                        'sizes': '256x256',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-384x384.png',
                        'sizes': '384x384',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-512x512.png',
                        'sizes': '512x512',
                        'type': 'image/png'
                    }
                ]
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            // bundler: 'builder', // or 'packager'
            extendWebpack(cfg) {
                // do something with Electron process Webpack cfg
            },
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Window only
                // win32metadata: { ... }
            },
            builder: {
                // https://www.electron.build/configuration/configuration

                // appId: 'quasar-app'
            }
        }
    };
};
