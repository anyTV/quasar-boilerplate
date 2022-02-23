import i18next from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';
import i18nextLangDetector from 'i18next-browser-languagedetector';
import VueI18next from '@panter/vue-i18next';
import i18nextConfig from 'src/config/i18next';
import _ from 'lodash';
import {
    get_application_name,
    get_application_name_key,
} from 'src/mixins/utils';

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

export default async ({ app, Vue }) => {
    Vue.use(VueI18next);

    i18next.use(i18nextLangDetector);

    if (i18nextConfig.backend) {
        i18next.use(i18nextHttpBackend);
    }

    await i18next.init(i18nextConfig);

    app.i18n = new VueI18next(i18next);

    Vue.mixin({
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
            },
            $trans_with_app_name(obj) {
                let trans_param = _.isString(obj)
                    ? {
                        key: obj,
                        data: {
                            [get_application_name_key()]: get_application_name()
                        }
                    }
                    : obj;

                return this.$trans(trans_param);
            },
        }
    });
};
