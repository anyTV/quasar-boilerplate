<template>
    <q-list
        highlight
        link
        no-border
    >
        <slot name="header">
            <q-list-header v-if="header">{{ $t(header) }}</q-list-header>
        </slot>
        <slot
            :change-language="changeLanguage"
            name="languages"
        >
            <q-item
                v-for="lang in languages"
                :key="lang.value"
                @click.native="changeLanguage(lang.value)"
                v-text="$t(lang.label)"
            />
        </slot>
    </q-list>
</template>

<script>
    import { every } from 'lodash';
    import { hasKeys } from 'src/helpers/utils';

    /**
     * Usage:
     * 1. Using props to use default design
     *    <language-selector
     *      :languages="languages"
     *      header="languages"
     *    />
     * 2. Using slots for header
     *    For example you want to use inset header:
     *    <language-selector :languages="languages">
     *      <q-list-header
     *        v-text="$t('header')"
     *        inset
     *      />
     *    </language-selector>
     * 3. Using scoped slots for languages
     *    <language-selector header="languages">
     *      <template slot-scope="{ changeLanguage }">
     *        <q-item
     *          v-for="lang in languages"
     *          :key="lang.value"
     *          @click.native="changeLanguage"
     *        >
     *          <q-item-side :icon="lang.icon" />
     *          <q-item-main :label="lang.label" />
     *        </q-item>
     *      </template>
     *    </language-selector>
     */
    export default {
        name: 'LanguageSelector',
        props: {
            // This can be a translation key.
            header: {
                type: String,
                default: ''
            },
            // This should be an array of object containing label and value properties.
            // e.g. [{label: 'english', value: 'en'}]
            languages: {
                type: Array,
                default: () => [],
                validator: languages => every(languages, lang => hasKeys(lang, ['label', 'value']))
            }
        },
        methods: {
            changeLanguage(lang) {
                this.$i18n.i18next.changeLanguage(lang);
            }
        },
    };
</script>
