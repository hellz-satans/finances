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

    <footer class="actions text-right">
      <button
        positive
        type="submit"
      >{{ $t('actions.submit') }}</button>
    </footer>
	</form>
</template>

<script>
import { mapActions } from 'vuex'
import AccountsOptions from '@/components/accounts/AccountsOptions.vue'
import MoneyInput from '@/components/MoneyInput.vue'

export default {
  components: {
    AccountsOptions,
    MoneyInput,
  },

  data() {
    return {
      amount: 0,
      from: null,
      to: null,
    }
  },

  methods: {
    ... mapActions({
      transfer: 'accounts/transfer',
    }),

    doTransfer() {
      this.transfer({
        amount: Math.abs(this.amount),
        from: this.from,
        to: this.to,
      })
      .then((success) => {
        this.$router.push('/');
      });
    },
  },
}
</script>

<style lang="scss">
.transfer-form {

  // overrides
  .money-input {
    font-size: 2em;

    .sign {
      display: none;
    }

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
