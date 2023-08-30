import { route } from 'quasar/wrappers';
import { createApp } from 'vue';
import { createGtm } from '@gtm-support/vue-gtm';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from 'src/router/routes';
import ga from 'src/router/analytics';

import config from 'src/config/index';

const app = createApp({});

export default route(function() {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

    const Router = createRouter({
        scrollBehavior: () => ({ y: 0 }),
        routes,
        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE)
    });

    if (config.GTM_CONFIG) {
        app.use(
            createGtm({
                ...config.GTM_CONFIG,
                loadScript: true,
                vueRouter: Router,
            })
        );
    }

    Router.afterEach(to => {
        app.config.globalProperties.$gtm.trackView(
            to.path,
            to.name,
            {
                cid: ga.createSessionId(),
                path: to.path
            }
        );
    });

    return Router;
});