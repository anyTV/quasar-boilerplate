import _ from 'lodash';

/**
 * Helper function for using google api from CDN
 */
export default function GoogleAPIClient(options) {

    /**
     * @param {Object} options - Google API Client options
     * @param {string} options.apiKey - The API Key to use.
     * @param {string} options.clientId - The app's client ID, found and created in the Google Developers Console.
     * @param {string[]} options.discoveryDocs - An array of discovery doc URLs or discovery doc JSON objects.
     * @param {string[]} options.scope - The scopes to request.
     */

    if (window.gapi) {
        return Promise.resolve(window.gapi); // already injected
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
    })
    .then(() => {

        /**
         * Initializes the client to be used with the specified libraries.
         * @return {Promise<any>}
         */

        return new Promise(resolve => {
            window.gapi.client.init(_.pick(options, [
                'apiKey',
                'clientId',
                'discoveryDocs',
                'scope',
            ])).then(resolve);
        });
    });
}
