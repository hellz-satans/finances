<template>
  <div class="category-picker relative">
    <button
      type="button"
      class="w-full btn rounded text-white flex flex-col flex-no-wrap justify-center items-center p-2"
      :style="buttonStyles"
      :disabled="disabled"
      @click="open = !open"
    >
      <div><span class="icon">{{ category.icon }}</span></div>
      <div v-if="category.name">{{ category.name }}</div>
      <div class="min-w-1/3 border-b-2" v-else>&nbsp;</div>
    </button>

    <div
      v-if="open"
      class="category-picker__options w-full flex flex-row flex-wrap absolute origin-top-right rounded-md shadow-xl z-10 border border-gray-600"
    >
      <div
        v-for="(opt, i) in options"
        :key="i"
        @click="$emit('update:modelValue', opt) ; open = false"
        :style="'background:' + (opt.color || 'var(--default-color-dark, #666)')"
        class="category-option text-white rounded m-1 border border-gray-400 pointer p-2 shadow-2xl"
      >
        <span class="icon">{{ opt.icon }}</span>
        {{ opt.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryPicker",

  emits: ['update:modelValue'],

  props: {
    options:  { type: Array, required: true, },
    category: { type: Object, required: true, },
    disabled: { type: Boolean, required: false, default: false, },
    modelValue: { type: Object },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    buttonStyles() {
      return {
        'background-color': this.category.color,
      };
    },
  },
}
</script>

<style lang="scss">
.category-picker {
  > button {
    min-height: 4em;
  }

  &__options {
    background-color: var(--bg-dark);
  }
}
</style>
