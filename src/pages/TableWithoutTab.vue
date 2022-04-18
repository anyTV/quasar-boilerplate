<template>
    <f-table>
        <template #header-left>
            <q-breadcrumbs
                active-color="tertiary"
                separator-color="tertiary"
            >
                <template #separator>
                    <q-icon
                        size="1.3em"
                        name="chevron_right"
                    />
                </template>
                <q-breadcrumbs-el
                    v-for="breadcrumb in breadcrumbs"
                    :key="breadcrumb.label"
                    :label="$trans(breadcrumb.label)"
                    :to="breadcrumb.to"
                />
            </q-breadcrumbs>
        </template>

        <template #header-right>
            <div class="text-tertiary">
                <span v-text="$trans('additional_info')" />
                <q-icon
                    name="warning_amber"
                    class="q-px-xs"
                />
                <q-icon
                    name="error_outline"
                    class="q-px-xs"
                />
            </div>
        </template>

        <template #control-left>
            <div
                class="text-h5"
                v-text="tableTitle"
            />
        </template>

        <template #control-right>
            <div class="q-gutter-xs q-pb-xs">
                <q-toggle
                    v-model="isDark"
                    :label="$trans('toggle_theme')"
                    left-label
                    color="blue"
                />
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

        <template #content>
            <div class="row">
                <div class="col q-pa-md border-bottom">
                    <span v-text="$trans('filter')" />
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
                class="f-table"
                @request="getTableData"
            />
        </template>

        <template #paginate>
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
                isDark: false,
                tableTitle: this.$trans('table_title'),
                breadcrumbs: [
                    {label: 'home', to: '/'},
                    {label: 'channel', to: '/table-with-tabs-2'},
                    {label: 'user', to: '/table-with-tabs'},
                    {label: 'freedom_id'},
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
