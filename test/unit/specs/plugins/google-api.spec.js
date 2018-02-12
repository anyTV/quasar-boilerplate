import _ from 'lodash';

import { createLocalVue, mount } from '@vue/test-utils';

import GoogleAPIPlugin from 'src/plugins/google-api';

/**
 * @test {GoogleAPIPlugin}
 */
describe('GoogleAPIPlugin', function () {

    it('should install google api client into `$googleAPI` Vue instance property and `googleAPI` global property', function (done) {

        const localVue = createLocalVue();

        // mock window.gapi to resolve the plugin immediately
        window.gapi = {};

        localVue.use(GoogleAPIPlugin);

        const component = {
            template: `<p></p>`,
        };
        const wrapper = mount(component, {
            localVue
        });

        _.defer(() => {
            localVue.googleAPI.should.be.equals(window.gapi);
            wrapper.vm.$googleAPI.should.be.equals(window.gapi);
            delete window.gapi;
            done();
        });
    });
});
