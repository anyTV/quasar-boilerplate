<template>
    <f-table
        :tabs-data="headerTabs"
        :header-help-text="$trans('payment_requests')"
    >
        <template v-slot:header-right>
            <q-toggle
                v-model="selection"
                :label="$trans('auto_payment')"
                left-label
                color="blue"
                val="auto_payment" />

            <q-toggle
                v-model="selection"
                :label="$trans('payment_request')"
                left-label
                color="blue"
                val="auto_payment" />
        </template>

        <template v-slot:control-right>
            <div class="q-gutter-xs q-ma-none">
                <q-btn
                    :label="$trans('on_left')"
                    color="primary"
                />
                <q-btn
                    :label="$trans('on_right')"
                    color="secondary"
                />
            </div>
        </template>

        <template v-slot:filter_requests>
            <span v-text="$trans('filter_1')"/>
        </template>
        <template v-slot:table_requests>
            <q-table
                :data="requestTabData"
                :columns="columns"
                :hide-bottom="hideBottom"
                :loading="loading"
                :pagination.sync="tablePagination"
                binary-state-sort
                row-key="id"
                @request="getTableData"
            />
        </template>

        <template v-slot:filter_payments>
            <span v-text="$trans('filter_2')"/>
        </template>
        <template v-slot:table_payments>
            <q-table
                :data="requestTabData"
                :columns="columns"
                :hide-bottom="hideBottom"
                :loading="loading"
                :pagination.sync="tablePagination"
                binary-state-sort
                row-key="id"
                @request="getTableData"
            />
        </template>

        <template v-slot:filter_paid>
            <span v-text="$trans('filter_3')"/>
        </template>
        <template v-slot:table_paid>
            <q-table
                :data="requestTabData"
                :columns="columns"
                :hide-bottom="hideBottom"
                :loading="loading"
                :pagination.sync="tablePagination"
                binary-state-sort
                row-key="id"
                @request="getTableData"
            />
        </template>

        <template v-slot:filter_rejected>
            <span v-text="$trans('filter_4')"/>
        </template>
        <template v-slot:table_rejected>
            <q-table
                :data="requestTabData"
                :columns="columns"
                :hide-bottom="hideBottom"
                :loading="loading"
                :pagination.sync="tablePagination"
                binary-state-sort
                row-key="id"
                @request="getTableData"
            />
        </template>

        <template v-slot:paginate>
            <f-paginate
                v-model="tablePagination"
                per-page-text="requests_per_page"
                total-items-text="requests_total"
                show-items-total
                align-end
                @input="newPagination"
            />
        </template>

    </f-table>
</template>

<script>
    import FPaginate from "src/components/common/FPaginate";
    import FTable from 'src/components/partials/tables/FTable';
    import pageConfig from 'src/config/pagination';
    import tableData from 'src/sample/tableData/tableWithTabs';
    import tableColumns from 'src/sample/tableColumns/tableWithTabs';
    import UtilMixin from 'src/mixins/utils';

    export default {
        name: 'TableWithTabs',
        components: { FTable, FPaginate },
        mixins: [
            UtilMixin
        ],
        data () {
            return {
                selection: [ 'yellow', 'red' ],
                headerTabs: [
                    { name: 'requests', badge: '$300.00' },
                    { name: 'payments', badge: '$02.00' },
                    { name: 'paid', badge: 'Feb $100K' },
                    { name: 'rejected',  badge: 'Feb $900' }
                ],
                hideBottom: true,
                loading: false,
                tableData,
                requestTabData: [],
                tablePagination: {
                    ...pageConfig.default,
                    sortBy: 'id',
                    descending: false
                },
            };
        },
        computed: {
            columns() {
                return this.getTableColumns(tableColumns);
            },
        },
        mounted () {
            this.getTableData({
                pagination: this.tablePagination
            });
        },
        methods: {
            newPagination (data) {
                this.getTableData({
                    pagination: {
                        ...this.tablePagination,
                        ...data
                    }
                });
            },
            getTableData (props) {
                const { sortBy, descending } = props.pagination;
                this.loading = true;
                // emulate server
                setTimeout(() => {
                    const returnedData = this.fetchFromServer({
                        ...props.pagination
                    });
                    this.requestTabData = returnedData.data.items;
                    const pagination = this.setPaginationOptions(returnedData);

                    this.tablePagination = {
                        ...pagination,
                        sortBy,
                        descending
                    };
                    this.loading = false;
                }, 500);
            },

            // emulate api call
            fetchFromServer ({page, rowsPerPage, sortBy, descending}) {

                const total = this.tableData.items.length;
                const startRow = (page - 1) * rowsPerPage;
                const count = rowsPerPage === 0 ? total : rowsPerPage;
                const tableData = this.tableData.items;

                if (sortBy) {
                    const sortFn = sortBy === 'name'
                        ? (descending
                            ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
                            : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                        )
                        : (descending
                            ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
                            : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
                        );
                    tableData.sort(sortFn);
                }

                const data = {
                    page,
                    perPage: rowsPerPage,
                    total,
                    items: tableData.slice(startRow, startRow + count)
                };
                return {
                    data
                };
            },
        }
    };
</script>

<style scoped>

</style>
