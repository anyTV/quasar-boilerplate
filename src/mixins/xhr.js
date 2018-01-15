import axios from 'axios';
import qs from 'qs';

import config from 'src/config';

export default function (options = null) {

    const defaultConfig = {
        baseURL: config.server.baseURL,
        paramsSerializer(params) {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        },
    };

    return {
        data() {
            return {
                xhr: axios.create(options || defaultConfig)
            };
        }
    };
}
