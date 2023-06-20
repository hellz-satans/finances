<template>
  <form
    name="transfer"
    @submit.stop.prevent="doTransfer"
    class="transfer-form my-4 mx-2"
  >
    <h1>{{ $t('accounts.transfer') }}</h1>

    <div class="w-full my-3">
      <label hidden class="hidden" for="price">{{ $t('accounts.amount') }}</label>
      <money-input
        name="amount"
        v-model.lazy="amount"
        :value="amount"
        class="transfer-amount"
      ></money-input>
    </div>

    <div class="w-full">
      <label class="block" for="from">{{ $t('accounts.from_account') }}</label>
      <accounts-options
        :account="from"
        :exclude="[ to ]"
        @input="from = $event"
      />
    </div>

    <div class="w-full">
      <label for="to">{{ $t('accounts.to_account') }}</label>
      <accounts-options
        :account="to"
        :exclude="[ from ]"
        @input="to = $event"
      />
    </div>

    <div class="w-full mb-4" v-if="needsExchangeRate">
      <label for="exchange_rate">
        {{ $t('accounts.exchange_rate') }}
        (1 {{ this.fromAccount.currency }} = <code>?</code> {{ this.toAccount.currency }})
      </label>

      <money-input
        name="exchange_rate"
        v-model.lazy="exchangeRate"
        :value="exchangeRate"
        :precision="6"
      ></money-input>
    </div>

    <footer class="actions text-right">
      <button
        positive
        type="submit"
      >{{ $t('actions.submit') }}</button>
    </footer>
	</form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AccountsOptions from '@/components/accounts/AccountsOptions.vue';
import MoneyInput from '@/components/MoneyInput.vue';

export default {
  components: {
    AccountsOptions,
    MoneyInput,
  },

  data() {
    return {
      amount: 0,
      exchangeRate: 1,
      from: null,
      to: null,
    };
  },

  methods: {
    ... mapActions({
      transfer: 'accounts/transfer',
    }),

    doTransfer() {
      const data = {
        amount: Math.abs(this.amount),
        exchangeRate: Math.abs(this.exchangeRate),
        from: this.from,
        to: this.to,
      };

      this.transfer(data)
        .then((success) => {
          this.$router.push('/');
        });
    },
  },

  computed: {
    ... mapState({
      currenciesEnabled: state => state.preferences.preferences.accountsCurrencies,
    }),

    needsExchangeRate() {
      if (!this.currenciesEnabled) return false;
      if (!this.fromAccount?.currency || !this.toAccount?.currency) return false;

      return this.fromAccount.currency.toUpperCase() != this.toAccount.currency.toUpperCase();
    },

    fromAccount() {
      if (!this.from) return null;

      return this.$store.state.accounts.cache[this.from];
    },

    toAccount() {
      if (!this.to) return null;

      return this.$store.state.accounts.cache[this.to];
    },
  },
}
</script>

<style lang="scss">
.transfer-form {

  // overrides
  .money-input {
    .sign {
      display: none;
    }
  }

  .money-input.transfer-amount {
    font-size: 2em;

    .v-money {
      font-size: 2em !important;
      min-height: 2em;
      background: none;
      border: none;
      padding: 0;
    }
  }
}
</style>
