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
                Filter for Pre Approved Tasks
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
                Filter for Recommended
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
                    v-model="pagination"
                    show-items-total
                    per-page-text="requests-per-page"
                    total-items-text="tracks-available"
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
    import tableData from 'src/data/tableData/tableWithTabs';
    import tableColumns from 'src/data/tableColumns/tableWithTabs';
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
                tableColumns,
                requestTabData: [],
                pagination: pageConfig.default,
                tablePagination: {
                    sortBy: 'id',
                    descending: false,
                    page: pageConfig.default.page,
                    rowsPerPage: pageConfig.default.perPage,
                    rowsNumber: pageConfig.default.total
                },
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
                        ...props.pagination, ...this.pagination
                    });
                    this.requestTabData = returnedData.data.items;
                    this.pagination = this.setPaginationOptions(returnedData);
                    this.tablePagination = {
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.perPage,
                        rowsNumber: this.pagination.total,
                        sortBy,
                        descending
                    };
                    this.loading = false;
                });
            },

            // emulate api call
            fetchFromServer ({page, perPage, sortBy, descending}) {

                const total = this.tableData.items.length;
                const startRow = (page - 1) * perPage;
                const count = perPage === 0 ? total : perPage;
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
                    perPage: perPage,
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