const path = require('path');

const { stringifyConfig } = require('../../../build/config-utils');
const { loadTranslationResources, loadAvailableLanguages } = require('../../../build/fs-utils');

const languageResourcesPath = path.resolve(__dirname, '../../../resources/lang/');
const lookupKey = 'lang';

module.exports = stringifyConfig({
    NODE_ENV: 'test',
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
