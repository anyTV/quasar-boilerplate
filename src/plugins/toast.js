import _ from 'lodash';
import { Toast } from 'quasar';
import i18n from 'src/helpers/i18n';

const defaultConfig = {
    timeout: 5000,
};

/**
 * Plugin for injecting toast helper methods
 * @example
 * import Vue from 'vue';
 * import ToastPlugin from 'src/plugins/toast';
 * ...
 * Vue.use(ToastPlugin);
 * @example
 * this.$toast.error('error-occurred', error.type);
 */
const ToastPlugin = {
    install(Vue, options) {

        Toast.setDefaults(_.merge(defaultConfig, options));

        const toastHandlers = {
            error: (msg, param) => Toast.create.negative(i18n.i18next.t(msg, param)),
            success: (msg, param) => Toast.create.positive(i18n.i18next.t(msg, param)),
            warning: (msg, param) => Toast.create.warning(i18n.i18next.t(msg, param)),
            info: (msg, param) => Toast.create.info(i18n.i18next.t(msg, param))
        };

        Vue.toast = toastHandlers;

        Object.defineProperties(Vue.prototype, {
            $toast: {
                get() {
                    return toastHandlers;
                }
            }
        })
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ToastPlugin);
}

export default ToastPlugin;
