import i18n from 'src/helpers/i18n';

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
