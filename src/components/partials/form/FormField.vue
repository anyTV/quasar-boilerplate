<template>
    <q-field
        v-bind="field"
        :error-label="errorLabel"
    >
        <component
            v-bind="fieldInput"
            :is="`q-${type}`"
            :error="error || $v.value.$error"
            @blur="$v.value.$touch"
            :value="value"
            :ref="ref"
            v-on="$listeners"
        >
            <slot />
        </component>
    </q-field>
</template>

<script>
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
            type: {
                type: String,
                required: true,
            },
            value: {
                required: true,
            },
            field: Object,
            validation: {
                default() {
                    return {};
                }
            },
            fieldInput: Object,
            error: Boolean,
            errorLabel: String
        },

        validations() {
            return {
                value: this.validation,
            };
        },
    };
</script>

<style>
</style>
