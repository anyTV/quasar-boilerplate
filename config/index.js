/**
 * This file should only contain build time configurations.
 * Runtime configurations should be placed in /src/config.
 */
const env = process.env.NODE_ENV || 'development';
const envConfig = require(`./env/${env}`);
const { stringifyConfig } = require('./utils');


module.exports = stringifyConfig({
  env: envConfig,
});
