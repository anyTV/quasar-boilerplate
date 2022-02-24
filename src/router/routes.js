import TableWithTabs from 'pages/TableWithTabs';
import TableWithTabs2 from 'pages/TableWithTabs2';
import TableWithoutTab from 'pages/TableWithoutTab';
import FFilterDemo from 'pages/FFilterDemo';
import FHistoryDemo from 'pages/FHistoryDemo';
import Logout from 'components/Logout';
import LogoutPage from 'pages/Logout';
import LandingPage from 'pages/Landing';
import SSOCallback from 'components/SSOCallback';

export default [
    {
        path: '/',
        name: 'home',
        component: LandingPage,
    },
    {
        path: '/table-with-tabs',
        name: 'table_with_tabs',
        component: TableWithTabs
    },
    {
        path: '/table-with-tabs-2',
        name: 'table_with_tabs-2',
        component: TableWithTabs2
    },
    {
        path: '/table-without-tabs',
        name: 'table_without_tabs',
        component: TableWithoutTab
    },
    {
        path: '/ffilter-demo',
        name: 'ffilter_demo',
        component: FFilterDemo
    },
    {
        path: '/fhistory-demo',
        name: 'fhistory_demo',
        component: FHistoryDemo
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
