<template>
  <section class="category-form m-4">
    <form
      name="category"
      class="category-form p-3"
      @submit.stop.prevent="submitForm"
    >
      <div class="w-full mb-4">
        <label
          class="block font-semibold mb-3"
          for="category_name"
        >
          {{ $t('categories.category') }}
        </label>

        <input
          id="category_name"
          name="category_name"
          required
          disabled="disabled"
          :placeholder="$t('categories.category')"
          :value="category?.name"
        />
      </div>

      <div class="w-full mb-4">
        <label
          class="block font-semibold mb-3"
          for="subcategory_name"
        >
          {{ $t('categories.subcategory') }}
        </label>

        <input
          id="subcategory_name"
          name="subcategory_name"
          required
          v-model="name"
          :placeholder="$t('categories.subcategory')"
        />
      </div>

      <div class="w-full mb-4">
        <label
          class="block font-semibold mb-3"
          for="category_icon"
        >
          {{ $t('categories.icon') }}
        </label>

        <input
          id="category_icon"
          name="category_icon"
          required
          v-model="icon"
          :placeholder="$t('categories.pick_emoji')"
        />
      </div>

      <div class="w-full mb-4">
        <label class="flex items-center font-semibold" for="category_color">
          Color
          <span class="color-picker">
            (
            {{ $t('color_picker.current_color') }}
            <div class="color-picker--current" :style="`background-color: ${color}`">
            </div>
            )
          </span>
        </label>

        <div class="mt-2">
          <v-swatches
            @input="color = $event"
            inline
            shapes="circles"
            :swatches="colorList"
            background-color="transparent"
          />
        </div>
      </div>

      <footer class="flex justify-between items-center w-full mt-4">
        <div>
          <delete-category-button
            :categoryKey="recordKey"
            :is-subcategory="isSubcategory"
            @deleted="redirectAfterDelete"
            v-if="deletable"
          />
        </div>

        <button type="submit" class="btn-submit">
          {{ $t('actions.save') }}
        </button>
      </footer>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton.vue';
import VSwatches from 'vue-swatches/src/VSwatches.vue';
import { DEFAULT_VALUES } from '@/stores/modules/categories';
import colors from '@/config/colors';
import { CategoriesService } from '@/services/categories';

export default {
  name: 'SubcategoryForm',

  components: {
    DeleteCategoryButton,
    VSwatches,
  },

  data() {
    return {
      category: null,
      color: DEFAULT_VALUES.color,
      deletable: false,
      icon: DEFAULT_VALUES.icon,
      isSubcategory: true,
      name: null,
      recordKey: null,
    };
  },

  created() {
    const categoryKey = this.$route.query.category_key || 'other';
    const subcategoryKey = this.$route.params.subcategory_key;

    this.loadCategory(categoryKey);
    if (subcategoryKey && subcategoryKey != 'new') {
      this.loadForm(subcategoryKey);
    }
  },

  computed: {
    ... mapState('categories', [ 'cache', 'categories', 'subcategories', ]),
    ... mapGetters('categories', [ 'categorySubcategories', ]),

    colorList() { return colors; },

    categoryStyles() {
      return {
        'background-color': this.color,
        'box-shadow': `0 0.5em 1em 6px ${this.color}`,
      };
    },
  },

  methods: {
    ... mapActions('categories', [ 'submitCategory', ]),

    /**
     * Load category data
     *
     * @param categoryKey {string} E.g., "food"
     */
    loadCategory(categoryKey) {
      this.category = this.cache[categoryKey];

      if (!this.color || this.color == DEFAULT_VALUES.color) {
        this.color = this.category.color;
      }
    },

    /**
     * Load subcategory data
     *
     * @param subcategoryKey {string} E.g., "food_coffee"
     */
    loadForm(subcategoryKey) {
      const categoryKey = CategoriesService.explodeName(subcategoryKey)[0] || DEFAULT_VALUES.key;
      this.loadCategory(categoryKey);
      let subcategory = this.cache[subcategoryKey];

      if (subcategory) {
        this.color         = subcategory.color;
        this.icon          = subcategory.icon;
        this.isSubcategory = subcategory.isSubcategory;
        this.recordKey     = subcategory.key;
        this.name          = subcategory.name;
        this.deletable     = true;
      }
    },

    redirectAfterDelete() {
      this.$router.push('/categories');
    },

    submitForm() {
      const data = {
        color: this.color,
        icon: this.icon,
        isSubcategory: true,
        key: this.recordKey,
        name: this.name,
      };

      if (!data.key) {
        data.key = [
          this.category.key,
          CategoriesService.generateKey(data.name)
        ].join('_')
      }

      this.submitCategory(data)
        .then((record) => {
          if (record) {
            this.$router.push('/categories');
          }
        });
    },
  },
}
</script>

<style lang="scss">
.category-form {
  .category-preview {
    display: flex;
    flex-flow: column nowrap;
    border: 2px solid #ccc;
    margin: 2em 0;
    padding-top: 1em;
    padding-bottom: 2em;

    // both color picker & icon picker
    .toggler {
      color: #eee;
    }

    header {
      padding-bottom: 0.5em;
    }

    .icon-cat-subcat {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    .icon-picker {
      flex-shrink: 1;
      flex: 0 1 35%;

      .toggler {
        border-width: 2px;
        height:    3em;
        min-width: 3em;
        font-size: 2em;
        padding-top: 1em;
      }
    }

    .cat-subcat {
      display: flex;
      flex: 1 0 50%;
      flex-flow: column nowrap;
      margin-left: 0.5em;
    }

    .cat, .subcat {
      input {
        max-width: 100%;
        color: #ccc !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
        border: none !important;
        border-radius: 2px !important;
        border-bottom: 2px solid #ccc !important;
        padding: 0.5em 1em !important;

        &::placeholder {
          color: #fff;
        }
      }
    }
  }
}
</style>
