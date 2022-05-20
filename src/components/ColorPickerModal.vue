<template>
  <div class="color-picker">
    <div class="toggler" @click.stop.prevent="isOpen = true">
      {{ $t('color_picker.change_color') }}
    </div>

    <v-modal
      v-if="isOpen"
      :title="$t('color_picker.pick_color')"
      @close="isOpen = false"
    >
      <div>
        <v-swatches
          @input="colorPicked($event)"
          inline
          shapes="circles"
          :swatches="colorList"
          background-color="transparent"
        />
      </div>

      <hr>

      <div class="actions text-right">
        <button
          type="button"
          class="pt-3 px-3"
          @click.prevent.stop="isOpen = false"
        >
          {{ $t('actions.close') }}
        </button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import VModal from '@/components/VModal.vue';
import VSwatches from 'vue-swatches/src/VSwatches.vue';
import colors from '@/config/colors';

export default {
  name: 'ColorPickerModal',

  components: {
    VModal,
    VSwatches,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    colorList() { return colors; },
  },

  methods: {
    colorPicked(color) {
      this.$emit('input', color)
      this.$emit('update:modelValue', color)
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss">
.color-picker {
  .toggler {
    text-align: center;
    cursor: pointer;
    padding: 0.25em;
    padding-left: 0.5em;
  }
}
</style>
