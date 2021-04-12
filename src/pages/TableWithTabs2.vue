<template>
    <div>
        <f-table
            :tabs-data="headerTabs"
            :selected-tab="selectedTab"
            :page-header="false"
            tab-indicator-color="transparent"
        >
            <template v-slot:header-left />

            <template v-slot:filter_preApprovedTracks>
                <span v-text="$trans('filter_5')"/>
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

            <template v-slot:filter_recommended>
                <span v-text="$trans('filter_6')"/>
            </template>
            <template v-slot:table_recommended>
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
                    total-items-text="tracks_available"
                    show-items-total
                    align-end
                    @input="newPagination"
                />
            </template>
        </f-table>
    </div>
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
                selectedTab: 'preApprovedTracks',
                headerTabs: [
                    { name: 'preApprovedTracks' },
                    { name: 'recommended', badge: '3' },
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
            this.$q.dark.set(true);
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