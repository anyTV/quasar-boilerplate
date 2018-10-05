<template>
    <div
        class="relative-position f-year-month-picker-container non-selectable"
        :class="{'no-pointer-events': disable, 'text-grey': disable, 'disabled': disable}"
    >
        <div
            class="btn-dropdown"
            @click="openPickerPopover"
        >
            <div class="q-if-label q-if-label-above absolute picker-label">{{ label }}</div>
            <div class="btn-dropdown-content">
                {{ displayValue }}
                <q-icon name="arrow_drop_down" size="18px"></q-icon>
            </div>
            <q-popover
                v-model="isPickerPopoverVisible"
                class="year-month-popover"
            >
                <q-list v-if="isPickerPopoverVisible">
                    <q-collapsible
                        v-for="(year, index) in yearOptions"
                        :disabled="!isYearInRange(year)"
                        :key="index"
                        :label="year.toString()"
                        :opened="isCurrentYear(year)"
                        :class="{
                            'active-option': isCurrentYear(year),
                            'no-pointer-events': !isYearInRange(year)
                        }"
                        group="year-picker"
                    >
                        <q-list
                            dense
                            highlight
                            no-border
                            class="no-padding"
                        >
                            <div v-for="(month, monthIndex) in monthOptions">
                                <q-item
                                    highlight
                                    :disabled="!isInRange(year, monthIndex)"
                                    :key="monthIndex"
                                    class="cursor-pointer month-options"
                                    :class="{
                                        'active-option': isCurrentMonth(year, monthIndex),
                                        'no-pointer-events': !isInRange(year, monthIndex)
                                    }"
                                    @click="updateSelectedValue(year, monthIndex)"
                                >
                                    {{ month }}
                                </q-item>
                                <q-tooltip
                                    v-if="!isInRange(year, monthIndex) && outOfRangeTooltip"
                                    :delay="500"
                                >
                                    {{ outOfRangeTooltip }}
                                </q-tooltip>
                            </div>
                        </q-list>
                    </q-collapsible>
                </q-list>
            </q-popover>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import config from 'config';

    export default {
        name: 'FYearMonthPicker',

        props: {
            value: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: 'Select date',
            },
            maxYearMonth: {
                type: String,
                default: moment().format(config.date.formats.YEAR_MONTH),
            },
            minYearMonth: {
                type: String,
                default: null,
            },
            yearRange: {
                type: Number,
                default: 20,
            },
            disable: {
                type: Boolean,
                default: false,
            },
            outOfRangeTooltip: {
                type: String,
                default: ''
            },
            monthOptions: {
                type: [Array, Object],
                default: () => [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
            }
        },

        data() {
            return {
                isPickerPopoverVisible: false,
            };
        },

        computed: {
            displayValue() {
                const dateValue = moment(this.value, config.date.formats.YEAR_MONTH);
                return dateValue.isValid() ? dateValue.format(config.date.formats.MONTH_YEAR) : this.placeholder;
            },

            maxYear() {
                return moment(this.maxYearMonth, config.date.formats.YEAR_MONTH).format('YYYY');
            },

            maxMonth() {
                return moment(this.maxYearMonth, config.date.formats.YEAR_MONTH).format('MM');
            },

            minYear() {
                return this.minYearMonth
                    ? moment(this.minYearMonth, config.date.formats.YEAR_MONTH).format('YYYY')
                    : null;
            },

            minMonth() {
                return this.minYearMonth
                    ? moment(this.minYearMonth, config.date.formats.YEAR_MONTH).format('MM')
                    : null;
            },

            currentYear() {
                return moment(this.value, config.date.formats.YEAR_MONTH).format('YYYY');
            },

            currentMonth() {
                return moment(this.value, config.date.formats.YEAR_MONTH).format('MM');
            },

            yearOptions() {
                return _.map(_.range(this.yearRange), offset => this.maxYear - offset);
            },
        },

        methods: {
            openPickerPopover() {
                this.isPickerPopoverVisible = true;
            },

            closePickerPopover() {
                this.isPickerPopoverVisible = false;
            },

            updateSelectedValue(year, monthIndex) {
                const month = moment().year(year).month(monthIndex).format(config.date.formats.YEAR_MONTH);
                this.$emit('input', month);
                this.closePickerPopover();
            },

            isInRange(year, monthIndex) {
                if (
                    parseInt(this.minYear) === parseInt(this.maxYear)
                    && year === parseInt(this.minYear)
                ) {
                    return monthIndex + 1 >= this.minMonth
                        && monthIndex + 1 <= this.maxMonth;
                }

                if (year === parseInt(this.minYear)) {
                    return monthIndex + 1 >= this.minMonth;
                }

                if (year === parseInt(this.maxYear)) {
                    return monthIndex + 1 <= this.maxMonth;
                }

                return this.isYearInRange(year);
            },

            isYearInRange(year) {
                return year >= this.minYear
                    && year <= this.maxYear;
            },

            isCurrentMonth(year, monthIndex) {
                return this.isCurrentYear(year)
                    && monthIndex + 1 === parseInt(this.currentMonth);
            },

            isCurrentYear(year) {
                return year === parseInt(this.currentYear);
            }

        }
    };
</script>

<style scoped lang="stylus">
    @import '~variables'

    .f-year-month-picker-container
        padding 4px 0

    .year-month-popover
        width 160px
        max-width 100%

    .month-options
        padding 4px 8px

    .active-option
    .month-options.active-option
        font-weight bold
        color $primary

    .month-options:not(.active-option)
        font-weight normal
        color $dark

    .btn-dropdown
        cursor pointer
        height 42px
        margin 16px 0 8px
        width 100%
        position relative
        border-bottom 1px solid rgba(0, 0, 0, 0.12)
        display flex
        align-items center
        bottom 5.5px

    .btn-dropdown .btn-dropdown-content
        display flex
        width 100%
        justify-content space-between
        align-items baseline
        height 18px

    .picker-label
        font-size 14px
</style>
