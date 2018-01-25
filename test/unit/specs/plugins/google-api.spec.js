import { createLocalVue, shallow } from '@vue/test-utils';


import GoogleAPIPlugin from 'src/plugins/google-api';
import GoogleAPIClient from 'src/helpers/google-api-client';

/**
 * @test {GoogleAPIPlugin}
 */
describe('GoogleAPIPlugin', function () {

    it('should install google api client into `$googleAPI` Vue instance property and `googleAPI` global property', function () {

        const localVue = createLocalVue();

        localVue.use(GoogleAPIPlugin);

        const component = {
            template: `<p></p>`,
        };
        const wrapper = shallow(component, {
            localVue
        });

        wrapper.vm.$googleAPI.should.be.instanceof(GoogleAPIClient);
        localVue.googleAPI.should.be.equals(GoogleAPIClient);
    });
});
