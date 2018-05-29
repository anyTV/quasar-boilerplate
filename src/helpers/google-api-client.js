import { pick } from 'lodash-es';

/**
 * Helper function for using google api from CDN
 * @param {Object} options - Google API Client options
 * @param {string} options.apiKey - The API Key to use.
 * @param {string} options.clientId - The app's client ID, found and created in the Google Developers Console.
 * @param {string[]} options.discoveryDocs - An array of discovery doc URLs or discovery doc JSON objects.
 * @param {string[]} options.scope - The scopes to request.
 * @return {Promise<any>}
 */
export default function GoogleAPIClient(options) {

    if (window.gapi) {
        return Promise.resolve(window.gapi); // already injected
    }

    if (!options.clientId) {
        throw new Error('Google Client ID is required. You can set it in config/env/<env>/index.js');
    }

    const callback = '__googleAPIOnLoadCallback';
    const src = options.clientURL;
    // need to wrap to a native promise object since google has its own goog.Thenable
    return new Promise(resolve => {

        window[callback] = () => window.gapi.load(options.libraries, resolve);

        const script = document.createElement('script');

        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = window[callback];
        script.onreadystatechange = () => {
            let scriptIsLoadedOrCompleted = /loaded|complete/.test(script.readyState);

            if (script.readyState && scriptIsLoadedOrCompleted) {
                window[callback]();
            }
        };

        document.body.appendChild(script);
    }).then(() => {
        return new Promise(resolve => {
            window.gapi.client
                .init(pick(options, [
                    'apiKey',
                    'clientId',
                    'discoveryDocs',
                    'scope',
                ]))
                .then(() => resolve(window.gapi));
        });
    });
}
