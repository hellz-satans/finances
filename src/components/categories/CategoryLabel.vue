<style lang="scss">
.category-label {
  $icon-size: 1.5em;

  figure {
    font-size: 0.75em;
    line-height: 1.25em;
    height: $icon-size;
    min-width: $icon-size;
    padding-top: 0.25em;
    border-radius: 1em;
    text-align: center;

    .icon {
      padding: 0.5em;
    }
  }
}
</style>

<template>
  <div class="category-label flex">
    <figure class="text-2xl">
      <span class="icon">{{ getIcon(category.subcategory) }}</span>
    </figure>

    <div class="flex flex-col justify-start pl-1">
      <span class="text-small leading-tight mb-1">
        {{ getName(category.subcategory, true) }},
      </span>
      <span class="text-xsmall leading-tight">
        {{ getName(category.category) }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoryLabel',

  props: {
    category: { required: true, type: Object, },
  },

  computed: {
    ... mapState('categories', [ 'cache', ]),

    color() {
      let cat   = this.cache[this.category.subcategory];
      let color = null;

      if (!cat) cat = this.cache[this.category.category];

      if (cat && cat.color)
        color = cat.color;
      else
        color = '#aaa';

      return color;
    },

    figureStyles() {
      let styles = {
        'background-color': this.color,
        color: '#eee',
      };

      return Object.entries(styles)
        .map(e => e.join(':'))
        .join(';')
    },
  },

  methods: {
    /**
     * Return category name for given key.
     *
     * @param key String Category key as found in DB
     * @return String
     */
    getName(key = '') {
      let cat = this.cache[key];

      if (!cat)
        return key
          .replace(/^\w/, key.charAt(0).toUpperCase())
          .replace(/_/g, ' ');
      else
        return cat.name;
    },

    /**
     * Return category icon for given key.
     *
     * @param key String Category key as found in DB
     * @return String
     */
    getIcon(key = '') {
      let cat = this.cache[key]
      let icon = '💵'

      if (cat)
        icon = cat.icon

      return icon
    },
  },
}
</script>
