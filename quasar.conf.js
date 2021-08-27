const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const pkg = require('./package');

// Configuration for your app
module.exports = function (ctx) {
    return {
        // app boot (/src/boot)
        boot: [
            /**
             * Enable only the plugins that your app is going to use.
             */
            'axios',
            'jwt',
            'notify',
            'admin-api',
            // 'google-api',
            // 'vuelidate',
            'vue-gtm',

            /**
             * if vue-i18next is enabled, we can use directive v-waitForT so translations can be loaded first
             * before rendering the component
             */
            'vue-i18next',
            ctx.mode.capacitor ? 'google-analytics' : '',
        ],
        css: [
            'app.styl'
        ],
        extras: [
            'material-icons',
            // 'mdi-v3',
            // 'fontawesome-v5',
            // 'ionicons-v4'
        ],
        supportIE: true,
        build: {
            chainWebpack (chain) {
                const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
                chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin);
            },
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
                    'lodash': 'lodash-es',
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
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QAvatar',
                'QBadge',
                'QBreadcrumbs',
                'QBreadcrumbsEl',
                'QBtn',
                'QBtnToggle',
                'QFooter',
                'QHeader',
                'QIcon',
                'QImg',
                'QLayout',
                'QList',
                'QPagination',
                'QRadio',
                'QSelect',
                'QSpace',
                'QTab',
                'QTabPanel',
                'QTabPanels',
                'QTable',
                'QTabs',
                'QToggle',
                'QToolbar',
                'QToolbarTitle',
            ],
            directives: [],
            // Quasar plugins
            plugins: [
                'Notify',
                'Loading',
                'LocalStorage',
            ]
        },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa: {
            // workboxPluginMode: 'InjectManifest',
            workboxOptions: {
                skipWaiting: true
            },
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
                        'src': 'icons/icon-128x128.png',
                        'sizes': '128x128',
                        'type': 'image/png'
                    },
                    {
                        'src': 'icons/icon-192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png'
                    },
                    {
                        'src': 'icons/icon-256x256.png',
                        'sizes': '256x256',
                        'type': 'image/png'
                    },
                    {
                        'src': 'icons/icon-384x384.png',
                        'sizes': '384x384',
                        'type': 'image/png'
                    },
                    {
                        'src': 'icons/icon-512x512.png',
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
