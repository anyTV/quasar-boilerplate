import { createLocalVue, shallow } from '@vue/test-utils';
import axios from 'axios';

import AxiosPlugin from 'src/plugins/axios';

/**
 * @test {AxiosPlugin}
 */
describe('AxiosPlugin', function () {

    it('should install axios into `axios` and `$http` Vue instance property', function () {

        const localVue = createLocalVue();

        localVue.use(AxiosPlugin);

        const component = {
            template: `<p></p>`,
        };
        const wrapper = shallow(component, {
            localVue
        });

        wrapper.vm.$http.should.be.equals(axios);
        wrapper.vm.axios.should.be.equals(axios);
    });
});
