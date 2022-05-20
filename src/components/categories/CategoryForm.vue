<template>
  <form
    name="category"
    class="category-form p-3"
    @submit.stop.prevent="submitForm"
  >
    <section class="category-options">
      <div class="w-full mb-4">
        <label class="block font-medium">{{ $t('categories.category') }}</label>
        <div class="flex flex-row">
          <category-picker
            class="w-full"
            v-model="category"
            :options="categoryOptions"
            :category="category"
          />
          <transition name="sweep-left">
            <delete-category-button
              class="ml-2 w-1/5"
              v-if="categoryDeletable"
              :category="category"
              @deleted="resetCategory"
            />
          </transition>
        </div>
      </div>

      <div class="w-full mb-4">
        <label class="block font-medium">{{ $t('categories.subcategory') }}</label>
        <div class="flex flex-row">
          <category-picker
            class="w-full"
            v-model="subcategory"
            :disabled="! category.name"
            :options="subcategoryOptions"
            :category="subcategory"
          />
          <transition name="sweep-left">
            <delete-category-button
              class="ml-2 w-1/5"
              v-if="subcategoryDeletable"
              :category="subcategory"
              @deleted="resetSubcategory"
            />
          </transition>
        </div>
      </div>
    </section>

    <article :style="previewStyle" class="category-preview card pt-0 pb-6">
      <header class="justify-end m-0 mt-2 mr-4 p-0">
        <color-picker-modal
          class="inline-block"
          @input="setColor($event)"
        />
      </header>

      <section class="icon-cat-subcat">
        <div class="icon-picker flex flex-col justify-center rounded-xl border border-gray-100">
          <input
            class="bg-transparent block border-0 text-center text-4xl"
            v-model="icon"
            placeholder="emoji"
          />
        </div>

        <div class="cat-subcat">
          <div class="cat mb-4">
            <input
              ref="categoryInput"
              v-model="category.name"
              :placeholder="$t('categories.category')"
            />
          </div>

          <div class="subcat">
            <input
              ref="subcategoryInput"
              v-model="subcategory.name"
              :placeholder="$t('categories.subcategory')"
            />
          </div>
        </div>
      </section>
    </article>

    <footer class="actions text-right">
      <button
        type="submit"
      >{{ $t('actions.save') }}</button>
    </footer>
  </form>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ColorPickerModal from '@/components/ColorPickerModal.vue'
import IconPickerModal from '@/components/IconPickerModal.vue'
import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton.vue'
import CategoryPicker from '@/components/categories/CategoryPicker.vue'
import { DEFAULT_VALUES } from '@/stores/modules/categories';

const OPTION_NEW = {
  key: null,
  name: 'New category',
  icon: '+',
  color: DEFAULT_VALUES.color,
};

export default {
  name: 'CategoryForm',

  components: {
    CategoryPicker,
    ColorPickerModal,
    DeleteCategoryButton,
    IconPickerModal,
  },

  data() {
    return {
      category: {
        color: DEFAULT_VALUES.color,
        icon:  DEFAULT_VALUES.icon,
        name:  null,
        key:   null,
      },
      subcategory: {
        color: DEFAULT_VALUES.color,
        icon:  DEFAULT_VALUES.icon,
        name:  null,
        key:   null,
      },
      icon: DEFAULT_VALUES.icon,
    };
  },

  computed: {
    ... mapState('categories', [ 'cache', 'categories', 'subcategories', ]),
    ... mapGetters('categories', [ 'categorySubcategories', ]),

    categoryDeletable() {
      return this.category.key && this.category.key != OPTION_NEW.key;
    },

    subcategoryDeletable() {
      return this.subcategory.key && this.subcategory.key != OPTION_NEW.key;
    },

    categoryOptions() {
      return [ Object.assign({}, OPTION_NEW), ]
        .concat(this.categories);
    },

    subcategoryOptions() {
      return [ Object.assign({}, OPTION_NEW), ]
        .concat(this.categorySubcategories(this.category.key));
    },

    previewStyle() {
      let color = this.category.color || DEFAULT_VALUES.color;

      const styles = {
        'background-color': color,
        'box-shadow': `0 0.5em 1em 6px ${color}`,
      }

      return styles
    },
  },

  methods: {
    ... mapActions('categories', [ 'submitCategory', ]),

    submitForm() {
      const data = {
        category: this.category.name,
        categoryKey: this.category.key,
        subcategory: this.subcategory.name,
        subcategoryKey: this.subcategory.key,
        color: this.category.color,
        icon: this.icon,
        isSubcategory: !!this.subcategory.name,
      };

      this.submitCategory(data)
        .then((record) => {
          if (record) {
            this.$router.push('/');
          }
        });
    },

    setColor(color) {
      this.category.color = color;
      this.subcategory.color = color;
    },

    resetCategory() {
      this.category.name  = this.category.key = null;
      this.category.icon  = DEFAULT_VALUES.icon;
      this.category.color = DEFAULT_VALUES.color;
    },

    resetSubcategory() {
      this.subcategory.name  = this.subcategory.key = null;
      this.subcategory.icon  = DEFAULT_VALUES.icon;
      this.subcategory.color = DEFAULT_VALUES.color;
    },
  },

  watch: {
    category(newCategory, oldVal) {
      for (let field in DEFAULT_VALUES) {
        this.category[field] = newCategory[field] || DEFAULT_VALUES[field];

        if (field === 'icon')
          this.icon = this.category[field]
      }

      if (newCategory.key === OPTION_NEW.key)
        this.$refs.categoryInput.focus();

      this.resetSubcategory();
    },

    subcategory(newSubcategory, _oldVal) {
      for (let field in DEFAULT_VALUES) {
        this.subcategory[field] = newSubcategory[field] || DEFAULT_VALUES[field];

        if (field === 'icon')
          this.icon = this.subcategory[field]
      }
    }
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
