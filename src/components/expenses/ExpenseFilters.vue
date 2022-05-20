<template>
  <details class="expense-filters">
    <summary>
      <strong>{{ $t('filters.title') }}</strong>: {{ filtersSummary }}
    </summary>

    <form
      @submit.stop.prevent="filterExpenses"
      class="expense-filters-form w-full mt-4"
    >
      <div class="flex flex-row flex-no-wrap">
        <div class="w-1/2 pr-2">
          <label for="startDate">{{ $t('filters.start_date') }}</label>
          <input
            type="date"
            id="startDate"
            v-model="startDate"
            placeholder="Start date"
          />
        </div>

        <div class="w-1/2 pl-2">
          <label for="date">{{ $t('filters.end_date') }}</label>
          <input
            type="date"
            v-model="endDate"
            placeholder="End date"
          />
        </div>
      </div>

      <fieldset>
        <legend>{{ $t('filters.price') }}</legend>

        <label for="comparator" class="block w-1/2">
          <span hidden>{{ $t('filters.comparator') }}</span>
          <dropdown
            v-model="comparator"
            :options="comparatorOptions"
            :placeholder="$t('filters.comparator')"
          />
        </label>

        <label for="price" class="block w-1/2">
          <span hidden>{{ $t('filters.price') }}</span>
          <money-input
            id="price"
            name="price"
            v-model.lazy="price"
            :value="price"
          />
        </label>
      </fieldset>

      <div class="w-full mt-2">
        <label for="category">{{ $t('filters.category') }}</label>
        <dropdown
          fluid
          selection
          :options="categoryOptions"
          :placeholder="$t('filters.category')"
          v-model="category"
        />
      </div>

      <div class="w-full mt-2">
        <label for="account">{{ $t('filters.account') }}</label>
        <dropdown
          fluid
          selection
          :options="accountsOptions"
          :placeholder="$t('filters.account')"
          v-model="account"
        />
      </div>

      <footer class="actions text-right mt-4">
        <button
          type="reset"
          @click="resetFilters"
          class="btn"
        >{{ $t('actions.reset') }}</button>

        <button
          type="submit"
          class="btn ml-4"
        >{{ $t('actions.filter') }}</button>
      </footer>
    </form>
  </details>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import dayjs from 'dayjs'
import Dropdown from '@/components/Dropdown.vue'
import MoneyInput from '@/components/MoneyInput.vue'
import { DEFAULT_FILTERS } from '@/stores/modules/expenses'

export default {
  name: 'ExpenseFilters',

  components: {
    Dropdown,
    MoneyInput,
  },

  props: {
  },

  data() {
    return {
      startDate: null,
      endDate: null,
      account: null,
      category: null,
      comparator: '>=',
      price: 0,
      comparatorOptions: [
        { text: this.$t('filters.up_to'), value: '<=' },
        { text: this.$t('filters.at_least'), value: '>=' },
      ]
    };
  },

  methods: {
    filterExpenses() {
      const filters = [];

      if (this.startDate) {
        filters.push({
          field: 'date',
          op: '>=',
          value: dayjs(this.startDate).startOf('day'),
        })
      }

      if (this.endDate) {
        filters.push({
          field: 'date',
          op: '<=',
          value: dayjs(this.endDate).endOf('day'),
        })
      }

      if (this.price) {
        filters.push({
          field: 'price',
          op: (this.comparator === '<=') ? '<=' : '>=',
          value: this.price
        })
      }

      if (this.category) {
        filters.push({
          field: 'category',
          op: '===',
          value: this.category,
        })
      }

      if (this.account) {
        filters.push({
          field: 'account',
          op: '===',
          value: this.account,
        })
      }

      this.$store.dispatch('expenses/setFilters', filters)
    },

    resetFilters() {
      this.startDate = this.endDate = this.account = this.category = null
      this.comparator = '>='
      this.price = 0
      this.$store.dispatch('expenses/setFilters', DEFAULT_FILTERS)
    }
  },

  computed: {
    ... mapGetters('accounts', [ 'accountsOptions' ]),
    ... mapGetters('categories', [ 'categoryOptions' ]),
    ... mapState('expenses', [ 'filters' ]),

    filtersSummary() {
      let filtersStr = []
      let str = null

      for (let f of this.filters) {
        str = `${f.field} ${f.op} `
        if (f.field === 'date') {
          str += dayjs(f.value).format('MMM D YYYY')
        } else {
          str += f.value
        }

        filtersStr.push(str)
      }

      if (filtersStr.length == 0) {
        return 'show all'
      }

      return filtersStr.join(', ')
    },
  },
}
</script>

<style lang="scss" scoped>
.expense-filters {
  margin-bottom: 1rem;

  .expense-filters-form {
    fieldset {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-evenly;
      align-items: center;
      align-content: space-around;
      border: 1px solid #ccc;
      border-radius: 0.3rem;
      padding: 0.25rem 0.50rem;

      legend {
        padding: 0 0.5rem;
        font-weight: 600;
      }

      label {
        flex-grow: 1;
      }
    }

    label[for=actions] {
      display: none !important;
    }
  }
}
</style>
