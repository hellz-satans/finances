<template>
  <section class="balance-summary text-right m-3">
    <p :class="cssClasses">
      <span class="inline-block mb-1 hidden">Balance:</span>
      <span class="text-xxlarge">{{ currency(totalBalance) }}</span>
    </p>

    <p class="balance-summary__goal">
      Goal:
      <span class="text-large">{{ currency(goal) }}</span>
    </p>

    <span>Week:</span>
    <span class="font-medium">{{ currency(expensesPastWeek) }}</span>
    <br>
    <span>Month:</span>
    <span class="font-medium">{{ currency(expensesPastMonth) }}</span>

    <br />

    <router-link
      class="text-small rounded inline-block py-1 px-3 m-2"
      to="/preference/goal?type=money"
    >
      Edit goal &nbsp;
      <span class="icon inline-block mirror">&#9999;</span>
    </router-link>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { currency } from '@/filters'

export default {
  name: 'BalanceSummary',

  computed: {
    ... mapGetters([ 'balanceSummary' ]),
    ... mapGetters('accounts', [ 'totalBalance' ]),
    ... mapGetters('expenses', [ 'expensesPastWeek', 'expensesPastMonth' ]),
    ... mapState('preferences', [ 'preferences', ]),

    cssClasses() {
      let color = 'inherit';

      if (this.goal > 0) {
        if (this.balanceSummary > (this.goal * 0.80))
          color = 'green';
        else if (this.balanceSummary > (this.goal * 0.50))
          color = 'orange';
        else
          color = 'red';
      }

      return {
        [color]: true,
        'balance-summary__total': true,
      };
    },

    goal() {
      return this.preferences.goal || 0;
    },
  },

  methods: {
    currency: currency,
  },
}
</script>

<style lang="scss">
.balance-summary {
  &__goal, &__total {
    margin: 0.5rem 0;
  }
}
</style>
