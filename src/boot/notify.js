'use strict';

import { i18n } from 'src/boot/vue-i18next';
import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';
import config from 'src/config';

const trans = i18n.global.t;

const closeBtn = '✖';

Notify.setDefaults({
    position: config.NOTIFY_POSITION,
    timeout: 5000,
    textColor: 'white',
});

const notify = {
    success: (message) => Notify.create({
        color: 'positive',
        message: trans(message),
        closeBtn
    }),
    error: (message) => Notify.create({
        color: 'negative',
        message: trans(message),
        closeBtn
    }),
    warning: (message) => Notify.create({
        color: 'warning',
        message: trans(message),
        closeBtn
    }),
    info: (message) => Notify.create({
        color: 'info',
        message: trans(message),
        closeBtn
    }),
};

/**
 * Usage for notify plugin
 *
 * Add to quasar.conf.js
 *  plugins: ['notify]
 *
 * @example
 * this.$notify.success('successfully-created');
 */

export default boot(({ app }) => {
    app.config.globalProperties.$notify = notify;
});

export { notify };
