'use strict';

const app_url = process.env.APP_URL;
const auth_server = process.env.AUTH_SERVER;

console.log('process.env', process.env);
console.log(auth_server);
console.log(auth_server.ENDPOINTS.LOGOUT);
console.log( `${auth_server.BASE_URL}${auth_server.ENDPOINTS.LOGOUT}?redirect=${app_url}`,);

export default {
    data() {
        return {
            loginUrl: `${auth_server.BASE_URL}${auth_server.ENDPOINTS.LOGIN}?client_id=${auth_server.OAUTH.CLIENT_ID}&redirect_uri=${encodeURIComponent(auth_server.OAUTH.REDIRECT_URL)}&response_type=code`,
            logoutUrl: `${auth_server.BASE_URL}${auth_server.ENDPOINTS.LOGOUT}?redirect=${app_url}`,
        };
    }
};
