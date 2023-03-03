import { boot } from 'quasar/wrappers'
import JWT from 'src/helpers/jwt';
import config from 'src/config';
import axiosHelper from "src/helpers/axios";
const jwt = new JWT(config.JWT_STORAGE_KEY);

export default boot(({ app }) => {
    app.config.globalProperties.$jwt = jwt;
});

export { jwt };
