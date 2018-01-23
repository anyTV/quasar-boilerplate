<template>
    <q-btn
        :icon="icon"
        :color="color"
        @click="signIn"
    >
        <slot>
            {{ 'sign-in' | $t }}
        </slot>
    </q-btn>
</template>
<script>
    /**
     * Usage:
     * <google-signin-button
     *   @googleSignIn:success="successHandler"
     *   @googleSignIn:error="errorHandler"
     *   icon="account_circle"
     *   color="green"
     * >
     *   Login
     * </google-signin-button>
     */
    import { QBtn } from 'quasar';

    export default {
        name: 'google-signin-button',

        components: {
            QBtn,
        },

        props: {
            icon: {
                type: String,
                default: 'account_circle',
            },
            color: {
                type: String,
                default: 'primary',
            },
        },

        methods: {
            signIn() {
                this.$googleAPI.init()
                    .then(() => {
                        this.$googleAPI.signIn()
                            .then(googleUser => this.$emit('googleSignIn:success', googleUser))
                            .catch(error => this.$emit('googleSignIn:error', error));
                    });
            }
        },
    };
</script>
<style>
</style>
