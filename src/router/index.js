import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes';
import ga from './analytics';
import { getCurrentInstance } from 'vue';

export default function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
      ? createMemoryHistory
      : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory
  
    const Router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes,
  
      // Leave this as is and make changes in quasar.conf.js instead!
      // quasar.conf.js -> build -> vueRouterMode
      // quasar.conf.js -> build -> publicPath
      history: createHistory(process.env.MODE === 'ssr' ? undefined : process.env.VUE_ROUTER_BASE)
    })


    Router.afterEach(to => {

    
        const app = getCurrentInstance();
        app.gtm.trackView(
            to.path,
            to.name,
            {
                cid: ga.createSessionId(),
                path: to.path
            }
        );
    });
  
    return Router
};
