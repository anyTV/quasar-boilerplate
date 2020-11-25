/**
 * This file should only contain runtime configurations.
 * E.g. plugin config, vue config, static data, etc.
 * Build configurations should be placed in /config directory outside the /src directory.
 */
export default {
    JWT_STORAGE_KEY: 'JWT_STORAGE_KEY',

    GTM_LOCALSTORAGE_SESSION_KEY: 'GTM_SESSION_ID',

    // TODO: replace id with correct GTM ID and remove this comment
    GTM_CONFIG: {
        id: 'GTM-XXYYXXY',
        defer: true,
        enabled: true,
        debug: false,
        trackOnNextTick: false
    }
};
