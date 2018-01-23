import _ from 'lodash';
import axios from 'axios';
import config from 'src/config';
import qs from 'qs';

const defaultConfig = {
    baseURL: config.server.baseURL,
    paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
    },
};

/**
 * Usage:
 * ```
 * import AxiosPlugin from 'src/plugins/axios-plugin';
 * Vue.use(AxiosPlugin); // defaultConfig will be merged with axios defaults
 * Vue.use(AxiosPlugin, options); // options will be merged to defaultConfig and axios defaults
 * ```
 * Default instance is available through:
 * - this.$http
 * - this.axios
 *
 * Creating new axios instance:
 * ```
 * const otherResourceXHR = this.axios.create(options);
 * ```
 */
const AxiosPlugin = {
    install(Vue, options) {

        _.merge(axios.defaults, defaultConfig, options);

        Vue.axios = axios;

        Object.defineProperties(Vue.prototype, {
            axios: {
                get() {
                    return axios;
                }
            },
            $http: {
                get() {
                    return axios;
                }
            }
        });
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(AxiosPlugin);
}

export default AxiosPlugin;
