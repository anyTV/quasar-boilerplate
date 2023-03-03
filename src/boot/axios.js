import { boot } from 'quasar/wrappers';
import axiosHelper from 'src/helpers/axios';

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axiosHelper;
});
