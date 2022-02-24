'use strict';

import _ from 'lodash';
import moment from 'moment';
import pageConfig from 'src/config/pagination';
import config from 'src/config';

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

export function humanizedDate(date, format = config.date.formats.FULL_DATE) {
    return date ? moment.utc(date).local().format(format) : '';
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
