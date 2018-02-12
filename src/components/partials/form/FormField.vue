<template>
    <q-field v-bind="fieldProps">
        <component
            v-bind="fieldInputProps"
            :is="`q-${type}`"
            :error="$v.fieldModel.$error"
            @blur="$v.fieldModel.$touch"
            :value="fieldModel"
            @input="updateValue"
            :ref="ref"
            v-on="$listeners"
        >
            <slot />
        </component>
    </q-field>
</template>

<script>
    import _ from 'lodash';
    import {
        QCheckbox,
        QChipsInput,
        QDatetime,
        QDatetimeRange,
        QDialogSelect,
        QField,
        QInlineDatetime,
        QInput,
        QKnob,
        QOptionGroup,
        QRadio,
        QRange,
        QRating,
        QSearch,
        QSelect,
        QSlider,
        QToggle,
        QUploader,
    } from 'quasar';
    import FormFieldMixin from 'src/mixins/partials/form/form-field';

    export default {
        name: 'FormField',

        mixins: [FormFieldMixin],

        components: {
            QCheckbox,
            QChipsInput,
            QDatetime,
            QDatetimeRange,
            QDialogSelect,
            QField,
            QInlineDatetime,
            QInput,
            QKnob,
            QOptionGroup,
            QRadio,
            QRange,
            QRating,
            QSearch,
            QSelect,
            QSlider,
            QToggle,
            QUploader,
        },

        props: {
            type: String,
            model: {
                required: true,
            },
            fieldProps: {
                type: Object,
                validator(fieldProps) {
                    return _.isPlainObject(fieldProps.validation);
                }
            },
            fieldInputProps: Object,
        },

        data() {
            return {
                fieldModel: this.model,
            };
        },

        validations() {
            return {
                fieldModel: this.fieldProps.validation,
            };
        },

        methods: {
            updateValue(value) {
                this.fieldModel = value;
                this.$emit('input', value);
            },
        }
    };
</script>

<style>
</style>
