'use strict';

import { Notify } from 'quasar';
import config from 'src/config';

const closeBtn = '✖';

/**
 * Usage for notify plugin
 *
 * Add to quasar.conf.js
 *  plugins: ['notify]
 *
 * @example
 * this.$notify.success('successfully-created');
 */

export default ({ app, Vue }) => {

    Notify.setDefaults({
        position: config.NOTIFY_POSITION,
        timeout: 5000,
        textColor: 'white',
    });

    const notifyHandlers = {
        success: (message) => Notify.create({
            color: 'positive',
            message: app.i18n.i18next.t(message),
            closeBtn
        }),
        error: (message) => Notify.create({
            color: 'negative',
            message: app.i18n.i18next.t(message),
            closeBtn
        }),
        warning: (message) => Notify.create({
            color: 'warning',
            message: app.i18n.i18next.t(message),
            closeBtn
        }),
        info: (message) => Notify.create({
            color: 'info',
            message: app.i18n.i18next.t(message),
            closeBtn
        }),
    };

    Object.defineProperties(Vue.prototype, {
        $notify: {
            get() {
                return notifyHandlers;
            }
        }
    });
};
