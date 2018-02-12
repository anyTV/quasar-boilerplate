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
 * this.$trans(obj, ['nested.key']); // also supports nested properties
 * this.$trans(obj, 'single-key'); // also supports single key using string
 * this.$trans([obj1, obj2], 'single-key'); // also supports array of objects using single key using string
 * this.$trans([obj1, obj2], ['key1', 'key2']); // also supports array of objects using multiple keys using array
 */
function translate (key, data) {
    return i18n.i18next.t(key, data)
}

const i18nPlugin = {
    install(Vue) {

        Vue.directive('t', {
            inserted: translateInnerHTML,
            componentUpdated: translateInnerHTML
        });
        Vue.filter('$t', translate);
        Vue.mixin({
            methods: {
                $trans(obj, props, trim = false) {
                    /**
                     * string key is passed:
                     * this.$trans('key')
                     */
                    if (_.isString(obj)) {
                        return translate(obj);
                    }

                    /**
                     * array of keys is passed:
                     * this.$trans(['key1', 'key2'])
                     */
                    if (_.isArray(obj)) {
                        // array of objects and props is a path to the key
                        if (props) {
                            return _.map(obj, item => this.$trans(item, props, trim));
                        }

                        return _.map(obj, key => translate(key));
                    }

                    /**
                     * translate some properties of an object:
                     * this.$trans(obj, 'key1');
                     * this.$trans(obj, ['key1', 'key2'])
                     * trim other properties
                     * this.$trans(obj, ['key1', 'key2'], true)
                     */
                    if (_.isPlainObject(obj) && (_.isString(props) || _.isArray(props))) {
                        props = _.isArray(props) ? props : [props];
                        // Create a new object to avoid unnecessary behaviors when parameter is mutated.
                        const accumulator = _.pick(obj, trim ? props : _.keys(obj));

                        return _.transform(props, (result, prop) => {
                            if (_.has(result, prop)) {
                                _.set(result, prop, this.$trans(_.get(result, prop)));
                            }
                        }, accumulator);
                    }

                    return obj;
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
