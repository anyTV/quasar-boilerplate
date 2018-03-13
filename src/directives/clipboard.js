import _ from 'lodash';
import Clipboard from 'clipboard';

function isDom (obj) {
    return typeof window.HTMLElement === 'object'
        ? obj instanceof window.HTMLElement
        : obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

/**
 * v-clipboard: directive for copying content to clipboard
 * @param {!(string|object|function|Promise<string|object|function>)} value - directive's value
 * @param {string} [arg='text'] - directive's arg: clipboard selection option, one of ('text', 'target')
 * @param {string} [modifiers='copy'] - directive's modifier: clipboard action option, one of ('copy', 'cut')
 * @emits {success} emitted when action is done successfully
 * @emits {error} emitted when action failed to execute
 * @example
 * <!-- Using string -->
 * <div v-clipboard:text="'lorem ipsum'">Copy me</div>
 * @example
 * <!-- Using variable -->
 * <div v-clipboard:text="loremIpsumText">Copy me</div>
 * ...
 * computed: {
 *   loremIpsumText() { return 'lorem ipsum'; }
 * }
 * @example
 * <!-- Default arg is text -->
 * <div v-clipboard="'lorem ipsum'">Copy me</div>
 * @example
 * <!-- Using target -->
 * <input type="text" v-model="text" class="text-to-clipboard">
 * <!-- Using selector as target -->
 * <button v-clipboard:target="'.text-to-clipboard'">Copy</button>
 * <!-- Using variable as target -->
 * <button v-clipboard:target="target">Copy</button>
 * ...
 * computed: {
 *   target() {
 *     return '.text-to-clipboard';
 *   }
 * }
 * @example
 * // Passing a DOM element means you have used a DOM selector method
 * // which does not wait for Vue to update components first.
 * // You need to use `await this.$nextTick();` before returning the DOM element.
 * // e.g.
 * computed: {
 *   async textToBeCopied() {
 *     await this.$nextTick(); // this will allow Vue to update the template first
 *     return document.querySelector(this.textSelector); // this will get the updated value
 *   }
 * }
 * @example
 * <!--
 *   Adding container option
 *   https://clipboardjs.com/#advanced-usage
 * -->
 * <button v-clipboard:target="target" container="#app">...</button>
 */
const clipboardDirective = {
    async bind(el, { value, arg = 'text', modifiers }, vnode) {
        const option = {};

        if (value) {
            let _value = value;

            if (_.isFunction(value)) {
                _value = await value();
            }

            option[arg] = () => {
                return arg === 'text'
                    ? _value
                    : isDom(_value)
                        ? _value
                        : document.querySelector(_value);
            };
        }
        else {
            option.text = () => el.innerHTML;
        }

        option.action = () => modifiers.cut ? 'cut' : 'copy';

        const { componentOptions, data } = vnode;
        const container = data.attrs && data.attrs.container ? document.querySelector(data.attrs.container) : null;

        option.container = vnode.elm.offsetParent
            || container
            || el.parentElement
            || document.body
            || null;

        vnode.elm.$clipboard = new Clipboard(el, option);

        const events = (componentOptions && componentOptions.listeners)
            || data.on
            || data.nativeOn
            || null;

        if (_.isPlainObject(events)) {
            _.forOwn(events, (handler, event) => vnode.elm.$clipboard.on(
                event,
                handler.fn || handler.fns || handler
            ));
        }
    },

    unbind(vnode) {
        if (vnode.elm && vnode.elm.$clipboard) {
            if (_.isFunction(vnode.elm.$clipboard.destroy)) {
                vnode.elm.$clipboard.destroy();
            }

            delete vnode.elm.$clipboard;
        }
    },

    update(el, binding, vnode) {
        binding.def.unbind(vnode);
        binding.def.bind(el, binding, vnode);
    },
};

export default clipboardDirective;
