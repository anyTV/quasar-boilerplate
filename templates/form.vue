<template>
    <div>
        <form-field
            v-for="(field, index) in form"
            :key="index"
            v-model="field.model"
            v-bind="field.config"
            :type="field.type"
            :model="field.model"
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
                        type: 'input',
                        model: null,
                        config: {
                            fieldProps: {
                                validation: {},
                            },
                            fieldInputProps: {}
                        },
                    }
                ]
            };
        },
    };
</script>

<style lang="stylus" scoped>
</style>
