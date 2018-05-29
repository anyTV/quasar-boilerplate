import JWT from 'src/helpers/jwt';
import config from 'src/config';

export default ({ Vue }) => {
    const jwt = new JWT(config.JWT_STORAGE_KEY);

    Vue.jwt = jwt;

    Object.defineProperties(Vue.prototype, {
        $jwt: {
            get() {
                return jwt;
            }
        }
    });
};
