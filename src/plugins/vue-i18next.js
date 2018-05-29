import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextLangDetector from 'i18next-browser-languagedetector';
import VueI18next from '@panter/vue-i18next';
import i18nextConfig from 'src/config/i18next';

export default ({ app, Vue }) => {
    Vue.use(VueI18next);

    i18next.use(i18nextLangDetector);

    if (i18nextConfig.backend) {
        i18next.use(i18nextXHRBackend);
    }

    i18next.init(i18nextConfig);

    app.i18n = new VueI18next(i18next);
};
