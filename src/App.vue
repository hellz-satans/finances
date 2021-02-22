<template>
  <transition name="fade">
    <Loader v-if="isLoading" />
  </transition>

  <section v-if="!isLoading">
    <header
      class="flex justify-between items-baseline py-1 px-3 border-b-2 border-grey-900"
    >
      <router-link to="/" class="title">My Finances</router-link>

      <Sidebar />
    </header>

    <nav v-if="currentRoute == 'home'">
      <router-link
        class="expense-form-button text-white bg-green-500 text-large"
        to="/expense/new"
      >
        +
      </router-link>

      <router-link
        class="transfer-form-button text-white bg-blue-500 text-large"
        to="/transfer"
      >
        &#8644;
      </router-link>
    </nav>

    <router-view></router-view>
  </section>

  <footer class="py-2 border-t-2 border-grey-900">
    <p class="text-center text-small mb-0">
      {{ NAME }} <strong>v{{ VERSION }}</strong>
    </p>

    <p class="text-center text-xsmall">By juankman94<sup>&reg;</sup></p>
  </footer>
</template>

<script>
import { NAME, VERSION } from '@/config/application_properties'
import Loader  from '@/components/Loader.vue'
import Sidebar from '@/components/Sidebar.vue'

// NOTE: this should be relative to <loader>'s animation duration
const INITIAL_LOAD_TIMEOUT = 600;

export default {
  components: {
    Loader,
    Sidebar,
  },

  computed: {
    NAME: () => NAME,
    VERSION: () => VERSION,

    currentRoute() {
      return this.$route.name;
    },
  },

  data() {
    return {
      isLoading: true,
    }
  },

  created() {
    this.$store.dispatch('accounts/createCashAccount');
    this.$store.dispatch('categories/seedData');
    this.$store.commit('accounts/getAccounts');
    this.$store.commit('preferences/getPreferences');
    this.$store.commit('expenses/getExpenses');

    window.setTimeout((ev) => this.isLoading = false, INITIAL_LOAD_TIMEOUT);
  },
}
</script>
