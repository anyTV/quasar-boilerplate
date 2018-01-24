import i18n from 'src/helpers/i18n';

/**
 * Plugin for injecting i18n directive and filter
 * @example
 * import Vue from 'vue';
 * import i18nPlugin from 'src/plugins/i18n';
 * ...
 * Vue.use(i18nPlugin);
 * @example
 * <span v-t="key"></span>
 * @example
 * <span>{{ 'key' | $t }}</span>
 * @example
 * const label = this.$t('key');
 */
const i18nPlugin = {
    install(Vue) {

        Vue.directive('t', {
            inserted: translateInnerHTML,
            componentUpdated: translateInnerHTML
        });

        Vue.filter('$t', key => i18n.i18next.t(key));
    }
};

function translateInnerHTML(element, binding) {
    element.innerHTML = i18n.i18next.t(
        binding.value.path || binding.value,
        binding.value.args
    );
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(i18nPlugin);
}

export default i18nPlugin;
