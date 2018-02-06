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
                    key3: 'value: {{ data }}'
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
        template: `<div><p v-t="'key1'"></p><p>{{ 'key2' | $t }}</p><p>{{ 'key3' | $t({ data: 'foo' }) }}</p></div>`,
    };
    const wrapper = shallow(component, {
        localVue,
        i18n: new VueI18next(i18next)
    });

    it('should install i18n directive and filter', function (done) {
        wrapper.vm.$t.should.be.a('function');
        localVue.nextTick(() => {
            wrapper.html().should.be.equals(`<div><p>value1</p><p>value2</p><p>value: foo</p></div>`);
            done();
        });
    });

    it('$t filter should translate string key', function () {
        wrapper.vm.$t('key1').should.be.equals('value1');
    });

    it('$t filter should interpolate data', function () {
        wrapper.vm.$t('key3', { data: 'foo' }).should.equals('value: foo');
    });

    it('$trans mixin method should translate string key', function () {
        wrapper.vm.$trans('key1').should.be.equals('value1');
    });

    it('$trans mixin method should return null when given null', function () {
        should.equal(wrapper.vm.$trans(null), null);
    });

    it('$trans mixin method should return undefined when no keys passed', function () {
        should.equal(wrapper.vm.$trans(undefined), undefined);
    });

    it('$trans mixin method should return untranslated key', function () {
        wrapper.vm.$trans('unknown-key').should.be.equals('unknown-key');
    });

    it('$trans mixin method should translate array of keys', function () {
        wrapper.vm.$trans(['key1', 'key2']).should.deep.equals(['value1', 'value2']);
    });

    it('$trans mixin method should translate array of keys and return untranslated keys', function () {
        wrapper.vm.$trans(['key1', 'unknown-key']).should.deep.equals(['value1', 'unknown-key']);
    });

    it('$trans mixin method should return empty array when given an empty array', function () {
        wrapper.vm.$trans([]).should.deep.equals([]);
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

    it('$trans mixin method should return the object when props is not given', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' })
            .should.deep.equals({ key1: 'key1', key2: 'key2', extraKey: 'extra' });
    });

    it('$trans mixin method should return the object when props is null', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, null)
            .should.deep.equals({ key1: 'key1', key2: 'key2', extraKey: 'extra' });
    });

    it('$trans mixin method should support single property for object using string', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, 'key1')
            .should.deep.equals({ key1: 'value1', key2: 'key2', extraKey: 'extra' });
    });

    it('$trans mixin method should not inject a missing property to the object', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, 'missing-key')
            .should.deep.equals({ key1: 'key1', key2: 'key2', extraKey: 'extra' });
    });

    it('$trans mixin method should return property value when no matching translation', function () {
        wrapper.vm.$trans({ key1: 'key1', key2: 'key2', extraKey: 'extra' }, 'extraKey')
            .should.deep.equals({ key1: 'key1', key2: 'key2', extraKey: 'extra' });
    });
});
