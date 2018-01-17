const uuid = require('uuid/v1');

const { stringifyConfig } = require('../../../build/config-utils');

const translation = {
    baseURL: 'https://api-translations.freedom.tm',
    paths: {
        getAvailableLocalesURL: '/languages',
        fetchLocaleURL: '/translations?download=false&lang={{lng}}'
    },
    bustString: `bust=${uuid()}`
};
const translationServer = {
    getAvailableLocalesURL: `${translation.baseURL}${translation.paths.getAvailableLocalesURL}?${translation.bustString}`,
    fetchLocaleURL: `${translation.baseURL}${translation.paths.fetchLocaleURL}&${translation.bustString}`,
};
const lookupKey = 'lang';

module.exports = stringifyConfig({
    NODE_ENV: 'production',
    SERVERS: {
        translation: translationServer
    },
    I18NEXT: {
        // i18next options
        preload: ['en'],
        fallbackLng: 'en',
        ns: [
            'index', // files within a language directory
        ],
        defaultNS: 'index',
        initImmediate: false, // set to false to prevent displaying keys while rendering the page
        debug: false,

        // i18next-xhr-backend options
        backend: {
            loadPath: translationServer.fetchLocaleURL,
            crossDomain: true
        },

        // i18next-browser-languagedetector options
        detection: {
            order: ['querystring', 'localStorage', 'cookie', 'navigator'],
            lookupQuerystring: lookupKey,
            lookupCookie: lookupKey,
            lookupLocalStorage: lookupKey,
            caches: ['localStorage', 'cookie']
        }
    },
});
