<template>
  <balance-summary />

  <nav>
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

  <account-list />
  <chart-container />
  <expense-filters />
  <expense-list />
</template>

<script>
import AccountList from '@/components/accounts/AccountList.vue';
import BalanceSummary from '@/components/BalanceSummary.vue';
import ChartContainer from '@/components/charts/ChartContainer.vue';
import ExpenseFilters from '@/components/expenses/ExpenseFilters.vue';
import ExpenseList from '@/components/expenses/ExpenseList.vue';

export default {
  components: {
    AccountList,
    BalanceSummary,
    ChartContainer,
    ExpenseFilters,
    ExpenseList,
  },
};
</script>
