import _ from 'lodash';
import axios from 'axios';
import translation from 'src/config/translation';

/**
 * Mixin containing helper methods for i18n
 */
export default {
    methods: {
        /**
         * Fetches list of available languages
         * @return {Promise<string[], Error>}
         */
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

        /**
         * Get current language used
         * @return {string} current language
         */
        getCurrentLanguage() {
            return this.$i18n.i18next.language;
        },

        /**
         * Set current language
         * @param {string} lang - language abbreviation
         * @example
         * {
         *   mixins: [i18nMixin],
         *   ...
         *   mounted() {
         *      this.changeLanguage('en');
         *   }
         * }
         */
        changeLanguage(lang) {
            this.$i18n.i18next.changeLanguage(lang);
        }
    }
};
