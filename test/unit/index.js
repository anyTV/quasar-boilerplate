require('jsdom-global')();

import Vue from 'vue';
import Quasar from 'quasar';


Vue.config.productionTip = false;

Vue.use(Quasar);

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all files to be subjected under code coverage.
const srcContext = require.context(
    'src',
    true,
    /^\.\/((?!(main|router)(\.js)?$|data\/|config\/|statics\/|assets\/))/
);
srcContext.keys().forEach(srcContext);
