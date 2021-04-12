<template>
    <div class="q-px-none q-py-sm table-pagination">
        <div
            v-if="pageHeader"
            class="row"
        >
            <div class="flex col-xs-12 col-md-6 q-pa-md">
                <slot name="header-left">
                    <span
                        v-if="headerHelpText"
                        class="text-grey-8"
                        v-text="headerHelpText"/>

                    <q-breadcrumbs
                        v-else-if="breadcrumbs.length > 0">
                        <template v-slot:separator>
                            <q-icon
                                size="1.3em"
                                name="chevron_right"
                                color="grey-7"
                            />
                        </template>
                        <q-breadcrumbs-el
                            v-for="breadcrumb in breadcrumbs"
                            :label="$trans(breadcrumb.label)"
                            :key="breadcrumb.label"
                            :to="breadcrumb.to"
                            class="text-grey-7"
                        />
                    </q-breadcrumbs>

                </slot>
            </div>
            <div class="col-xs-12 col-md-6">
                <div class="float-right">
                    <slot name="header-right" />
                </div>
            </div>
        </div>

        <div class="row lt-md">
            <div class="col-xs-12 border-bottom-grey">
                <div class="float-right q-mb-sm q-mx-sm">
                    <slot name="control-right" />
                </div>
            </div>
        </div>

        <div class="row">
            <div
                :class="tabIndicatorColor === 'transparent' ? 'q-pa-sm' : ''"
                class="col-xs-12 col-md-6 border-bottom-grey "
            >
                <slot name="control-left">

                    <div
                        v-if="tableTitle"
                        class="text-h5 q-pa-md"
                        v-text="tableTitle"
                    />
                    <q-tabs
                        v-else
                        v-model="selectedTab"
                        :indicator-color="tabIndicatorColor"
                        :active-color="tabIndicatorColor === 'transparent' ? 'white' : 'primary'"
                        :class="tabIndicatorColor === 'transparent' ? 'pa-xs' : ''"
                        inline-label
                        no-caps
                        stretch
                        align="left"
                    >
                        <q-tab
                            v-for="tab in tabs"
                            :key="tab.name"
                            v-bind="tab"
                            :name="tab.name"
                            content-class="tab-content-class"
                            class="text-weight-regular q-mx-sm"
                            label=""
                        >
                            <span v-text="tab.label" />
                            <q-badge
                                v-if="tab.badge"
                                class="q-ml-xs"
                                v-text="tab.badge"/>
                        </q-tab>
                    </q-tabs>
                </slot>
            </div>
            <div class="col-xs-12 col-md-6 border-bottom-grey gt-sm">
                <div class="float-right q-pr-md">
                    <slot name="control-right" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">

                <q-tab-panels
                    v-model="selectedTab"
                    animated>
                    <q-tab-panel
                        v-for="tab in tabs"
                        :key="tab.name"
                        :name="tab.name"
                        class="q-pa-none">
                        <div class="row">
                            <div class="col q-pa-md border-bottom-grey">
                                <slot :name="'filter_' + tab.name"/>
                            </div>
                        </div>
                        <slot :name="'table_' + tab.name"/>
                    </q-tab-panel>

                </q-tab-panels>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <q-footer class="page-footer">
                    <div
                        class="q-px-md pagination">
                        <slot name="paginate" />
                    </div>
                </q-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'FTable',
        props: {
            pageHeader: {
                type: Boolean,
                default: true
            },
            tableTitle: {
                type: String,
                default: ''
            },
            TabsData: {
                type: Array,
                default: () => []
            },
            breadcrumbs: {
                type: Array,
                default: () => []
            },
            headerHelpText: {
                type: String,
                default: ''
            },
            defaultTab: {
                type: String,
                default: ''
            },
            tabIndicatorColor: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                selectedTab: '',
            };
        },
        computed: {
            tabs() {
                return this.TabsData.map(tab => {
                    return {
                        ...tab,
                        label: this.$trans(_.snakeCase(tab.name)),
                    };
                });
            },
        },
        created() {
            this.selectedTab = this.defaultTab ? this.defaultTab : _.first(this.tabs).name;
        },
    };
</script>

<style scoped lang="stylus">
    .border-bottom-grey
        border-bottom: 1px solid $grey-5

    .tab-content-class
        font-weight 600

    .pagination
        background #FFFFFF 0% 0% no-repeat padding-box
        box-shadow 0px -1px 3px #0000001A
        border-radius 0px 0px 8px 8px
        opacity 1

    .page-footer
        background transparent

    body.body--dark
        .q-tab
            border-radius: 5px

        .q-badge
            background $grey-9
            color $fff

        .q-tab--active
            background $grey-9
            .q-badge
                color $grey-8

        .pagination
            background #000
            color $fff
</style>

<style lang="stylus">
    .table-pagination
        .tab-content-class
            font-weight 600

    body.body--dark
        .table-pagination
            .tab-content-class
                font-weight 500

        .tab-content-class
            color $grey-5

        .q-tab--active
            .tab-content-class
                color #fff
            .q-badge
                background #fff
                color $grey-10
</style>