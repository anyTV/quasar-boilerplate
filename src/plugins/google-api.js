import GoogleAPIClient from 'src/helpers/google-api-client';
import googleAPIConfig from 'src/config/google-api';

export default async ({ Vue }) => {
    const client = await GoogleAPIClient(googleAPIConfig);

    Vue.googleAPI = client;

    Object.defineProperties(Vue.prototype, {
        $googleAPI: {
            get() {
                return client;
            },
        },
    });
};
