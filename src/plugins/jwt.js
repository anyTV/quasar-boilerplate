import JWT from 'src/helpers/jwt';

import config from 'config';

/**
 * Plugin for injecting axios globally as default $http resource
 * @example
 * import JWTPlugin from 'src/plugins/jwt';
 * ...
 * Vue.use(JWTPlugin);
 * @example
 * // In a component you can use it like:
 * this.$jwt.decode(...);
 * Vue.jwt.decode(...);
 */
const JWTPlugin = {
    install(Vue) {

        const jwt = new JWT(config.ACCESS_TOKEN_KEY);

        Vue.jwt = jwt;

        Object.defineProperties(Vue.prototype, {
            $jwt: {
                get() {
                    return jwt;
                }
            }
        });
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(JWTPlugin);
}

export default JWTPlugin;
