<template>
    <div
        class="q-px-none q-py-sm" >

        <div class="row">
            <div class="col flex">
                <slot name="header-left">
                    <span
                        v-if="headerHelpText"
                        class="q-pa-md"
                        v-text="headerHelpText"/>

                    <q-breadcrumbs
                        v-else-if="breadcrumbs.length > 0">
                        <q-breadcrumbs-el
                            v-for="breadcrumb in breadcrumbs"
                            :label="breadcrumb.label"
                            :key="breadcrumb.label"
                            :to="breadcrumb.to" />
                    </q-breadcrumbs>

                </slot>
            </div>
            <div class="col">
                <div class="float-right">
                    <slot name="header-right" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col border-bottom-grey">
                <slot name="control-left">
                    <q-tabs
                        v-model="selectedTab"
                        inline-label
                        shrink
                        no-caps
                        stretch
                        align="left"
                        active-color="primary"
                    >
                        <q-tab
                            v-for="tab in TabsData"
                            :key="tab.name"
                            v-bind="tab"
                            :name="tab.name"
                        >
                            <span
                                class="text-weight-bolder q-mr-xs"
                                v-text="tab.name"/>
                            <q-badge
                                :color="tab.name === selectedTab ? 'blue':'grey'"
                                v-text="tab.badge"/>
                        </q-tab>
                    </q-tabs>
                </slot>
            </div>
            <div class="col border-bottom-grey">
                <div class="float-right">
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
                        v-for="tab in TabsData"
                        :key="tab.name"
                        :name="tab.name"
                        class="q-pa-none">
                        <div class="row">
                            <div class="col q-pa-sm border-bottom-grey">
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
                <q-footer class="bg-white text-black page-footer">
                    <div class="q-px-md pagination">
                        <slot name="paginate" />
                    </div>
                </q-footer>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'FTable',
        props: {
            TabsData: {
                type: Array,
                default () {
                    return [];
                }
            },
            breadcrumbs: {
                type: Array,
                default () {
                    return [];
                }
            },
            headerHelpText: {
                type: String,
                default () {
                    return '';
                }
            },
            selectedTab: {
                type: String,
                default () {
                    return '';
                }
            }
        }
    };
</script>

<style scoped>
    .border-bottom-grey {
        border-bottom: 1px solid grey;
    }
</style>