<template>
    <div>
        <f-table
            :page-header="false"
        >
            <template #control-left>
                <q-tabs
                    v-model="selectedTab"
                    inline-label
                    no-caps
                    stretch
                    align="left"
                    class="f-tabs"
                >
                    <q-tab
                        v-for="tab in tabs"
                        :key="tab.name"
                        v-bind="tab"
                        :name="tab.name"
                        :label="tab.label"
                    >
                        <q-badge
                            v-if="tab.badge"
                            class="q-ml-xs"
                            v-text="tab.badge"
                        />
                    </q-tab>
                </q-tabs>
            </template>

            <template #content>
                <q-tab-panels
                    v-model="selectedTab"
                    animated
                >
                    <q-tab-panel
                        v-for="tab in tabs"
                        :key="tab.name"
                        :name="tab.name"
                        class="q-pa-none"
                    >
                        <div class="row">
                            <div class="col q-pa-md border-bottom">
                                <span v-text="$trans('filter')" />
                                <span v-text="tab.name" />
                            </div>
                        </div>
                        <q-table
                            :data="requestTabData"
                            :columns="columns"
                            :hide-bottom="hideBottom"
                            :loading="loading"
                            :pagination.sync="tablePagination"
                            binary-state-sort
                            row-key="id"
                            class="stick-header-table"
                            @request="getTableData"
                        />
                    </q-tab-panel>
                </q-tab-panels>
            </template>

            <template #paginate>
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
    import _ from 'lodash';
    import FPaginate from "src/components/common/FPaginate";
    import pageConfig from 'src/config/pagination';
    import tableData from 'src/sample/tableData/tableWithTabs';
    import tableColumns from 'src/sample/tableColumns/tableWithTabs';
    import UtilMixin from 'src/mixins/utils';

    export default {
        name: 'TableWithTabs',
        components: { FPaginate },
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
            tabs() {
                return this.headerTabs.map(tab => {
                    return {
                        ...tab,
                        label: this.$trans(_.snakeCase(tab.name)),
                    };
                });
            },
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

<style lang="stylus" scoped>
    .stick-header-table
          height calc(100% - 100px)
</style>
