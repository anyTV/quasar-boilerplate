import _ from 'lodash';
import axios from 'axios';
import i18n from 'src/helpers/i18n';
import translation from 'src/config/translation';

const translateInnerHTML = (element, binding) => {
    element.innerHTML = i18n.i18next.t(
        binding.value.path || binding.value,
        binding.value.args
    );
};

export default {
    directives: {
        t: {
            inserted: translateInnerHTML,
            componentUpdated: translateInnerHTML
        }
    },

    filters: {
        $t(key) {
            return i18n.i18next.t(key);
        }
    },

    methods: {
        async getAvailableLanguages() {
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
