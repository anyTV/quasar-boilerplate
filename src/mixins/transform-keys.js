'use strict';

import _ from 'lodash';

function transformKeys(transformer) {

    let transformerFn = transformer;

    if (_.isString(transformerFn)) {
        transformerFn = _[transformer];
    }

    if (!_.isFunction(transformerFn)) {
        throw new Error('Transformer should be a function or a lodash method.');
    }

    return function updateKeys(object) {
        let clone = _.cloneDeep(object);

        if (_.isArray(clone)) {
            return _.map(clone, updateKeys);
        }

        if (!_.isPlainObject(clone)) {
            return clone;
        }

        clone = _.mapKeys(clone, (value, key) => transformerFn(key));

        // recursively update keys
        return _.mapValues(clone, value => {

            if (_.isPlainObject(value)) {
                return updateKeys(value);
            }

            if (_.isArray(value)) {
                return _.map(value, updateKeys);
            }

            return value;
        });
    };
}

export default transformKeys;
