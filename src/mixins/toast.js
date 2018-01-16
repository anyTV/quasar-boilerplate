import { Toast } from 'quasar';
import config from 'src/config';
import i18n from 'src/helpers/i18n';

Toast.setDefaults(config.toast);

export default {
    data() {
        return {
            toast: {
                error: (msg, param) => Toast.create.negative(i18n.i18next.t(msg, param)),
                success: (msg, param) => Toast.create.positive(i18n.i18next.t(msg, param)),
                warning: (msg, param) => Toast.create.warning(i18n.i18next.t(msg, param)),
                info: (msg, param) => Toast.create.info(i18n.i18next.t(msg, param))
            }
        };
    }
};
