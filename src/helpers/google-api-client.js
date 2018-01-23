export default class GoogleAPIClient {

    constructor(options) {
        this._apiKey = options.apiKey;
        this._clientId = options.clientId;
        this._discoveryDocs = options.discoveryDocs;
        this._scope = options.scope.join(' ');
        this._libraries = ['client', 'auth2'];
    }

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

    grantOfflineAccess(offlineAccess = true) {
        this._offlineAccess = offlineAccess;
    }

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

    signOut() {

        GoogleAPIClient.__assertAuth2ClientExists();

        return new Promise((resolve, reject) => {
            return window.gapi.auth2
                .getAuthInstance()
                .signOut()
                .then(resolve, reject);
        });
    }

    attachClickHandler() {

        GoogleAPIClient.__assertAuth2ClientExists();

        window.gapi.auth2.getAuthInstance().attachClickHandler(...arguments);
    }

    // private properties __
    static __assertAuth2ClientExists() {
        if (!(window.gapi && window.gapi.auth2)) {
            throw new Error('Auth2 client is not initialized. Perhaps you forgot to call init().');
        }
    }
}
