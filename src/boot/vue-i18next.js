import _ from 'lodash';
import { boot } from 'quasar/wrappers';

import { createI18n } from 'vue-i18n';
import i18nextConfig from 'src/config/i18next';
const i18n = createI18n(i18nextConfig);

/**
 * Plugin for injecting i18n directive and filter
 * @example
 * import Vue from 'vue';
 * import i18nPlugin from 'src/boot/i18n';
 * ...
 * Vue.use(i18nPlugin);
 * @example
 * <span v-t="key"></span>
 * @example
 * <span>{{ 'key' | $t }}</span>
 * @example
 * const label = this.$('key');
 * this.$trans(['key1', 'key2']); // returns array of translated keys
 * this.$trans(obj, ['key1', 'key2']); // returns obj with translated specified properties
 * this.$trans(obj, ['key1', 'key2'], true); // returns obj with the translated specified properties only
 * this.$trans(obj, ['nested.key']); // also supports nested properties
 * this.$trans(obj, 'single-key'); // also supports single key using string
 * this.$trans([obj1, obj2], 'single-key'); // also supports array of objects using single key using string
 * this.$trans([obj1, obj2], ['key1', 'key2']); // also supports array of objects using multiple keys using array
 */

export default boot(async ({ app }) => {
    app.i18n = i18n;
    app.config.globalProperties.i18n = i18n;
    app.use(i18n);
    app.mixin({
        methods: {
            $trans(obj, props, trim = false) {
                /**
                 * string key is passed:
                 * this.$trans('key')
                 */
                if (_.isString(obj)) {
                    return this.$t(obj);
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

                    return _.map(obj, key => this.$trans(key));
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

                /**
                 * translate object format { key, data }
                 * this.$trans({ key: 'translate-me', data: { message: 'hello' } })
                 */
                if (_.isPlainObject(obj) && _.has(obj, 'key') && !props) {
                    return this.$t(obj.key, obj.data || {});
                }

                return obj;
            }
        }
    });
});

export { i18n };
