'use strict';

const uuid = require('uuid/v1');
const { stringifyConfig } = require('../build/config-utils');


const translation = {
    baseURL: 'https://api-translations.freedom.tm/content_id_frontend/latest',
    paths: {
        get_available_locales: '/languages',
        fetch_locale: '/translations?download=false&lang={{lng}}'
    },
    bustString: `bust=${uuid()}`
};


module.exports = stringifyConfig({
    TRANSLATION: {
        get_available_locales_url: `${translation.baseURL}${translation.paths.get_available_locales}?${translation.bustString}`,
        fetch_locale_url: `${translation.base_url}${translation.paths.fetch_locale}&${translation.bustString}`
    }
});
