<template>
    <div class="q-px-none q-py-sm table-pagination">
        <div
            v-if="pageHeader"
            class="row items-center justify-between q-pa-md"
        >
            <div class="col-auto">
                <slot name="header-left" />
            </div>
            <div class="col-auto">
                <slot name="header-right" />
            </div>
        </div>

        <div class="row justify-end lt-md q-pr-md">
            <div class="col-auto border-bottom">
                <slot name="control-right" />
            </div>
        </div>

        <div class="row items-center justify-between border-bottom q-px-md">
            <div class="col-auto">
                <slot name="control-left" />
            </div>
            <div class="col-auto gt-sm">
                <slot name="control-right" />
            </div>
        </div>

        <div class="row">
            <div class="col">
                <slot name="content" />
            </div>
        </div>

        <q-footer class="page-footer">
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
                default: true
            }
        }
    };
</script>
<style scoped lang="stylus">
    .pagination
        background var(--q-color-pagination)
</style>