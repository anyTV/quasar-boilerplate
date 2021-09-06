import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';

export default function () {
    const createHistory = createWebHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        history: createHistory(process.env.MODE === 'ssr' ? undefined : process.env.VUE_ROUTER_BASE)
    });

    return Router;
};
