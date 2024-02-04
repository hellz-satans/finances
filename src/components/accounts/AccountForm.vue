<template>
  <form
    name="account"
    class="account-form px-2 py-4"
    @submit.stop.prevent="submitAccount"
  >
    <div v-if="loaded" class="w-full mb-4">
      <label
        :style="accountStyles"
        class="block font-semibold mb-3"
        for="account_balance"
      >
        {{ $t('accounts.balance') }}
      </label>

      <money-input
        id="account_balance"
        name="account_balance"
        v-model.lazy="balance"
        placeholder="Balance"
        required
        :value="balance"
      ></money-input>
    </div>

    <div class="w-full mb-4">
      <label
        :style="accountStyles"
        class="block font-semibold mb-3"
        for="account_name"
      >
        {{ $t('accounts.name') }}
      </label>

      <input
        :style="accountStyles"
        class="block appearance-none w-full border p-2 rounded"
        id="account_name"
        name="account_name"
        v-model="name"
        placeholder="Name"
        minlength="1"
        pattern=".+"
        required
      />
    </div>

    <div class="w-full mb-4">
      <label class="block font-semibold" for="account_color">
        {{ $t('accounts.color') }}
        <span class="color-picker">
          (
          current color
          <div class="color-picker--current" :style="`background-color: ${color}`">
          </div>
          )
        </span>
      </label>

      <div class="mt-2">
        <v-swatches
          @input="color = $event"
          inline
          shapes="circles"
          :swatches="colorList"
          background-color="transparent"
        />
      </div>
    </div>

    <div class="w-full mb-4" v-if="currenciesEnabled">
      <label class="block font-semibold mb-3" for="account_currency">
        {{ $t('accounts.currency') }}
      </label>

      <input
        :style="accountStyles"
        class="block appearance-none w-full border p-2 rounded"
        id="account_currency"
        name="account_currency"
        v-model="currency"
        placeholder="MXN"
        minlength="2"
        pattern=".+"
      />
    </div>

    <footer class="actions text-right">
      <button
        type="submit"
      >{{ $t('actions.save') }}</button>
    </footer>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VSwatches from 'vue-swatches/src/VSwatches.vue';
import MoneyInput from '@/components/MoneyInput.vue'
import { colors as COLORS, primary as primaryColor } from '@/config/colors';

export default {
  name: 'AccountForm',

  components: {
    MoneyInput,
    VSwatches,
  },

  data() {
    return {
      balance:  0,
      color:    primaryColor,
      currency: '',
      key:      null,
      loaded:   false,
      name:     null,
    };
  },

  methods: {
    submitAccount() {
      const data = {
        balance: this.balance,
        color:   this.color,
        key:     this.key,
        name:    this.name,
      }

      if (this.currenciesEnabled) {
        data.currency = this.currency;
      }

      if (document.forms.account.checkValidity()) {
        this.$store.dispatch('accounts/submitAccount', data)
          .then((success) => {
            if (success) {
              this.$router.push('/')
            } else {
              console.error('something went wrong')
            }
          })
          .catch((err) => {
            console.error('submitAccount:', err, err.stack);
          });
      } else {
        document.forms.account.reportValidity();
        console.error('submitAccount: invalid data');
      }
    },

    loadForm(key) {
      let acc = this.accounts.find(a => a.key == key);

      if (acc) {
        this.balance  = acc.balance;
        this.color    = acc.color;
        this.currency = acc.currency;
        this.key      = acc.key;
        this.name     = acc.name;
      }
    },
  },

  computed: {
    ... mapState({
      accounts: state => state.accounts.accounts,
      currenciesEnabled: state => state.preferences.preferences.accountsCurrencies,
    }),

    action() {
      return this.key ? 'Update' : 'Add';
    },

    colorList() { return COLORS; },

    accountStyles() {
      return {
        'border-bottom-color': `${this.color} !important`,
        'color': this.color || 'initial',
      };
    },
  },

  created() {
    let key = this.$route.params.account_key


    if (key && key != 'new') {
      this.loadForm(key)
    }

    this.loaded = true;
  },
}
</script>

<style lang="scss">
.account-form {
  // overrides
  .money-input {
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
