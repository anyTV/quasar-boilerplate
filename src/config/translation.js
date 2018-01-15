const langIdentifier = '';

export default {
    SERVER: process.env.TRANSLATION,

    I18NEXT_CONFIG: {
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
            loadPath: process.env.TRANSLATION.fetch_locale_url,
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
