<template>
    <f-table
        :tabs-data="headerTabs"
        :header-help-text="$trans('payment_requests')"
    >
        <template v-slot:header-left>
            <span class="text-tertiary">Payment requests</span>
        </template>

        <template v-slot:header-right>
            <q-toggle
                v-model="isDark"
                :label="$trans('toggle_theme')"
                left-label
                dense
                color="blue"
            />
        </template>

        <template v-slot:control-left>
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
                    class="q-mx-sm"
                >
                    <q-badge
                        v-if="tab.badge"
                        class="q-ml-xs"
                        v-text="tab.badge"
                    />
                </q-tab>
            </q-tabs>

        </template>

        <template v-slot:control-right>
            <div class="q-gutter-xs">
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

        <template v-slot:content>
            <q-tab-panels
                v-model="selectedTab"
                animated>
                <q-tab-panel
                    v-for="tab in tabs"
                    :key="tab.name"
                    :name="tab.name"
                    class="q-pa-none">
                    <div class="row">
                        <div class="col q-pa-md border-bottom">
                            FILTER <span v-text="tab.name" />
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
                        @request="getTableData"
                    />
                </q-tab-panel>

            </q-tab-panels>
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
    import _ from 'lodash';
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
                isDark: false,
                headerTabs: [
                    { name: 'requests', badge: '$300.00' },
                    { name: 'payments', badge: '$02.00' },
                    { name: 'paid', badge: 'Feb $100K' },
                    { name: 'rejected',  badge: 'Feb $900' }
                ],
                selectedTab: 'requests',
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
        watch: {
            isDark: function (val) {
                this.$q.dark.set(val);
            }
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
