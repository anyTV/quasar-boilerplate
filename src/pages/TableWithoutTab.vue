<template>
    <f-table
        :tabs-data="headerTabs"
        :breadcrumbs="breadcrumbs"
        :table-title="tableTitle"
    >

        <template v-slot:header-right>
            <div class="q-pa-md text-grey-7">
                <span v-text="$trans('additional_info')"/>
                <q-icon
                    name="warning_amber"
                    class="q-px-xs" />
                <q-icon
                    name="error_outline"
                    class="q-px-xs"/>
            </div>
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

        <template v-slot:filter_preApprovedTracks>
            <span v-text="$trans('filter_1')"/>
        </template>
        <template v-slot:table_preApprovedTracks>
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
                show-items-total
                per-page-text="items_per_page"
                total-items-text="items_total"
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
                tableTitle: this.$trans('table_title'),
                breadcrumbs: [
                    {label: 'home', to: '/'},
                    {label: 'channel', to: '/channel'},
                    {label: 'user', to: '/user'},
                    {label: 'freedom_id'},
                ],
                selection: [ 'yellow', 'red' ],
                headerTabs: [
                    { name: 'preApprovedTracks' },
                ],
                hideBottom: true,
                loading: false,
                tableData,
                tableColumns,
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
