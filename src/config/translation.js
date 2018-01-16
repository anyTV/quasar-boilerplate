const uuid = require('uuid/v1');

const langIdentifier = '';
const translation = {
    baseURL: 'https://api-translations.freedom.tm',
    paths: {
        getAvailableLocalesURL: '/languages',
        fetchLocaleURL: '/translations?download=false&lang={{lng}}'
    },
    bustString: `bust=${uuid()}`
};
const server = {
    getAvailableLocalesURL: `${translation.baseURL}${translation.paths.getAvailableLocalesURL}?${translation.bustString}`,
    fetchLocaleURL: `${translation.baseURL}${translation.paths.fetchLocaleURL}&${translation.bustString}`,
};

export default {
    server,

    i18nextConfig: {
        // i18next options
        preload: ['en'],
        fallbackLng: 'en',
        ns: [       // files within a language directory
            'index'
        ],
        defaultNS: 'index',
        initImmediate: false,   // set to false to prevent displaying keys while rendering the page
        debug: false,

        // i18next-xhr-backend options
        backend: {
            loadPath: server.fetchLocaleURL,
            crossDomain: true
        },

        // i18next-browser-languagedetector options
        detection: {
            order: ['querystring', 'localStorage', 'cookie', 'navigator'],
            lookupQuerystring: 'lang',  // e.g. ?lang=en
            lookupCookie: langIdentifier,
            lookupLocalStorage: langIdentifier,
            caches: ['localStorage', 'cookie']
        }
    }
};
