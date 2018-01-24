import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';
import { createLocalVue, shallow } from '@vue/test-utils';

import i18nPlugin from 'src/plugins/i18n';

/**
 * @test {i18nPlugin}
 */
describe('i18nPlugin', function () {

    it('should install i18n directive and filter', function () {

        const localVue = createLocalVue();

        i18next.init({
            resources: {
                en: {
                    index: {
                        key: 'value'
                    }
                }
            },
            defaultNS: 'index',
            lng: 'en',
            debug: true
        });

        localVue.use(VueI18next);
        localVue.use(i18nPlugin);

        const component = {
            template: `<div><p v-t="'key'"></p><p>{{ 'key' | $t }}</p></div>`,
        };
        const wrapper = shallow(component, {
            localVue,
            i18n: new VueI18next(i18next)
        });

        wrapper.vm.$t.should.be.a('function');
        localVue.nextTick(() => {
            wrapper.html().should.be.equals(`<div><p>value</p><p>value</p></div>`);
        });
    });
});
