module.exports = {
    NODE_ENV: 'development',
    GOOGLE_ANALYTICS_ID: 'UA-CHANGE-X',
    // change this to the url of your backend
    SERVER_URL: 'https://jsonplaceholder.typicode.com/',
    GOOGLE_CLIENT_ID: '',

    // where this should be deployed
    APP_URL: 'https://localhost:8080',

    AUTH_SERVER: {
        BASE_URL: '',
        ENDPOINTS: {
            LOGIN: '/oauth/authorize',
            LOGOUT: '/logout',
            ACCESS_TOKEN: '/oauth/access_token'
        },
        OAUTH: {
            CLIENT_ID: '',
            CLIENT_NAME: '',
            REDIRECT_URL: 'https://localhost:8080/sso/callback',
        }
    },
};
