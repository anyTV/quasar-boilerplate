import JWT from 'src/helpers/jwt';
import config from 'src/config';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    const jwt = new JWT(config.JWT_STORAGE_KEY);
    app.config.globalProperties.$jwt = jwt;
});
