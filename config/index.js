/**
 * This file should only contain build time configurations.
 * Runtime configurations should be placed in /src/config.
 */
const env = process.env.NODE_ENV || 'development';
const envConfig = require(`./env/${env}`);
// const {  } = require('./utils');


module.exports = {
  env: envConfig,
};
