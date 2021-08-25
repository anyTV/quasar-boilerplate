<template>
    <div
        v-show="!asNeeded || pageMax > 1"
        class="f-paginate row justify-between items-center text-grey-7"
    >
        <div
            v-if="showItemsTotal"
            v-text="getItemsTotal(value.rowsNumber)"
        />

        <div
            :class="{'justify-end': alignEnd}"
            class="col row items-center"
        >
            <div
                v-if="!noPerPage && !isXs"
                class="col-auto q-pa-sm"
                v-text="$trans(checkPerPageMessage)"
            />
            <q-select
                v-if="!noPerPage"
                :model-value="value.rowsPerPage"
                :options="perPageOptions"
                :disable="disable"
                class="paginate-select"
                dense
                borderless
                @update:modelValue="setPerPage"
            />
        </div>
        <div class="col-auto">
            <q-pagination
                :model-value="value.page"
                :max="pageMax"
                :disable="disable"
                input
                @update:modelValue="setPage"
            />
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import UtilMixin, { arrayToOptions } from 'src/mixins/utils';
    import pageConfig from 'src/config/pagination';

    export default {
        name: 'FPaginate',

        mixins: [
            UtilMixin,
        ],

        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            noPerPage: {
                type: Boolean,
                default: false,
            },
            asNeeded: {
                type: Boolean,
                default: false,
            },
            alignEnd: {
                type: Boolean,
                default: false,
            },
            disable: {
                type: Boolean,
                default: false,
            },
            perPageText: {
                type: String,
                default: ''
            },
            totalItemsText: {
                type: String,
                default: ''
            },
            showItemsTotal: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                perPageOptions: arrayToOptions(pageConfig.perPageOptions),
            };
        },

        computed: {
            isXs() {
                return this.$q.screen.xs;
            },

            pageMax() {
                return Math.ceil(this.value.rowsNumber / this.value.rowsPerPage) || 1;
            },

            checkPerPageMessage() {
                return this.perPageText
                    ? this.perPageText
                    : 'results-per-page';
            }
        },

        methods: {
            setPerPage(newPerPage) {
                const newPagination = _.cloneDeep(this.value);

                newPagination.page = 1;
                newPagination.rowsPerPage = newPerPage.value;
                this.$emit('input', newPagination);
                this.$emit('change', { rowsPerPage: newPerPage.value });
            },

            setPage(newPage) {
                const newPagination = _.cloneDeep(this.value);

                newPagination.page = newPage;
                this.$emit('input', newPagination);
                this.$emit('change', { page: newPage });
            },

            getItemsTotal(value) {
                const txt =  this.totalItemsText ? this.totalItemsText : 'total-item';
                return `${value} ${this.$trans(txt)}`;
            }
        }
    };
</script>

<style scoped lang="stylus">
    .pad-items > div
        padding 0 8px

    .q-btn
        margin-bottom 8px

    .f-paginate
        font-size 14px

    .vertical-align-middle
        vertical-align middle
</style>

<style lang="stylus">
    .paginate-select .q-field__native{
        color: $grey-7;
    }
</style>