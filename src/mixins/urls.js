'use strict';

const app_url = process.env.APP_URL;
const auth_server = process.env.AUTH_SERVER;

export default {
    data() {
        return {
            loginUrl: `${auth_server.BASE_URL}${auth_server.ENDPOINTS.LOGIN}?client_id=${auth_server.OAUTH.CLIENT_ID}&redirect_uri=${encodeURIComponent(auth_server.OAUTH.REDIRECT_URL)}&response_type=code`,
            logoutUrl: `${auth_server.BASE_URL}${auth_server.ENDPOINTS.LOGOUT}?redirect=${app_url}`,
        };
    }
};
