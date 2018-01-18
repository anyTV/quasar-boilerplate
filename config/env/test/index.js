const path = require('path');

const { stringifyConfig } = require('../../../build/config-utils');
const { loadTranslationResources, loadAvailableLanguages } = require('../../../build/fs-utils');

const languageResourcesPath = path.resolve(__dirname, '../../../resources/lang/');
const translation = {
    baseURL: '',
    paths: {
        getAvailableLocalesURL: '',
        fetchLocaleURL: ''
    },
    bustString: ''
};
const translationServer = {
    getAvailableLocalesURL: `${translation.baseURL}${translation.paths.getAvailableLocalesURL}?${translation.bustString}`,
    fetchLocaleURL: `${translation.baseURL}${translation.paths.fetchLocaleURL}&${translation.bustString}`,
};
const lookupKey = 'lang';

module.exports = stringifyConfig({
    NODE_ENV: 'test',
    SERVERS: {
        translation: translationServer
    },
    TRANSLATION: {
        availableLanguages: loadAvailableLanguages(languageResourcesPath)
    },
    I18NEXT: {
        // i18next options
        resources: loadTranslationResources(languageResourcesPath),
        lng: 'en',
        preload: ['en'],
        fallbackLng: 'en',
        ns: [
            'index', // files within a language directory
        ],
        defaultNS: 'index',
        initImmediate: false, // set to false to prevent displaying keys while rendering the page
        debug: true,

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
