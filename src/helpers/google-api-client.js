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
        this._apiKey = options.apiKey;
        this._clientId = options.clientId;
        this._discoveryDocs = options.discoveryDocs;
        this._scope = options.scope.join(' ');
        this._libraries = ['client', 'auth2'];
    }

    /**
     * Injects google api script from cdn
     * @param {string} clientURL - The CDN for the google api client to be used.
     * @return {Promise<any>}
     */
    static load(clientURL = 'https://apis.google.com/js/api.js') {

        if (window.gapi) {
            return Promise.resolve(); // already injected
        }

        const callback = '__googleAPIOnLoadCallback';
        const src = clientURL;
        // need to wrap to a native promise object since google has its own goog.Thenable
        return new Promise(resolve => {

            window[callback] = () => resolve();

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
     * @param {string[]} libraries - Google libraries
     * @return {Promise<any>}
     */
    init(libraries = []) {
        return GoogleAPIClient.load().then(() => {
            return new Promise(resolve => {
                window.gapi.load(this._libraries.concat(libraries).join(':'), resolve);
            }).then(() => {
                return new Promise(resolve => {
                    window.gapi.client.init({
                        apiKey: this._apiKey,
                        client_id: this._clientId,
                        discoveryDocs: this._discoveryDocs,
                        scope: this._scope
                    }).then(resolve);
                });
            });
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

        GoogleAPIClient.__assertAuth2ClientExists();

        if (this._offlineAccess) {
            return new Promise((resolve, reject) => {
                return window.gapi.auth2
                    .getAuthInstance()
                    .grantOfflineAccess({ prompt: 'select_account' })
                    .then(resolve, reject);
            });
        }

        return new Promise((resolve, reject) => {
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

        GoogleAPIClient.__assertAuth2ClientExists();

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

        GoogleAPIClient.__assertAuth2ClientExists();

        window.gapi.auth2.getAuthInstance().attachClickHandler(...arguments);
    }

    // private properties __
    /**
     * Check if google api script has been loaded and client has been initialized.
     * @throws Error
     */
    static __assertAuth2ClientExists() {
        if (!(window.gapi && window.gapi.auth2)) {
            throw new Error('Auth2 client is not initialized. Perhaps you forgot to call init().');
        }
    }
}
