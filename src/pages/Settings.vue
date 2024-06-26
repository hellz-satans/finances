<template>
  <section id="settings">
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

    <fieldset>
      <legend>Navbar</legend>

      <div class="settings-control">
        <label for="navbar_compact">{{ $t('settings.compact') }}</label>
        <input id="navbar_compact" name="navbar_compact" v-model="navbarCompact" type="checkbox">
      </div>
    </fieldset>

    <fieldset>
      <legend>{{ $t('accounts.plural') }}</legend>

      <div class="settings-control">
        <label for="accounts_currencies">
          {{ $t('accounts.currency_support') }}
        </label>
        <input id="accounts_currencies" name="accounts_currencies" v-model="accountsCurrencies" type="checkbox">
      </div>
    </fieldset>

    <fieldset>
      <legend>Debug</legend>

      <div class="settings-control">
        <label for="debug_messages">
          {{ $t('debug.debug_messages') }}
        </label>
        <input
          id="debug_messages"
          name="debug_messages"
          v-model="enableDebugMessages"
          type="checkbox"
        >
      </div>
    </fieldset>

    <aside v-if="enableDebugMessages" class="mt-4 pt-4 border-t-2">
      <h2 class="mb-4">{{ $t('debug.debug_messages') }}</h2>

      <ul class="debug-messages">
        <li
          v-for="(msg, idx) in debugMessages"
          :class="msg.level"
        >{{ msg.message }}</li>
      </ul>
    </aside>
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
    debugMessages() {
      return this.$store.state.debugMessages;
    },

    accountsCurrencies: {
      get() { return this.$store.state.preferences.preferences.accountsCurrencies },
      set(value) {
        this.$store.dispatch('preferences/submitPreference', { key: 'accountsCurrencies', value: !!value })
      },
    },

    enableDebugMessages: {
      get() { return this.$store.state.preferences.preferences.enableDebugMessages },
      set(value) {
        this.$store.dispatch('preferences/submitPreference', { key: 'enableDebugMessages', value: !!value })
      },
    },

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
  },
}
</script>

<style lang="scss" scoped>
#settings {
  @apply m-4;

  fieldset {
    @apply mt-4;

    .settings-control {
      @apply flex justify-between items-center;

      label {
        @apply inline-block my-2;
      }

      input {
        display: inline-block;
      }
    }
  }
}
</style>
