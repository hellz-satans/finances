<template>
  <div class="money-input w-full">
    <span
      :class="{ 'sign': true, positive: sign > 0, negative: sign < 0 }"
      @click="emitSign"
      v-if="!hideSign"
    >{{ (sign > 0) ? '+' : '-' }}</span>

    <money
      v-bind="moneyConf"
      @input="emitValue($event)"
      :value="money"
      :precision="precision"
    />
  </div>
</template>

<script>
import { Money } from '@/components/v-money'

export default {
  components: {
    Money,
  },

  props: {
    precision: { type: Number, default: 2 },
    value: { type: Number, required: true, default: 0, },
    hideSign: { type: Boolean, default: false, },
  },

  data() {
    return {
      moneyConf: {
        prefix: '$',
        precision: this.precision,
        masked: false,
      },
      money: 0, // for internal handling
      sign: -1,
    }
  },

  methods: {
    emitValue(val) {
      if (isNaN(val)) {
        return undefined
      }

      //console.debug('emitValue:', typeof val, val);
      if (val != 0) {
        this.$emit('update:modelValue', val * this.sign);
        this.money = val;
      } else {
        this.$emit('update:modelValue', 0);
      }
    },

    emitSign() {
      //console.debug('emitSign:', this.sign, '=>', this.sign * -1);
      this.sign = this.sign * -1;
      this.emitValue(this.money);
    },
  },

  created() {
    //console.debug('MoneyInput: created', this.value, Math.abs(this.value));
    this.money = Math.abs(this.value);
    this.sign  = (this.value > 0) ? 1 : -1;
  }
}
</script>

<style lang="scss">
.money-input {
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;

  .sign {
    cursor: pointer;
    font-size: 2em;
    font-weight: 500;
    margin: 0 2.5%;
    width: 10%;

    &.positive { color: var(--green); }
    &.negative { color: var(--red); left: 1.75rem; }
  }

  .v-money {
    padding: 2px 4px;
    width: 85%;
  }
}
</style>
