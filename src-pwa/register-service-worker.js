
/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import { register } from 'register-service-worker';
import { Notify } from 'quasar';
import config from 'src/config';


// Just enable the consoles for debugging purposes
// or add /* eslint-disable */ here to build without no-console errors
register(process.env.SERVICE_WORKER_FILE, {
    // ready() {
    //     console.log('App is being served from cache by a service worker.');
    // },
    // cached() {
    //     console.log('Content has been cached for offline use.');
    // },
    updated() {
        Notify.create({
            color: 'info',
            message: 'A new version of <your-app> is available.',
            actions: [{
                label: 'Refresh page',
                color: 'white',
                handler: () => {
                    window.location.reload();
                }
            }],
            position: config.NOTIFY_POSITION,
            timeout: 0
        });
    },
    // offline() {
    //     console.log('No internet connection found. App is running in offline mode.');
    // },
    // error(err) {
    //     console.error('Error during service worker registration:', err);
    // }
});
