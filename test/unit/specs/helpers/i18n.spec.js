import i18nHelper from 'src/helpers/i18n';
import VueI18next from '@panter/vue-i18next';

/**
 * @test {i18nHelper}
 */
describe('i18nHelper', function () {

    it('should be an instance of VueI18Next', function () {
        i18nHelper.should.be.an.instanceof(VueI18next);
    });
});
