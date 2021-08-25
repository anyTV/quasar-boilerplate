import VueGtm from 'vue-gtm';

import config from 'src/config';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => app.use(VueGtm, config.GTM_CONFIG));
