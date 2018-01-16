/**
 * @WARNING: production env config should be put to a submodule
 */
const { stringifyConfig } = require('../../../build/config-utils');

module.exports = stringifyConfig({
    NODE_ENV: 'production'
});

