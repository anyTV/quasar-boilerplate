
/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import { register } from 'register-service-worker';


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
        window.location.reload();
    },
    // offline() {
    //     console.log('No internet connection found. App is running in offline mode.');
    // },
    // error(err) {
    //     console.error('Error during service worker registration:', err);
    // }
});
