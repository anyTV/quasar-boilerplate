import VueGtm from 'vue-gtm';

import config from 'src/config';

export default ({ Vue }) => Vue.use(VueGtm, config.GTM_CONFIG);
