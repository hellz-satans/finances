<template>
  <span class="date-label" @click="toggleFormat">
    <span v-if="format === 'ago'">
      {{ date }}
    </span>
    <span v-else>
      {{ date }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    date: { required: true, },
  },

  data() {
    return {
      format: 'ago',
    }
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
