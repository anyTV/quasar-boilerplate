const merge = require('webpack-merge');
const baseConfig = require('../../base');
const { stringifyConfig } = require('../../../build/config-utils');

module.exports = merge(
    baseConfig,
    stringifyConfig({
        NODE_ENV: 'development'
    })
);
