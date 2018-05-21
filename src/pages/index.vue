<template>
  <q-page class="flex flex-center">
    <img
      :src="appLogo"
      alt="App Logo"
    >
  </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'PageIndex',

    computed: {
      appLogo() {
        return 'statics/app-logo.png';
      }
    }
  };
</script>
