'use strict';

import _ from 'lodash';
import pageConfig from 'src/config/pagination';

export function arrayToOptions(inputArray, prefix = null) {
    return _.map(inputArray, value => ({
        value,
        label: valueToLabel(value, prefix)
    }));
}


export function valueToLabel(value, prefix = '') {
    if (prefix instanceof Array && prefix.length) {
        prefix = `${prefix.join('-')}-`;
    }
    else {
        prefix = prefix ? `${prefix}-` : '';
    }

    return `${prefix}${_.kebabCase(value)}`;
}

export default {
    data() {
        return {
            utils: {
                arrayToOptions,
                valueToLabel,
            },
        };
    },
    methods: {
        setPaginationOptions (response) {
            return {
                ...pageConfig.default,
                page: parseInt(_.get(response, 'data.page')),
                perPage: _.get(response, 'data.perPage'),
                total: _.get(response, 'data.total'),
                pageMax: Math.ceil(response.data.total / response.data.perPage),
            };
        },
    }
};
