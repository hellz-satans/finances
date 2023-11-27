<template>
  <section id="categories-page">
    <section>
      <header>
        <h1 class="inline-box text-2xl">{{ $t("categories.categories") }}</h1>

        <div v-if="!!selectedCategory" class="text-sm">
          <router-link to="#">
            {{ $t("actions.edit") }}
          </router-link>
        </div>
      </header>

      <article class="horizontal-list">
        <div class="item">
          <router-link to="#">
            + {{ $t("categories.new_category") }}
          </router-link>
        </div>

        <div
          v-for="(category, i) in categories"
          :key="i"
          :style="'min-width: 10rem; background:' + (category.color || 'var(--default-color-dark, #666)')"
          :class="categoryClasses(category)"
          @click="setCategory(category)"
        >
          <div>
            <span class="icon">{{ category.icon }}</span>
            {{ category.name }}
          </div>
        </div>
      </article>
    </section>

    <section>
      <header>
        <h2 class="inline-box ">{{ $t("categories.subcategories") }}</h2>

        <div v-if="!!selectedSubcategory" class="text-sm">
          <router-link to="#">
            {{ $t("actions.edit") }}
          </router-link>
        </div>
      </header>

      <article class="horizontal-list flex-wrap">
        <div class="item" v-show="!!selectedCategory">
          <router-link to="#">
            + {{ $t("categories.new_subcategory") }}
          </router-link>
        </div>

        <div
          v-for="(category, i) in subcategories"
          :key="i"
          :style="'background:' + (category.color || 'var(--default-color-dark, #666)')"
          :class="categoryClasses(category, true)"
          v-show="shouldShowSubcategory(category)"
          @click="setSubcategory(category)"
        >
          <div>
            <span class="icon">{{ category.icon }}</span>
            {{ category.name }}
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedCategory: null,
      selectedSubcategory: null,
    };
  },

  methods: {
    /**
     * @param category {object}
     * @param isSubcategory {boolean} Compare to `#selectedSubcategory`
     * @return {Array<string>}
     */
    categoryClasses(category = {}, isSubcategory = false) {
      const classes = ['item']

      if (!isSubcategory && category.key == this.selectedCategory?.key) {
        classes.push('active');
      } else if (isSubcategory && category.key == this.selectedSubcategory?.key) {
        classes.push('active');
      }

      return classes;
    },

    /**
     * Toggle current category.
     *
     * @param category {object}
     */
    setCategory(category) {
      if (category.key == this.selectedCategory?.key) {
        this.selectedCategory = null;
        this.selectedSubcategory = null;
      } else {
        this.selectedCategory = category;
      }
    },

    /**
     * Toggle current subcategory.
     *
     * @param category {object}
     */
    setSubcategory(category) {
      if (category.key == this.selectedSubcategory?.key) {
        this.selectedSubcategory = null;
      } else {
        this.selectedSubcategory = category;
      }
    },

    /**
     * @param category {object}
     * @return {boolean}
     */
    shouldShowSubcategory(category) {
      if (this.selectedCategory == null) {
        return true;
      }

      return category.key.startsWith(this.selectedCategory.key);
    },
  },

  computed: {
    ... mapState('categories', [ 'categories', 'subcategories' ]),

    currentSubcategories() {
      if (!this.selectedCategory) return [];

      return this.subcategories
        .filter(cat => cat.key.startsWith(this.selectedCategory.key));
    },
  },
};
</script>

<style lang="scss">
#categories-page {
  @apply m-4;

  header {
    @apply flex justify-between items-center;
  }

  .horizontal-list {
    @apply my-2 py-2;

    .item {
      cursor: pointer;
      min-height: 3em;

      @apply text-white flex justify-center items-center text-center p-2 m-1 rounded border border-gray-400;

      &.active {
        box-shadow: 0rem 0rem 0.5rem 0.1rem var(--shadow-color, #666666);
      }
    }
  }
}
</style>
