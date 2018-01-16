import Vue from 'vue';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextLangDetector from 'i18next-browser-languagedetector';
import VueI18next from '@panter/vue-i18next';
import translation from 'src/config/translation';

Vue.use(VueI18next);

i18next
    .use(i18nextXHRBackend)
    .use(i18nextLangDetector)
    .init(translation.I18NEXT_CONFIG);

export default new VueI18next(i18next);
