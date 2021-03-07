<template>
  <article class="account-card card" :style="accountStyle">
    <header class="m-0">
      <span class="card-name">{{ account.name }}</span>

      <span class="card-actions">
        <span
          class="icon right floated text-xlarge mr-1 pointer"
          @click="deleteAccountProxy(account)"
        >
          &#215;
        </span>

        <router-link :to="accountUrl">
          <span class="icon right floated text-small mr-3 inline-block mirror">
            &#9999;
          </span>
        </router-link>
      </span>
    </header>

    <section class="m-0 p-0">
      <h3 class="balance">{{ balance }}</h3>
    </section>

    <footer class="m-0 text-smaller text-right">
      <label>
        Include in balance?
        <input
          type="checkbox"
          :checked="account.includeInSummary"
          @change="toggleIncludeAccount(account.key)"
        />
      </label>
    </footer>
  </article>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { currency } from '@/filters'

export default {
  props: {
    account: { required: true, type: Object },
  },

  computed: {
    accountStyle() {
      const backgroundColor = this.account ? this.account.color : 'transparent'
      const color = this.account ? '#eee' : 'inherit'
      const styles = {
        'background-color': backgroundColor,
        'color': color,
      }
      let str = ''

      for (const k in styles) {
        str += `${k}: ${styles[k]};`
      }

      return str
    },

    accountUrl(account) {
      return `/account/${this.account.key}`
    },

    balance() {
      return currency(this.account.balance)
    },
  },

  methods: {
    ... mapActions('accounts', [
      'editAccount',
      'deleteAccount',
      'toggleIncludeAccount',
    ]),

    deleteAccountProxy(account) {
      if (window.confirm('Are you sure?')) {
        this.deleteAccount(account)
      }
    },
  },
}
</script>

<style lang="scss">
.account-card {
  font-size: 18px;
  line-height: 22px;

  .card {
    &-name {
      font-size: 1.1em;
      font-weight: 500;
    }
  }

  .balance {
    font-size: 1.25em;
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 0;
  }
}
</style>
