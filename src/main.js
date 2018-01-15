import _ from 'lodash';
import Quasar, { Platform } from 'quasar';
import Vue from 'vue';
import Vuelidate from 'vuelidate';

import router from 'src/router';
import mixins from 'src/mixins';
// Quasar has a known issue in which modal cannot be closed when the modal is open and the page is refreshed.
// This will be fixed in Quasar v0.15 (https://github.com/quasarframework/quasar/issues/994).
// Workaround is to manually set popstate (https://github.com/quasarframework/quasar/issues/823).
Platform.has.popstate = false;

// enable more verbose logs on non-production builds
Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.use(Quasar);
Vue.use(Vuelidate);

// Quasar has a known issue in which CSS import order between "quasar dev" and "quasar build" are not the same,
// thus messing up styles on some components (https://github.com/quasarframework/quasar-template-default/issues/47).
// Workaround is to reorder the imports (https://github.com/tdamsma/quasar-css-import-bug/pull/1/files).
import 'quasar-extras/material-icons';

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`);
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

// Uncomment the following lines if you need IE11/Edge support
require(`quasar/dist/quasar.ie`);
require(`quasar/dist/quasar.ie.${__THEME}.css`);

// Import custom global mixins
_.each(mixins, Vue.mixin.bind(Vue));

/* eslint-disable no-new */
new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
});
