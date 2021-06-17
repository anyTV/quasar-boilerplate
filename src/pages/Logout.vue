<template>
    <div>
        <q-toolbar class="bg-primary shadow-2 q-pa-sm content-center">
            <q-avatar>
                <img src="statics/app-logo.png">
            </q-avatar>

            <q-toolbar-title class="title">
                <span v-text="$trans('quasar_boilerplate')"/>
            </q-toolbar-title>

            <q-space />

            <a
                id="logout-link"
                :href="logoutUrl"
            >
                <q-btn
                    :label="$trans('logout')"
                    text-color="white"
                    color="secondary"
                    flat
                />
            </a>
        </q-toolbar>
    </div>
</template>

<script>
    import URLs from 'src/mixins/urls';
    export default {
        name: 'LandingPage',
        mixins: [
            URLs
        ],
    };
</script>

<style lang="stylus" scoped>
    span
        color white
    section
        height 100%
    #login-link
        text-decoration none
    .main-content
        min-height 90vh
</style>
