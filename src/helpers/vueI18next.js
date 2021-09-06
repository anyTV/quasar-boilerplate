(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.VueI18next = factory());
}(this, (function () {
    'use strict';
    function parseValue(value) {
        if (typeof value === 'string') {
            return { key: value };
        } else if (typeof value === 'object') {
            if (!value.key && value.path) {
                value.key = value.path;
                delete value.path;
            }
            if (!value.key) {
                throw new Error('no key in value');
            }
            return value;
        } else {
            throw new Error();
        }
    }

    function getInterpolateArg(
        { slots },
        keys
    ) {
        if (keys.length === 1 && keys[0] === 'default') {
            // default slot only
            return slots.default ? slots.default() : []
        } else {
            // named slots
            return keys.reduce((arg, key) => {
                const slot = slots[key]
                if (slot) {
                    arg[key] = slot()
                }
                return arg
            }, {})
        }
    }

    const VueI18next = {
        createI18n: (i18next) => ({
            install: (app, options = {}) => {
                options.bindI18n = options.bindI18n || 'languageChanged loaded';
                options.bindStore = options.bindStore || 'added removed';

                // add some reactivity...
                app.mixin({
                    created() {
                        if (options.bindI18n) {
                            i18next.on(options.bindI18n, () => this.$forceUpdate());
                        }
                        if (options.bindStore && i18next.store) {
                            i18next.store.on(options.bindStore, () => this.$forceUpdate());
                        }
                    }
                });

                // install globalProperties
                app.config.globalProperties.$i18n = i18next;
                app.config.globalProperties.$t = (...args) => i18next.t.apply(i18next, args);

                // install directive
                const bind = (el, { instance, value, modifiers }) => {
                    const parsedValue = parseValue(value);
                    el.textContent = i18next.t(parsedValue.key, parsedValue);
                };
                app.directive('t', {
                    beforeMount: bind,
                    beforeUpdate: bind
                });

                // install component
                app.component('i18next', {
                    props: {
                        tag: {
                            type: String,
                            default: 'span'
                        },
                        i18nKey: {
                            type: String,
                            required: true
                        },
                        options: {
                            type: Object
                        }
                    },
                    setup(props, context) {
                        return () => {
                            const { slots, attrs } = context;
                            const keys = Object.keys(slots).filter(key => key !== '_')
                            const children = getInterpolateArg(context, keys)
                            const key = props.i18nKey;
                            const tag = props.tag;
                            const REGEXP = i18next.services.interpolator.regexp;
                            const i18nextOptions = {
                                ...(props.options || {}),
                                interpolation: { prefix: '#$?', suffix: '?$#' }
                            };
                            const format = i18next.t(key, i18nextOptions);
                            const tchildren = [];
                            format.split(REGEXP).reduce((memo, match, index) => {
                                let child;
                                if (index % 2 === 0) {
                                    if (match.length === 0) return memo;
                                    child = match;
                                } else {
                                    const place = match.trim();
                                    // eslint-disable-next-line no-restricted-globals
                                    if (isNaN(parseFloat(place)) || !isFinite(place)) {
                                        children.forEach(e => {
                                            if (
                                                !child &&
                                                e.data.attrs &&
                                                e.data.attrs.place &&
                                                e.data.attrs.place === place
                                            ) {
                                                child = e;
                                            }
                                        });
                                    } else {
                                        child = children[parseInt(match, 10)];
                                    }
                                }

                                memo.push(child);
                                return memo;
                            }, tchildren);
                            return Vue.h(tag, attrs, tchildren);
                        };
                    }
                })
            },
        }),
    };

    return VueI18next;
})));