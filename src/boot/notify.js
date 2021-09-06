'use strict';
import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar';
import config from 'src/config';

const closeBtn = '✖';

/**
 * Usage for notify plugin
 *
 * Add to quasar.conf.js
 *  plugins: ['notify']
 *
 * @example
 * this.$notify.success('successfully-created');
 * 
 * @notes
 * This will only utilize $t
 * 
 * For interpolations, you will need to translate manually if it is interpolated
 * on i18n json
 *   hello_name: 'Hello {{ name }}
 * on component
 *   this.$notify.success($trans({key: 'hello_name', data: { name: 'John Doe' });
 */

export default boot(({ app }) => {

    Notify.setDefaults({
        position: config.NOTIFY_POSITION,
        timeout: 5000,
        textColor: 'white',
    });

    const notifyHandlers = {
        success: (message) => Notify.create({
            color: 'positive',
            message: app.config.globalProperties.$t(message),
            closeBtn
        }),
        error: (message) => Notify.create({
            color: 'negative',
            message: app.config.globalProperties.$t(message),
            closeBtn
        }),
        warning: (message) => Notify.create({
            color: 'warning',
            message: app.config.globalProperties.$t(message),
            closeBtn
        }),
        info: (message) => Notify.create({
            color: 'info',
            message: app.config.globalProperties.$t(message),
            closeBtn
        }),
    };

    app.config.globalProperties.$notify = notifyHandlers;
});
