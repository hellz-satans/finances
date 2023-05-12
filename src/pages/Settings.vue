<template>
  <section class="import-export m-4">
    <h1 class="text-3xl mb-2">{{ $t('navbar.settings') }}</h1>

    <ul class="list-none ml-0 my-4">
      <li class="shadow-yellow shadow-inner py-2 my-0">
        <router-link to="/categories" class="flex justify-between items-center">
          <div class="inline-block">
            <svg class="icon inline-block"><use xlink:href="#icons-archives" /></svg>
            {{ $t('navbar.categories') }}
          </div>
          <div class="text-xl font-bold">&gt;</div>
        </router-link>
      </li>

      <li class="shadow-yellow shadow-inner py-2 my-0">
        <router-link to="/import-export" class="flex justify-between items-center">
          <div class="inline-block">
            <svg class="icon inline-block"><use xlink:href="#icons-cassette" /></svg>
            {{ $t('navbar.data') }}
          </div>
          <div class="text-xl font-bold">&gt;</div>
        </router-link>
      </li>
    </ul>

    <label>
      {{ $t('settings.language') }}

      <dropdown
        class="mt-2"
        fluid
        selection
        :options="locales"
        v-model="lang"
      />
    </label>

    <fieldset class="mt-4">
      <legend>Navbar</legend>

      <div class="flex field justify-between items-center">
        <label class="inline-block my-2" for="navbar_compact">{{ $t('settings.compact') }}</label>
        <input class="inline-block" id="navbar_compact" name="navbar_compact" v-model="navbarCompact" type="checkbox">
      </div>
    </fieldset>

    <fieldset class="mt-4">
      <legend>{{ $t('accounts.plural') }}</legend>

      <div class="flex field justify-between items-center">
        <label class="inline-block my-2" for="accounts_currencies">
          {{ $t('accounts.currency') }}
        </label>
        <input class="inline-block" id="accounts_currencies" name="accounts_currencies" v-model="accountsCurrencies" type="checkbox">
      </div>
    </fieldset>
  </section>
</template>

<script>
import { i18n } from '@/i18n'
import Dropdown from '@/components/Dropdown.vue'

export default {
  components: {
    Dropdown,
  },

  data() {
    return {
      locales: [
        { value: 'es', text: 'Español'},
        { value: 'en', text: 'English'},
      ],
    }
  },

  computed: {
    lang: {
      get() { return this.$store.state.preferences.preferences.locale },
      set(locale) {
        this.$store.dispatch('preferences/submitPreference', { key: 'locale', value: locale })
        i18n.global.locale = locale
      },
    },

    navbarCompact: {
      get() { return this.$store.state.preferences.preferences.navbarCompact },
      set(value) {
        this.$store.dispatch('preferences/submitPreference', { key: 'navbarCompact', value: !!value })
      },
    },

    accountsCurrencies: {
      get() { return this.$store.state.preferences.preferences.accountsCurrencies },
      set(value) {
        this.$store.dispatch('preferences/submitPreference', { key: 'accountsCurrencies', value: !!value })
      },
    },
  },
}
</script>
