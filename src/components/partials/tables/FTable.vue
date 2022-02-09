<template>
    <div class="q-px-none">
        <div
            v-if="pageHeader"
            class="row items-center justify-between q-pa-sm"
        >
            <div class="col-auto">
                <slot name="header-left" />
            </div>
            <div class="col-auto">
                <slot name="header-right" />
            </div>
        </div>

        <q-separator />

        <div class="row justify-end lt-md q-pr-md">
            <div class="col-auto">
                <slot name="control-right" />
            </div>
        </div>

        <div class="row items-center justify-between q-px-md">
            <div class="col-auto">
                <slot name="control-left" />
            </div>
            <div class="col-auto gt-sm">
                <slot name="control-right" />
            </div>
        </div>

        <q-separator />

        <div class="row items-center">
            <slot
                class="col"
                name="filters"
            />
            <slot
                class="col-auto"
                name="sort"
            />
        </div>

        <q-separator />

        <div class="row">
            <div
                :style="style"
                class="col"
            >
                <slot name="content" />
            </div>
        </div>

        <div
            v-if="embedded"
            class="page-footer"
        >
            <div class="q-px-md">
                <slot name="embedded-paginate" />
            </div>
        </div>

        <q-footer
            v-else
            class="page-footer"
        >
            <div class="q-px-md pagination shadow-2">
                <slot name="paginate" />
            </div>
        </q-footer>
    </div>
</template>

<script>
    export default {
        name: 'FTable',
        props: {
            pageHeader: {
                type: Boolean,
                default: true,
            },
            height: {
                type: String,
                default: '123px',
            },
            embedded: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            style() {
                if (this.embedded) {
                    return '';
                }

                return this.height === 'auto' ? 'height: auto' : `height: calc(100vh - ${this.height})`;
            },
        },
    };
</script>

<style scoped lang="stylus">
    .pagination
        background var(--q-color-pagination)
</style>

<style lang="stylus">
    body
        .f-table .q-table
            height calc(100vh - 103px)
</style>
