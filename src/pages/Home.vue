<template>
  <q-page padding>
    <div class="row">
      <div class="col-4">
        <q-card>
          <language-selector header="locales">
            <template
              slot="languages"
              slot-scope="{ changeLanguage }"
            >
              <q-item
                v-for="lang in languages"
                :key="lang.value"
                @click.native="changeLanguage(lang.value)"
              >
                <q-item-side :icon="lang.icon" />
                <q-item-main :label="$t(lang.label)" />
              </q-item>
            </template>
          </language-selector>
          <q-card-main>
            {{ $t('sample') }}
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import LanguageSelector from '@/LanguageSelector';

  export default {
    name: 'Home',
    components: {
      LanguageSelector,
    },
    computed: {
      languages() {
        return [
          { label: 'english', value: 'en', icon: 'flag' },
          { label: 'thai', value: 'th', icon: 'flag' },
          { label: 'japanese', value: 'jp', icon: 'flag' }
        ];
      }
    }
  };
</script>

<style>
</style>
