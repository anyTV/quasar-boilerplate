<template>
    <!-- Configure "view" prop for QLayout -->
    <!-- For more info regarding usage, visit http://quasar-framework.org/components/layout.html -->
    <q-layout>
        <router-view/>
    </q-layout>
</template>

<script>
    import {
        QLayout
    } from 'quasar';

    export default {
        components: {
            QLayout
        },

        data() {
            return {};
        }
    };
</script>

<style>
</style>
