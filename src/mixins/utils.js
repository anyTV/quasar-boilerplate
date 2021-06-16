'use strict';

import _ from 'lodash';
import pageConfig from 'src/config/pagination';
import transformKeys from 'src/mixins/transform-keys';

export const keysToCamelCase = transformKeys('camelCase');
export const keysToSnakeCase = transformKeys('snakeCase');

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
        keysToCamelCase,
        keysToSnakeCase,
        getTableColumns (columns) {
            return columns.map(col => {
                return {
                    ...col,
                    field: _.snakeCase(col.name),
                    label: this.$trans(_.snakeCase(col.name)),
                    align: _.get(col,'align', 'left'),
                    sortable: _.get(col,'sortable', true)
                };
            });
        },
        setPaginationOptions (response) {
            return {
                ...pageConfig.default,
                page: parseInt(_.get(response, 'data.page')),
                rowsPerPage: _.get(response, 'data.perPage'),
                rowsNumber: _.get(response, 'data.total'),
                pageMax: Math.ceil(response.data.total / response.data.perPage),
            };
        },
    }
};
