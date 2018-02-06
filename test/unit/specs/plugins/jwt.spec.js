import { createLocalVue, shallow } from '@vue/test-utils';

import JWTPlugin from 'src/plugins/jwt';
import JWT from 'src/helpers/jwt';

/**
 * @test {JWTPlugin}
 */
describe('JWTPlugin', function () {

    it('should install jwt into `jwt` and `$jwt` Vue instance property', function () {

        const localVue = createLocalVue();

        localVue.use(JWTPlugin);

        const component = {
            template: `<p></p>`,
        };
        const wrapper = shallow(component, {
            localVue
        });

        localVue.jwt.should.be.instanceof(JWT);
        wrapper.vm.$jwt.should.be.instanceof(JWT);
    });
});
