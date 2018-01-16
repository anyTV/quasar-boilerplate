'use strict';

const _ = require('lodash');

/**
 * Stringifies all string values nested inside config object.
 * - If the value is a string it will be used as a code fragment.
 * - If the value isn't a string, it will be stringified (including functions).
 * - If the value is an object all keys are defined the same way.
 * - If you prefix typeof to the key, it's only defined for typeof calls.
 * https://webpack.js.org/plugins/define-plugin/#usage
 * @param config
 * @returns {Object}
 */
function stringifyConfig(config) {
    return _.mapValues(config, value => {
        if (_.isObject(value)) {
            return stringifyConfig(value);
        }

        return _.isString(value) ? JSON.stringify(value) : value;
    });
}

module.exports = {
    stringifyConfig
};
