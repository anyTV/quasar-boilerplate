<template>
    <div/>
</template>

<script>
    import config from 'src/config';

    export default {
        async mounted() {
            const oauth = config.AUTH_SERVER.OAUTH;
            let payload = {
                code: this.$route.query.code,
                redirect_uri: oauth.REDIRECT_URL,
                grant_type: 'authorization_code'
            };

            this.$q.loading.show({ message: this.$trans('logging_in') });
            await this.authenticateUser(payload);
        },
        methods: {
            async authenticateUser(payload) {
                try {
                    let response = await this.$adminAPI.$post(config.API.LOGIN, payload);
                    this.$q.loading.hide();
                    this.$q.localStorage.set('GOOGLE_TOKEN', payload.code);
                    this.$q.localStorage.set('PROFILE', response.data.user);
                    this.$jwt.setToken(response.data.accessToken);

                    return this.$router.push('/logoutpage');
                }
                catch (error) {
                    this.$q.loading.hide();
                    await this.$router.push('/');

                    if (!this.$route.query.code) {
                        return this.$notify.error('oauth_denied_error');
                    }

                    this.$notify.error(error.message);
                }
            }
        }
    };
</script>

<style>
</style>
