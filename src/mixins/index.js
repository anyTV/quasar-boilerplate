import xhrMixin from './xhr';
import toastMixin from './toast';
import translationMixin from './translation';

export default [
    // You can pass a configuration for xhr mixin
    // see https://github.com/axios/axios/blob/master/README.md#request-config
    xhrMixin(),
    toastMixin,
    translationMixin,
];
