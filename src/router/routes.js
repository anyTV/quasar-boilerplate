import TableWithTabs from 'pages/TableWithTabs';
import TableWithTabs2 from 'pages/TableWithTabs2';
import TableWithoutTab from 'pages/TableWithoutTab';

export default [
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
];
