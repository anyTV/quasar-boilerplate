import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';
import { createLocalVue, shallow } from '@vue/test-utils';

import i18nPlugin from 'src/plugins/i18n';

/**
 * @test {i18nPlugin}
 */
describe('i18nPlugin', function () {

    const localVue = createLocalVue();

    i18next.init({
        resources: {
            en: {
                index: {
                    key1: 'value1',
                    key2: 'value2',
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
        template: `<div><p v-t="'key1'"></p><p>{{ 'key2' | $trans }}</p></div>`,
    };
    const wrapper = shallow(component, {
        localVue,
        i18n: new VueI18next(i18next)
    });

    it('should install i18n directive and filter', function () {
        wrapper.vm.$t.should.be.a('function');
        localVue.nextTick(() => {
            wrapper.html().should.be.equals(`<div><p>value1</p><p>value2</p></div>`);
        });
    });

    it('$t filter should translate string key', function () {
        wrapper.vm.$t('key1').should.be.equals('value1');
    });

    it('$trans mixin method should translate string key', function () {
        wrapper.vm.$trans('key1').should.be.equals('value1');
    });

    it('$trans mixin method should translate array of keys', function () {
        wrapper.vm.$trans(['key1', 'key2']).should.deep.equals(['value1', 'value2']);
    });

    it('$trans mixin method should translate specified keys of an object', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, ['key1', 'key2'])
            .should.deep.equals({ key1: 'value1', key2: 'value2', extraKey: 'extra' });
    });

    it(
        '$trans mixin method should not inject a new property when translating a key which is not an object propery',
        function () {
            wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, ['key1', 'key2', 'missing-key'])
                .should.deep.equals({ key1: 'value1', key2: 'value2', extraKey: 'extra' });
        }
    );

    it('$trans mixin method should trim other properties of an object when trim is true', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, ['key1', 'key2'], true)
            .should.deep.equals({ key1: 'value1', key2: 'value2' });
    });

    it('$trans mixin method should translate a property of an object mapped to an array of keys', function () {
        wrapper.vm.$trans({ keys: ['key1', 'key2'], extraKey: 'extra' }, ['keys'], true)
            .should.deep.equals({ keys: ['value1', 'value2'] });
    });

    it('$trans mixin method should not translate a property of an object mapped to an object', function () {
        wrapper.vm.$trans({ keys: {}, extraKey: 'extra' }, ['keys'], true)
            .should.deep.equals({ keys: {} });
    });

    it('$trans mixin method should translate a nested property of an object', function () {
        wrapper.vm.$trans({ keys: { key1: 'key1' }, extraKey: 'extra' }, ['keys.key1'], true)
            .should.deep.equals({ keys: { key1: 'value1' } });
    });

    it('$trans mixin method should translate a nested property of an object mapped to an array of keys', function () {
        wrapper.vm.$trans({ keys: { subkeys: ['key1', 'key2'] }, extraKey: 'extra' }, ['keys.subkeys'], true)
            .should.deep.equals({ keys: { subkeys: ['value1', 'value2'] } });
    });

    it('$trans mixin method should not translate a nested property of an object mapped to an object', function () {
        wrapper.vm.$trans({ keys: { subkeys: {} }, extraKey: 'extra' }, ['keys.subkeys'], true)
            .should.deep.equals({ keys: { subkeys: {} } });
    });
});
