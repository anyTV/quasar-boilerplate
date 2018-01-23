import _ from 'lodash';
import axios from 'axios';
import translation from 'src/config/translation';

export default {
    methods: {
        async getAvailableLanguages() {
            if (!PROD) {
                return translation.availableLanguages;
            }

            let response;

            try {
                response = await axios.get(translation.server.getAvailableLocalesURL);
            }
            catch (error) {
                throw error;
            }

            const languages = response.data.data.languages;
            languages.unshift('en');

            return _.uniq(languages);
        },

        getCurrentLanguage() {
            return this.$i18n.i18next.language;
        },

        changeLanguage(lang) {
            this.$i18n.i18next.changeLanguage(lang);
        }
    }
};
