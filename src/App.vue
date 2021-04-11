<template>
    <div id="q-app">
        <q-layout view="hHr LpR lFf">
            <router-view v-waitForT/>
        </q-layout>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>

<style lang="stylus">
    body.body--dark
        background: var(--q-color-dark)
</style>
