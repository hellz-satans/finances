<template>
  <section class="balance-summary text-right m-3">
    <p :class="cssClasses">
      <span class="inline-block mb-1 hidden">{{ $t('balance_summary.balance') }}:</span>
      <span class="text-xxlarge">{{ currency(totalBalance) }}</span>
    </p>

    <p class="balance-summary__goal">
      {{ $t('balance_summary.goal') }}:
      <span class="text-large">{{ currency(goal) }}</span>
    </p>

    <p class="text-sm">
      <h4 class="text-base">{{ $t('balance_summary.expenses') }}</h4>

      <span>{{ $t('balance_summary.week') }}: &nbsp;</span>
      <span class="font-medium">{{ currency(expensesPastWeek) }}</span>
      <br>
      <span>{{ $t('balance_summary.month') }}: &nbsp;</span>
      <span class="font-medium">{{ currency(expensesPastMonth) }}</span>
    </p>

    <footer>
      <router-link
        class="text-small rounded inline-block py-1 px-3 m-2"
        to="/preference/goal?type=money"
      >
        {{ $t('balance_summary.edit_goal') }} &nbsp;
        <span class="icon inline-block mirror">&#9999;</span>
      </router-link>
    </footer>
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
