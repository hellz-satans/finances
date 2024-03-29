<template>
  <aside class="chart-container">
    <header class="mt-3 mb-1 flex flex-row flex-no-wrap justify-center">
      <button
        class="btn mx-2 px-3 py-1 lowercase"
        @click="periodicity = 'week'"
      >{{ $t('charts.weekly') }}</button>
      <button
        class="btn mx-2 px-3 py-1 lowercase"
        @click="periodicity = 'month'"
      >{{ $t('charts.monthly') }}</button>
    </header>

    <xy-chart
      :data="data"
      :title="$t('charts.summary', { periodicity: $t(`charts.${periodicity}ly`) })"
      :xLabel="$t(`charts.${periodicity}`)"
      :options="xkcdOptions"
      :yLabel="`$ ${$t('charts.money')}`"
      v-if="chart === 'xy' && expenses.length > 0"
    />

    <footer class="text-center px-3">
      <label>
        {{ $t('charts.cumulative') }}
        <input type="checkbox" v-model="cumulative" />
      </label>
    </footer>
  </aside>
</template>

<script>
import dayjs from 'dayjs'
import XYChart from '@/components/charts/XYChart.vue';

const TIME_FORMATS = {
  week:  "ddd DD MMM, YYYY",
  month: "MMM",
}

export default {
  name: "ChartContainer",

  components: {
    'xy-chart': XYChart,
  },

  data() {
    return {
      chart: "xy",
      cumulative: true,
      periodicity: "week",
    };
  },

  computed: {
    expenses() {
      return this.$store.state.expenses
        .expenses
        .filter(e => !e.transfer);
    },

    xkcdOptions() {
      return {
        timeFormat: TIME_FORMATS[this.periodicity],
      };
    },

    data() {
      let exp = null,
        i = 0,
        p = 0,
        prev = { income: 0, outcome: 0 },
        k = null,
        periodIncome  = {},
        periodOutcome = {};
      const income  = { label: this.$t('income'),  data: [] };
      const outcome = { label: this.$t('outcome'), data: [] };
      const periods = [];

      for (i = 0; i < this.expenses.length; ++i) {
        exp = this.expenses[i];
        p = Math.abs(exp.price);
        k = dayjs(exp.date).endOf(this.periodicity).format("YYYY-MM-DD");

        if (periods.indexOf(k) === -1) periods.push(k);
        if (!periodIncome[k])  periodIncome[k]  = 0;
        if (!periodOutcome[k]) periodOutcome[k] = 0;

        if (exp.price < 0)
          periodOutcome[k] += p;
        else
          periodIncome[k]  += p;
      };

      periods.sort();
      prev = { income: 0, outcome: 0 };
      for (k of periods) {
        income.data.push( { x: k, y: (periodIncome[k]  + prev.income) });
        outcome.data.push({ x: k, y: (periodOutcome[k] + prev.outcome) });

        if (this.cumulative) {
          prev.income  += periodIncome[k];
          prev.outcome += periodOutcome[k];
        }
      }

      return {
        // NOTE: order determines the color
        datasets: [
          outcome,
          income,
        ],
      };
    },
  },
}
</script>

<style lang="scss">
.chart-container {
  font-family: 'xkcd', sans-serif;
}
</style>
