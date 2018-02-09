import _ from 'lodash';
import { uid } from 'quasar';


function generateMethods(methodNames) {
    return _.transform(methodNames, (methods, methodName) => {
        methods[methodName] = function () {
            return this.$refs[this.ref][methodName](...arguments);
        };
    }, {});
}

export default {

    data() {
        return {
            ref: uid(),
        };
    },

    methods: generateMethods([
        'abort',
        'add',
        'blur',
        'clear',
        'clearAndFocus',
        'close',
        'focus',
        'move',
        'open',
        'pick',
        'remove',
        'select',
        'set',
        'setCurrentSelection',
        'setValue',
        'toggleAmPm',
        'togglePass',
        'trigger',
        'upload',
    ]),
};
