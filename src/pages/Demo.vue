<template>
    <q-page class="flex flex-center">
      
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Demo',

    setup() {
        
    },

    created() {
        // Sample usage for notify
        this.$notify.success('hello');
    },
});
</script>
