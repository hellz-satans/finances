<style lang="scss">
.date-label {
  cursor: help;
}
</style>

<template>
  <time
    class="date-label"
    @click="toggleFormat"
    :title="date.toISOString()"
    :datetime="date.toISOString()"
  >
    {{ label }}
  </time>
</template>

<script>
import { ago } from '@/filters'

export default {
  props: {
    date: { required: true, },
  },

  data() {
    return {
      format: 'ago',
    }
  },

  computed: {
    label() {
      if (this.format === 'ago') {
        return ago(this.date)
      }

      return this.date.toISOString()
    },
  },

  methods: {
    toggleFormat(ev) {
      if (this.format === 'ago')
        this.format = 'raw'
      else
        this.format = 'ago'
    },
  },
}
</script>
