<template>
  <form
    @submit.prevent.stop="submitForm"
    class="preference-form rounded shadow-md p-5"
    name="preference"
    method="POST"
  >
    <div class="mb-4" v-if="loaded">
      <label
        for="preferenceKey"
        class="block font-bold mb-2"
      >
        {{ key }}
      </label>
      <money-input
        name="preferenceKey"
        v-if="type === 'money'"
        v-model.lazy="value"
        :value="value"
        :hide-sign="true"
      />
      <input
        v-else
        :type="type"
        id="preferenceKey"
        name="preferenceKey"
        required
        v-model="value"
      />
    </div>

    <footer class="actions text-right">
      <button
        type="submit"
        class="btn-submit"
      >Save</button>
    </footer>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MoneyInput from '@/components/MoneyInput.vue'

const ALLOWED_TYPES = ['money', 'number', 'text']

export default {
  name: 'PreferenceForm',

  components: {
    MoneyInput,
  },

  data() {
    return {
      key:    null,
      value:  null,
      loaded: false,
    };
  },

  methods: {
    ... mapActions('preferences', [ 'submitPreference', ]),

    submitForm() {
      this.submitPreference({ key: this.key, value: this.processedValue })
        .then((n) => {
          // if we hit save but not change the value (update action), n = 0
          if (n >= 0) {
            this.$router.push('/');
          }
        });
    },
  },

  computed: {
    ... mapState('preferences', [ 'preferences', ]),

    processedValue() {
      switch (this.type) {
        case 'number':
          return Number(this.value)
        case 'money':
          return Math.abs(this.value)
        case 'text':
        default:
          return this.value
      }
    },

    type() {
      const idx = ALLOWED_TYPES.findIndex(el => el === this.$route?.query.type)

      if (idx === -1)
        return 'text'

      return ALLOWED_TYPES[idx]
    },
  },

  mounted() {
    this.key = this.$route.params.key;

    if (this.preferences[this.key]) {
      this.value = this.preferences[this.key];
    }

    this.loaded = true;
  },
}
</script>

<style lang="scss">
.preference-form {
  label { text-transform: capitalize !important; }
}
</style>
