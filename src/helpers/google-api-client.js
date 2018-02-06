import _ from 'lodash';

/**
 * Helper class for using google api from CDN
 */
export default class GoogleAPIClient {

    /**
     * Creates GoogleAPIClient instance
     * @param {Object} options - Google API Client options
     * @param {string} options.apiKey - The API Key to use.
     * @param {string} options.clientId - The app's client ID, found and created in the Google Developers Console.
     * @param {string[]} options.discoveryDocs - An array of discovery doc URLs or discovery doc JSON objects.
     * @param {string[]} options.scope - The scopes to request.
     */
    constructor(options) {
        this._options = options;
    }

    /**
     * Injects google api script from cdn
     * @param {Object} param
     * @param {string} param.clientURL - The CDN for the google api client to be used.
     * @param {string} param.libraries - Google API client libraries to be loaded.
     * @return {Promise<any>}
     */
    static load({ clientURL = '', libraries = '' }) {

        if (window.gapi) {
            return Promise.resolve(); // already injected
        }

        const callback = '__googleAPIOnLoadCallback';
        const src = clientURL;
        // need to wrap to a native promise object since google has its own goog.Thenable
        return new Promise(resolve => {

            window[callback] = () => window.gapi.load(libraries, resolve);

            const script = document.createElement('script');

            script.src = src;
            script.async = true;
            script.defer = true;
            script.onload = window[callback];
            script.onreadystatechange = () => {
                if (script.readyState && /loaded|complete/.test(script.readyState)) {
                    window[callback]();
                }
            };

            document.body.appendChild(script);
        });
    }

    /**
     * Initializes the client to be used with the specified libraries.
     * @return {Promise<any>}
     */
    init() {
        return new Promise(resolve => {
            window.gapi.client.init(_.pick(this._options, [
                'apiKey',
                'clientId',
                'discoveryDocs',
                'scope',
            ])).then(resolve);
        });
    }

    /**
     * Set if client requests for offline access
     * @param {boolean} offlineAccess - request offline access
     */
    grantOfflineAccess(offlineAccess = true) {
        this._offlineAccess = offlineAccess;
    }

    /**
     * Request for google sign in.
     * @return {Promise<Object, Error>}
     */
    signIn() {
        return new Promise((resolve, reject) => {

            if (this._offlineAccess) {
                return window.gapi.auth2
                    .getAuthInstance()
                    .grantOfflineAccess()
                    .then(resolve, reject);
            }

            return window.gapi.auth2
                .getAuthInstance()
                .signIn()
                .then(resolve, reject);
        });
    }

    /**
     * Request for google sign out.
     * @return {Promise<Object, Error>}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            return window.gapi.auth2
                .getAuthInstance()
                .signOut()
                .then(resolve, reject);
        });
    }

    /**
     * Attach a div as click handler for google sign in prompt
     * @return {Promise<Object, Error>}
     */
    attachClickHandler() {
        window.gapi.auth2.getAuthInstance().attachClickHandler(...arguments);
    }
}
