const { stringifyConfig } = require('../../../build/config-utils');

module.exports = stringifyConfig({
    NODE_ENV: 'test'
});
