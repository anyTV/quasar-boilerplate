import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import ga from './analytics';

Vue.use(VueRouter);

const Router = new VueRouter({
    /*
     * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
     *
     * When going with "history" mode, please also make sure "build.publicPath"
     * is set to something other than an empty string.
     * Example: '/' instead of ''
     */

    // Leave as is and change from quasar.conf.js instead!
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    scrollBehavior: () => ({ y: 0 }),
    routes
});

Router.afterEach(to => {
    Vue.gtm.trackView(
        to.path,
        to.name,
        {
            cid: ga.getSessionId() || ga.createSessionId(),
            path: to.path
        }
    );
});

export default Router;
