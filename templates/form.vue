<template>
    <div>
        <form-field
            v-for="(field, index) in form"
            :key="index"
            v-model="field.value"
            v-bind="field"
        />
    </div>
</template>

<script>
    import FormField from '@/partials/form/FormField';

    export default {
        name: '',

        components: {
            FormField,
        },

        data() {
            return {
                form: [
                    {
                        type: 'input', // will resolve to `q-${type}`
                        value: null, // initial value of model
                        validation: {}, // input validation using Vuelidate
                        field: {}, // QField properties
                        fieldInput: {} // `q-${type}` properties
                    }
                ]
            };
        },
    };
</script>

<style lang="stylus" scoped>
</style>
