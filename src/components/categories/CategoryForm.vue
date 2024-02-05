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
          v-model="name"
          :placeholder="$t('categories.category')"
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
        <label class="block font-semibold" for="category_color">
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
        <delete-category-button
          :categoryKey="recordKey"
          :is-subcategory="false"
          @deleted="redirectAfterDelete"
        />

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

export default {
  name: 'CategoryForm',

  components: {
    DeleteCategoryButton,
    VSwatches,
  },

  data() {
    return {
      color: DEFAULT_VALUES.color,
      deletable: false,
      icon: DEFAULT_VALUES.icon,
      isSubcategory: false,
      recordKey: null,
      name: null,
    };
  },

  created() {
    const categoryKey = this.$route.params.category_key;

    if (categoryKey && categoryKey != 'new') {
      this.loadForm(categoryKey);
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

    loadForm(categoryKey) {
      let category = this.cache[categoryKey];

      if (category) {
        this.deletable     = true;
        this.color         = category.color;
        this.icon          = category.icon;
        this.isSubcategory = category.isSubcategory;
        this.recordKey     = category.key;
        this.name          = category.name;
      }
    },

    redirectAfterDelete() {
      this.$router.push('/categories');
    },

    submitForm() {
      const data = {
        color: this.color,
        icon: this.icon,
        isSubcategory: false,
        key: this.recordKey,
        name: this.name,
      };

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
