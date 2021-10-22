<template>
  <header
    class="flex justify-between items-baseline py-1 px-3 border-b-2 border-grey-900"
  >
    <span class="title">My Finances</span>
  </header>

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

<style lang="scss">
.expense-form, .transfer-form {
  &-button {
    position: fixed;
    right: 1rem;
    z-index: 999;
    cursor: pointer;
    border-radius: 1em;
    width:  2em;
    height: 2em;
    line-height: 1em;
    padding-top: 0.5em;
    text-align: center;
  }
}

.expense-form-button  { bottom: calc(var(--bottomnav-height) + 1rem); }
.transfer-form-button { bottom: calc(var(--bottomnav-height) + 4rem); }
</style>
