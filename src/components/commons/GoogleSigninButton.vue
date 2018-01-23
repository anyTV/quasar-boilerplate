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
     *   @success="successHandler"
     *   @error="errorHandler"
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
            grantOfflineAccess: {
                type: Boolean,
                default: true,
            }
        },

        methods: {
            signIn() {
                this.$googleAPI.init()
                    .then(() => {
                        this.$googleAPI.grantOfflineAccess(this.grantOfflineAccess);
                        this.$googleAPI.signIn()
                            .then(googleUser => this.$emit('success', googleUser))
                            .catch(error => this.$emit('error', error));
                    });
            }
        },
    };
</script>
<style>
</style>
