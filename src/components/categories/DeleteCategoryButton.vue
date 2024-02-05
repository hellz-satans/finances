<template>
  <button
    class="btn-danger"
    type="button"
    @click.stop.prevent="confirmDelete"
  >
    {{ $t('actions.delete') }}
    <span class="icon">&#128465;</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "DeleteCategoryButton",

  props: {
    categoryKey: { type: String, required: true, },
    isSubcategory: { type: Boolean, required: true, },
  },

  computed: {
    prueba() {
      return this.categoryKey + (this.isSubcategory ? 'sub' : 'no sub');
    },
  },

  methods: {
    ... mapActions('categories', [ 'deleteCategory', ]),

    async confirmDelete() {
      let msg = this.$t('actions.confirm') + '\n\n',
        count = 0;

      if (!this.isSubcategory) {
        msg += this.$t('categories.delete_category_notice') + '\n';
      }

      msg += this.$t('actions.no_turning_back');

      if (window.confirm(msg)) {
        count = await this.deleteCategory({key: this.categoryKey, isSubcategory: this.isSubcategory});
      }

      if (count > 0) {
        this.$emit('deleted', true);
      }
    },
  },
}
</script>
