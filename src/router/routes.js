import Demo from 'pages/Demo';
import Logout from 'components/Logout';
import LogoutPage from 'pages/Logout';
import LandingPage from 'pages/Landing';
import SSOCallback from 'components/SSOCallback';
import MainLayout from 'layouts/MainLayout';

export default [
    {
        path: '/',
        name: 'home',
        component: LandingPage,
    },
    {
        path: '/demo',
        component: MainLayout,
        children: [
            { path: '', component: () => Demo, name: 'demo' },
        ],
        name: 'demo-main',
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/logoutpage',
        name: 'logoutpage',
        component: LogoutPage
    },
    {
        path: '/sso/callback',
        name: 'login',
        component: SSOCallback,
    },
];
