<template>
    <div />
</template>

<script>
    import URLs from 'src/mixins/urls';
    import config from 'src/config';

    export default {
        mixins: [
            URLs
        ],

        mounted() {
            this.$q.loading.show({ message: this.$trans('logging_out') });
            this.logout();
        },

        methods: {
            async logout() {
                try {
                    await this.$adminAPI.$post(config.API.LOGOUT);
                    this.$notify.success('logged_out_notice');
                }
                catch (error) {
                    this.$notify.error(error.message);
                }
                finally {
                    this.$q.localStorage.clear();
                    window.location.assign(this.logoutUrl);
                }
            },
        }
    };
</script>