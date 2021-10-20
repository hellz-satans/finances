<template>
  <transition name="fade">
    <Loader v-if="isLoading" />
  </transition>

  <section v-if="!isLoading">
    <router-view></router-view>

    <bottomnav />
  </section>

  <footer class="pt-2 border-t-2 border-grey-900" v-if="!isLoading">
    <p class="text-center text-small mb-0">
      {{ NAME }} <strong>v{{ VERSION }}</strong>
    </p>

    <p class="text-center text-xsmall">By juankman94<sup>&reg;</sup></p>
  </footer>
</template>

<script>
import { NAME, VERSION } from '@/config/application_properties'
import Bottomnav from '@/components/Bottomnav.vue'
import Loader  from '@/components/Loader.vue'
import Sidebar from '@/components/Sidebar.vue'

// NOTE: this SHOULD be relative to <loader>'s animation duration
const INITIAL_LOAD_TIMEOUT = 1700;

export default {
  components: {
    Bottomnav,
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

    window.setTimeout((ev) => this.isLoading = false, INITIAL_LOAD_TIMEOUT)
  },
}
</script>
