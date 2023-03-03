import { boot } from 'quasar/wrappers';
import GoogleAPIClient from 'src/helpers/google-api-client';
import google_api_config from 'src/config/google-api';

export default boot(async ({ app }) => {
    const client = await GoogleAPIClient(google_api_config);

    app.config.globalProperties.$google_api = client;
});
