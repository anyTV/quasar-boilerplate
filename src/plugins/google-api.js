import _ from 'lodash';

import googleAPIConfig from 'config/google-api';
import GoogleAPIClient from 'helpers/google-api-client';

/**
 * Plugin for injecting google api
 * @example
 * import Vue from 'vue';
 * import GoogleAPIPlugin from 'src/plugins/google-api-plugin';
 * ...
 * Vue.use(GoogleAPIPlugin);
 */
const GoogleAPIPlugin = {
    install(Vue, options) {
        Vue.googleAPI = GoogleAPIClient;

        const instance = new GoogleAPIClient(_.merge(googleAPIConfig, options));

        Object.defineProperties(Vue.prototype, {
            $googleAPI: {
                get() {
                    return instance;
                }
            }
        });
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(GoogleAPIPlugin);
}

export default GoogleAPIPlugin;
