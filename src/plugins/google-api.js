import _ from 'lodash';

import googleAPIConfig from 'config/google-api';
import GoogleAPIClient from 'helpers/google-api-client';

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
