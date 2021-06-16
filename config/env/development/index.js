module.exports = {
  NODE_ENV: 'development',
  GOOGLE_ANALYTICS_ID: 'UA-CHANGE-X',
  SERVER_URL: '',
  GOOGLE_CLIENT_ID: '',

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
