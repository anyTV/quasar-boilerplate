import { createLocalVue, shallow } from '@vue/test-utils';

import ToastPlugin from 'src/plugins/toast';

/**
 * @test {ToastPlugin}
 */
describe('ToastPlugin', function () {

    it('should install helper methods for toast', function () {

        const localVue = createLocalVue();

        localVue.use(ToastPlugin);

        const component = {
            template: `<p></p>`,
        };
        const wrapper = shallow(component, {
            localVue
        });

        wrapper.vm.$toast.should.be.an('object');
        wrapper.vm.$toast.error.should.be.a('function');
        wrapper.vm.$toast.info.should.be.a('function');
        wrapper.vm.$toast.success.should.be.a('function');
        wrapper.vm.$toast.warning.should.be.a('function');

        localVue.toast.should.be.an('object');
        localVue.toast.error.should.be.a('function');
        localVue.toast.info.should.be.a('function');
        localVue.toast.success.should.be.a('function');
        localVue.toast.warning.should.be.a('function');
    });
});
