import _ from 'lodash';
import axios from 'axios';
import config from 'src/config';
import index from 'src/router';
import qs from 'qs';

/**
 * Plugin for injecting axios globally as $adminAPI resource
 * @example
 * // In a component you can use it like:
 * this.$adminAPI.post(...);
 */
export default ({ app }) => {

    const apiConfig = {
        baseURL: config.API.BASE_URL,
        paramsSerializer(params) {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        }
    };

    const $submit = async (method, endpoint, payload = null) => {

        try {
            const api = axios.create(_.defaults({
                headers: { 'Access-Token': Vue.jwt.getToken() }
            }, apiConfig));

            let response = await api[_.toLower(method)](endpoint, payload);

            return {
                httpStatus: {
                    code: response.status,
                    text: response.statusText
                },
                metadata: _.omit(response.data, ['data']),
                data: _.cloneDeep(response.data.data)
            };
        }
        catch (error) {
            // general handler for when error is not from axios (i.e. no response prop)
            if (!error.response || error.response.status >= 500) {
                throw {
                    error: 'server_error_notice',
                    message: 'server_error_notice'
                };
            }

            if (error.response.data.code === 'UNAUTH') {
                index.push({
                    name: 'home',
                    params: {
                        errorCode: error.response.data.code
                    }
                });

                throw {
                    message: 'session-expired-relogin-prompt'
                };
            }

            throw {
                httpStatus: {
                    code: error.response.status,
                    text: error.response.statusText
                },
                code: error.response.data.code,
                message: error.response.data.message,
                error: error.response.data.error,
            };
        }
    };

    const adminAPI = {
        $get: (endpoint, payload = null) => {
            return $submit('get', endpoint, payload);
        },
        $post: (endpoint, payload = null) => {
            return $submit('post', endpoint, payload);
        },
        $put: (endpoint, payload = null) => {
            return $submit('put', endpoint, payload);
        },
        $patch: (endpoint, payload = null) => {
            return $submit('patch', endpoint, payload);
        },
        $delete: (endpoint, payload = null) => {
            return $submit('delete', endpoint, payload);
        }
    };

    app.config.globalProperties.$adminAPI = adminAPI;
};
