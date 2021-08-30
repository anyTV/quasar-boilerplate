<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title>
                    <q-avatar>
                        <q-img src="app-logo.png" />
                    </q-avatar>
                    <span
                        v-text="'App Name'"
                        class="q-ml-sm"
                    />
                </q-toolbar-title>

                <div>
                    <span
                        v-text="'Username'"
                        class="q-mr-sm"
                    />
                    <q-avatar>
                        <q-img src="app-logo.png" />
                    </q-avatar>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="bg-grey-1"
        >
            <q-list>
                <q-item-label header class="text-grey-8">
                    Navigation Links
                </q-item-label>

                <NavigationLink
                    v-for="link in navigationLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import NavigationLink from 'components/NavigationLink.vue';

const navigationLinks = [
    {
        title: 'Docs',
        caption: 'quasar.dev',
        icon: 'school',
        link: 'https://quasar.dev',
    },
    {
        title: 'Github',
        caption: 'github.com/quasarframework',
        icon: 'code',
        link: 'https://github.com/quasarframework',
    },
    {
        title: 'Discord Chat Channel',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev',
    },
    {
        title: 'Forum',
        caption: 'forum.quasar.dev',
        icon: 'record_voice_over',
        link: 'https://forum.quasar.dev',
    },
    {
        title: 'Twitter',
        caption: '@quasarframework',
        icon: 'rss_feed',
        link: 'https://twitter.quasar.dev',
    },
    {
        title: 'Facebook',
        caption: '@QuasarFramework',
        icon: 'public',
        link: 'https://facebook.quasar.dev',
    },
    {
        title: 'Quasar Awesome',
        caption: 'Community Quasar projects',
        icon: 'favorite',
        link: 'https://awesome.quasar.dev',
    },
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'MainLayout',

    components: {
        NavigationLink,
    },

    setup() {
        const leftDrawerOpen = ref(true);

        return {
            navigationLinks,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
});
</script>
