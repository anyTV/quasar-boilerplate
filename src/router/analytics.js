import {uid, LocalStorage} from 'quasar';

import config from 'src/config';

export default {

    getSessionId,

    /**
     * @return {string}
     */
    createSessionId () {
        const gtmId = getSessionId() || uid();

        LocalStorage.set(config.GTM_LOCALSTORAGE_SESSION_KEY, gtmId);

        return gtmId;
    }
};

/**
 * @return {string}
 */
function getSessionId () {
    return LocalStorage.getItem(config.GTM_LOCALSTORAGE_SESSION_KEY);
}
