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
 * ...
 * const googleClient = await this.$googleAPI
 */
const GoogleAPIPlugin = {
    async install(Vue, options) {

        const config = _.defaults(options, googleAPIConfig);

        await GoogleAPIClient.load(config);

        const instance = new GoogleAPIClient(config);

        Vue.googleAPI = instance;

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
