import _ from 'lodash';

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
 * this.$trans(['key1', 'key2']); // returns array of translated keys
 * this.$trans(obj, ['key1', 'key2']); // returns obj with translated specified properties
 * this.$trans(obj, ['key1', 'key2'], true); // returns obj with the translated specified properties only
 */
const i18nPlugin = {
    install(Vue) {

        Vue.directive('t', {
            inserted: translateInnerHTML,
            componentUpdated: translateInnerHTML
        });
        Vue.filter('$t', key => i18n.i18next.t(key));
        Vue.mixin({
            methods: {
                $trans(obj, props, trim = false) {

                    /**
                     * string key is passed:
                     * this.$t('key')
                     */
                    if (_.isString(obj)) {
                        return this.$t(obj);
                    }

                    /**
                     * array of keys is passed:
                     * this.$t(['key1', 'key2'])
                     */
                    if (_.isArray(obj)) {
                        return _.map(obj, key => this.$t(key));
                    }

                    /**
                     * translate some properties of an object:
                     * this.$t(obj, ['key1', 'key2'])
                     * trim other properties
                     * this.$t(obj, ['key1', 'key2'], true)
                     */
                    if (_.isPlainObject(obj) && _.isArray(props)) {

                        const objClone = _.cloneDeep(obj);
                        const accumulator = trim ? _.pick(objClone, props) : objClone;

                        return _.transform(props, (result, prop) => {
                            if (_.has(result, prop)) {
                                result[prop] = this.$trans(result[prop], props, trim);
                            }
                        }, accumulator);
                    }

                    return null;
                }
            }
        })
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
