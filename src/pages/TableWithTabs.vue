<template>
    <f-table
        :tabs-data="headerTabs"
        :breadcrumbs="breadcrumbs"
        :header-help-text="headerHelpText"
        :selected-tab="selectedTab"
    >
        <template v-slot:header-left />

        <template v-slot:header-right>
            <q-toggle
                v-model="selection"
                left-label
                color="blue"
                label="Auto Payment"
                val="auto_payment" />

            <q-toggle
                v-model="selection"
                left-label
                color="blue"
                label="Payment Request"
                val="auto_payment" />
        </template>

        <!--        <template v-slot:control-left>-->
        <!--            This is Control Left-->
        <!--        </template>-->

        <template v-slot:control-right>
            <div class="q-pa-md q-gutter-sm">
                <q-btn
                    color="primary"
                    label="On Left" />
                <q-btn
                    color="secondary"
                    label="On Right" />
                <q-btn
                    color="red"
                    label="On Left and Right" />
            </div>
        </template>

        <template v-slot:filter_requests>
            FILTER requests
        </template>
        <template v-slot:table_requests>
            <q-table
                :data="tableData.data.items"
                :columns="columns"
                :hide-bottom="hideBottom"
                binary-state-sort
                row-key="channelId"
            />
        </template>

        <template v-slot:filter_payments>
            FILTER payments
        </template>
        <template v-slot:table_payments>
            Table payments
        </template>

        <template v-slot:filter_paid>
            FILTER paid
        </template>
        <template v-slot:table_paid>
            Table paid
        </template>

        <template v-slot:filter_rejected>
            FILTER rejected
        </template>
        <template v-slot:table_rejected>
            Table rejected
        </template>

        <template v-slot:paginate>
            <f-paginate
                v-model="pagination"
                show-items-total
                align-end
            />
        </template>

    </f-table>
</template>

<script>
    import FTable from "src/components/common/FTable";
    import FPaginate from 'src/components/partials/tables/common/FPaginate';
    import pageConfig from 'src/config/pagination';

    export default {
        name: 'TableWithTabs',
        components: { FTable, FPaginate },
        data () {
            return {
                headerHelpText: 'payment Requests',
                breadcrumbs: [
                    {label: 'Home', to: '/'},
                    {label: 'Docs', to: '/start/pick-quasar-flavour'},
                    {label: 'Breadcrumbs', to: '/vue-components/breadcrumbs'},
                    {label: 'Build'},
                ],
                selection: [ 'yellow', 'red' ],
                selectedTab: 'requests',
                headerTabs: [
                    { name: 'requests', badge: '$300.00' },
                    { name: 'payments', badge: '$02.00' },
                    { name: 'paid', badge: 'Feb $100K' },
                    { name: 'rejected',  badge: 'Feb $900' }
                ],
                hideBottom: true,
                pagination: pageConfig.default,
                tableData: {
                    "data": {
                        "page": 1,
                        "per_page": 10,
                        "total": 5,
                        "items": [
                            {
                                "channel_id": "UCASnXNX6BWgqIc16ltAg7tQ",
                                "channel_name": "Vikas Dwivedi",
                                "total_claims": 548,
                                "user_name": "Vikas Dwivedi",
                                "email": "vikas.nice@gmail.com"
                            },
                            {
                                "channel_id": "UCMR9LQ9FuSQo8tftSm6rBxA",
                                "channel_name": "John",
                                "total_claims": 645,
                                "user_name": "John Doe",
                                "email": "vikas.dwivedi@freedom.tm"
                            },
                            {
                                "channel_id": "UCactMva1EcIeFYh2zkXMh-g",
                                "channel_name": "Bhole baba",
                                "total_claims": 831,
                                "user_name": "Vikas Dwivedi",
                                "email": "vikas.nice@gmail.com",
                            },
                            {
                                "channel_id": "UCKqG_NA3wYyfqmiyWsF5uDA",
                                "channel_name": "Ravi Shnakar",
                                "total_claims": 931,
                                "user_name": "Vikas Dwivedi",
                                "email": "vikas.nice@gmail.com",
                            },
                            {
                                "channel_id": "UCnLuKff0valtyCAqN_ghsOw",
                                "channel_name": "title 1",
                                "total_claims": 1127,
                                "user_name": "John Dwivedi",
                                "email": "vikas.dwivedi@freedom.tm"
                            }
                        ]
                    }
                },
                tableColumns: [
                    {
                        "name": "channel_id",
                        "label": "channel-id",
                        "field": "channel_id",
                        "align": "left",
                        "sortable": true
                    },
                    {
                        "name": "channel_name",
                        "label": "channel",
                        "field": "channel_name",
                        "align": "left",
                        "sortable": true
                    },
                    {
                        "name": "user_name",
                        "label": "name",
                        "field": "user_name",
                        "align": "left",
                        "sortable": true
                    },
                    {
                        "name": "email",
                        "label": "email",
                        "field": "email",
                        "align": "left",
                        "sortable": true
                    },
                    {
                        "name": "total_claims",
                        "label": "total-claims",
                        "field": "total_claims",
                        "align": "left",
                        "sortable": true
                    },
                ]
            };
        },
        computed: {
            columns() {
                return this.tableColumns.map(col => {
                    return {
                        ...col,
                        label: this.$trans(col.label),
                    };
                });
            },
        },
    };
</script>

<style scoped>

</style>
