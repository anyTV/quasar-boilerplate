<template>
    <f-table :height="'83px'">
        <template v-slot:header-left>
            <q-breadcrumbs
                active-color="tertiary"
                separator-color="tertiary"
            >
                <template v-slot:separator>
                    <q-icon
                        size="1.3em"
                        name="chevron_right"
                    />
                </template>
                <q-breadcrumbs-el
                    v-for="breadcrumb in breadcrumbs"
                    :label="$trans(breadcrumb.label)"
                    :key="breadcrumb.label"
                    :to="breadcrumb.to"
                />
            </q-breadcrumbs>
        </template>

        <template v-slot:header-right>
            <div class="text-tertiary">
                <span v-text="$trans('additional_info')"/>
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

        <template v-slot:control-left>
            <div class="q-gutter-xs q-pb-xs">
                <div
                    class="text-h5"
                    v-text="tableTitle"
                />
                <q-badge color="secondary" multi-line>
                    Filters: "{{ search_filters }}"
                </q-badge>
            </div>
        </template>
        
        <template v-slot:filters>
            <f-filter
                :filter-fields="filter_fields"
                class="col"
                @search="on_filter_search"
            />
        </template>

        <template v-slot:control-right>
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

        <template v-slot:content>
            <q-table
                :data="requestTabData"
                :columns="columns"
                :loading="loading"
                :pagination.sync="tablePagination"
                binary-state-sort
                flat
                row-key="id"
                class="stick-header-table"
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
    import tableData from 'src/sample/tableData/tableWithFFilter';
    import tableColumns from 'src/sample/tableColumns/tableWithFFilter';
    import UtilMixin from 'src/mixins/utils';
    import { integer } from 'vuelidate/lib/validators';
    import {
        isValidStrictDateFormat,
    } from 'src/helpers/custom-validators';
    import config from 'src/config';

    export default {
        name: 'TableWithTabs',
        components: { FTable, FPaginate },
        mixins: [
            UtilMixin
        ],
        data () {
            return {
                isDark: false,
                tableTitle: this.$trans('table_title_no_filter'),
                breadcrumbs: [
                    {label: 'home', to: '/'},
                    {label: 'channel', to: '/table-with-tabs-2'},
                    {label: 'user', to: '/table-with-tabs'},
                    {label: 'freedom_id'},
                ],
                loading: false,
                tableData,
                tableColumns,
                requestTabData: [],
                tablePagination: {
                    ...pageConfig.default,
                    sortBy: 'id',
                    descending: false
                },
                filter_fields: {
                    name: {},
                    user_id: {
                        rule: integer,
                        caption: 'with_integer_rule',
                    },
                    user_type: {
                        options: [
                            'admin',
                            'superadmin',
                            'user',
                        ],
                    },
                    status: {
                        options: [{
                            value: 'accepted',
                            label: 'Accepted'
                        },{
                            value: 'pending',
                            label: 'Pending'
                        },{
                            value: 'rejected',
                            label: 'Rejected'
                        }],
                    },
                    status_with_format: {
                        label: 'status',
                        caption: 'with_format',
                        options: [{
                            value: 'accepted',
                            label: 'Accepted'
                        },{
                            value: 'pending',
                            label: 'Pending'
                        },{
                            value: 'rejected',
                            label: 'Rejected'
                        }],
                        format: (val) => val
                    },
                    status_multiselect: {
                        label: 'status',
                        caption: 'multiselect',
                        options: [{
                            value: 'accepted',
                            label: 'Accepted'
                        },{
                            value: 'pending',
                            label: 'Pending'
                        },{
                            value: 'rejected',
                            label: 'Rejected'
                        }],
                        multiselect: true,
                    },
                    likes: {
                        conditions: ['>', '>=', '=', '!=', '<=', '<'],
                        rule: integer,
                    },
                    birthday: {
                        label: 'birth_date',
                        date: true,
                        date_format: config.date.formats.ISO_DATE,
                        default_view: 'calendar',
                        rule: isValidStrictDateFormat
                    },
                },
                search_filters: {},
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

            on_filter_search(filters) {
                this.search_filters = filters;
            },
        }
    };
</script>

<style lang="stylus" scoped>
    .stick-header-table
          height calc(100% - 100px)
</style>
