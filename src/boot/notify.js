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
 * You will need to translate manually if it is interpolated
 */

export default boot(({ app }) => {

    Notify.setDefaults({
        position: config.NOTIFY_POSITION,
        timeout: 5000,
        textColor: 'white',
    });
    console.log('APP:', app);

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
