import { createGtm } from '@gtm-support/vue-gtm';

import config from 'src/config';

export default ({ app }) => app.use(createGtm(config.GTM_CONFIG));
