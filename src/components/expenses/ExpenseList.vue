<style lang="scss">
.expenses-list {
  .expense-entry {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;

    margin: 0.5em 0.25em;
    padding: 1em 0.4em 0.5em;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 0.4em;
    box-shadow: 0 0 0.3em 0.05em var(--shadow-color, #bbb);
  }
}
</style>

<template>
  <section class="expenses-list">
    <header class="text-right mb-3 mx-4 text-small">
      <span class="text font-medium green">{{ $t('income') }}</span>:
      {{ currency(income) }},
      <span class="text font-medium orange">{{ $t('outcome') }}</span>:
      {{ currency(outcome) }}<br>
      <span class="text font-medium">{{ $t('total') }}</span>:
      {{ currency(expensesSum) }}
    </header>

    <h2 class="text-center" v-if="expenses.length === 0">
      {{ $t('expenses.no_expenses') }}
    </h2>

    <article
      class="expense-entry"
      v-for="(e, idx) in paginatedExpenses"
      :key="e.id"
      :style="entryStyles(e)"
    >
      <div class="flex flex-row justify-between align-start w-full">
        <category-label
          :category="{ category: e.category, subcategory: e.subcategory }"
        />

        <div class="flex flex-col justify-between text-center">
          <div class="text-large">
            {{ currency(e.price) }}
          </div>
          <div>
            <account-label
              class="inline-block text-small"
              :account-key="e.account"
            />
          </div>
        </div>
      </div>

      <div class="w-full flex flex-row items-center justify-between mt-2">
        <div class="text-small min-w-1/5">
          <date-label :date="e.date" />
        </div>

        <p class="px-2 text-small">{{ e.description }}</p>

        <div class="actions min-w-1/5 text-xs flex flex-col align-center">
          <router-link class="block text-center" :to="`/expense/${e.id}`">
            {{ $t('actions.edit') }}
          </router-link>

          <button
            href="#"
            class="block red pointer whitespace-no-wrap"
            @click="deleteProxy(e.id)"
          >
            {{ $t('actions.delete') }}
          </button>
        </div>
      </div>
    </article>

    <footer class="text-center my-4">
      <button
        type="button"
        class="btn"
        @click="upTo += 20"
        v-if="expenses.length > upTo"
      >
        {{ $t('expenses.show_more') }}
      </button>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { currency } from '@/filters';
import { expensesSum } from '@/stores/filters';
import AccountLabel from '@/components/accounts/AccountLabel.vue'
import CategoryLabel from '@/components/categories/CategoryLabel.vue'
import DateLabel from '@/components/DateLabel.vue'

export default {
  name: 'ExpenseList',

  props: {
  },

  components: {
    AccountLabel,
    CategoryLabel,
    DateLabel,
  },

  data() {
    return {
      // Display up to `upTo` expenses
      upTo: 20,
    }
  },

  methods: {
    ... mapActions('expenses', [ 'editExpense', 'deleteExpense' ]),

    currency: currency,

    entryStyles(exp) {
      let styles = {},
        cat = this.categoriesCache[exp.subcategory];
      let str = '';

      if (!cat) cat = this.categoriesCache[exp.category];
      if (cat) styles['border-left'] = `5px solid ${cat.color}`;

      for (const k in styles)
        str += `${k}: ${styles[k]};`

      return str;
    },

    deleteProxy(id) {
      if (window.confirm(this.$t('confirm')))
        this.deleteExpense(id);
    },
  },

  computed: {
    ... mapState('expenses', [ 'expenses' ]),
    ... mapState('categories', { categoriesCache: 'cache', }),
    ... mapGetters('expenses', [ 'totalExpenses' ]),

    expensesSum() {
      return expensesSum(this.expenses)
    },

    income() {
      return this.expenses
        .filter(e => e.price > 0)
        .filter(e => !e.transfer)
        .map(e => e.price)
        .concat([ 0, ]) // to prevent reduce on empty array
        .reduce((total, curr) => total + curr);
    },

    outcome() {
      return this.expenses
        .filter(e => e.price < 0)
        .filter(e => !e.transfer)
        .map(e => e.price)
        .concat([ 0, ]) // to prevent reduce on empty array
        .reduce((total, curr) => total + curr);
    },

    paginatedExpenses() {
      return this.expenses
        .slice(0, this.upTo)
    },
  },

  created() {
  },
}
</script>
