<template>
    <div>
        <form-field
            v-for="(field, index) in form"
            :key="index"
            v-model="field.value"
            v-bind="field"
            :error="$v.form[index].value.$error"
            :error-label="form[index].field.errorLabel"
        />
    </div>
</template>

<script>
    import FormField from '@/partials/form/FormField';

    const validations = {
        form: {
            field1: {
                value: {}
            }
        }
    };

    export default {
        name: '',

        components: {
            FormField,
        },

        data() {
            return {
                form: {
                    field1: {
                        type: 'input', // required, will resolve to `q-${type}`
                        value: null, // required, initial value of model
                        validation: {}, // optional, specific input validation
                        field: {}, // optional, QField properties
                        fieldInput: {} // depends on type, `q-${type}` properties
                    }
                }
            };
        },

        validations,
    };
</script>

<style lang="stylus" scoped>
</style>
