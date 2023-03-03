import _ from 'lodash';
import axios from 'axios';
import { boot } from 'quasar/wrappers';
import { stringify } from 'qs';

import config from 'src/config';
import index from 'src/router';
import { jwt } from 'src/boot/jwt';

const apiConfig = {
    baseURL: config.API.BASE_URL,
    paramsSerializer: {
        serialize: (params) =>  stringify(params, { arrayFormat: 'brackets' })
    }
};

const $submit = async (method, endpoint, payload = null) => {

    try {
        const api = axios.create({
            headers: { 'Access-Token': jwt.getToken() },
            ...apiConfig
        });

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

const api = {
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
    },

    async get_albums() {
        return $submit('get', config.API.ALBUMS.GET);
    },

    async post_album(params) {
        return $submit('post', config.API.ALBUMS.POST, params);
    },

    async get_images(params) {
        return $submit('get', config.API.IMAGE.GET, { params });
    },

    async add_image(params) {
        return $submit('post', config.API.IMAGE.POST, params);
    },

    async get_directory_and_access(params) {
        return $submit('get', config.API.ALBUMS.GET_DIRECTORY_ACCESS, {
            params,
        });
    },
};

/**
 * Plugin for injecting axios globally as $api resource
 * @example
 * // In a component you can use it like:
 * this.$api.post(...);
 */
export default boot(({ app }) => {
    app.config.globalProperties.$api = api;
});

export { api };
