/**
 * Component from vuetailwind/components
 *
 * Original: https://github.com/vuetailwind/components/blob/13ee91518e5af15d49df0193b07c441d72c23a10/modal/with-header-and-close-button/v-modal.vue
 */
<style lang="scss">
.v-modal-bg {
  background-color: #777777;
  background-color: rgba(32, 32, 32, 0.8);
}

.v-modal {
  .container {
    box-shadow: 0 0 0.3em 0.05em var(--shadow-color, #bbbbbb);
  }

  header {
    background-color: var(--bg-dark);
  }

  section {
    background-color: var(--bg);
  }
}
</style>

<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="open">
    <div class="v-modal-bg absolute w-full h-full" @click="close"></div>

    <div class="absolute max-h-full v-modal p-4" :class="maxWidth">
      <div class="container overflow-hidden rounded border border-gray-400">
        <header
          class="px-3 py-2 leading-none flex justify-between items-center font-medium text-sm border-b select-none">
          <h3>{{ title }}</h3>
          <div @click="close" class="text-2xl cursor-pointer">
            &#215;
          </div>
        </header>

        <section class="max-h-full px-4 py-4">
          <slot></slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const SIZES = ["xs", "sm", "md", "lg", "full"];

export default {
  data() {
    return {
      open: true,
    };
  },

  props: {
    title: { type: String, default: "", },
    header: { type: String, required: false, default: "", },
    width: { type: String, default: "full", validator: (value) => SIZES.indexOf(value) !== -1, },
  },

  methods: {
    close() {
      this.open = false;
      this.$emit("close");
    },
  },

  computed: {
    maxWidth() {
      switch (this.width) {
        case "xs":
          return "max-w-lg";
        case "sm":
          return "max-w-xl";
        case "md":
          return "max-w-2xl";
        case "lg":
          return "max-w-3xl";
        case "full":
          return "max-w-full";
      }
    },
  },
};
</script>
