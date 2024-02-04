import db from '@/db'
import { CategoriesService } from '@/services/categories';
import { categories as seeds } from '@/db/seeds';
import COLORS from '@/config/colors';

/**
 * Category input object.
 *
 * @typedef {CategoryInput}
 * @property key {string} If blank, it will be automatically generated from the {#name} property, e.g., "food_coffee"
 * @property name {string} Category name, e.g., "Coffee"
 * @property color {string} Valid string representing a color: Hex-code, HSL, etc.
 * @property icon {string} Emoji character
 * @property isSubcategory {boolean}
 */

const DEFAULT_VALUES = {
  color: '#455A64',
  icon:  '💵',
};
const OTHER_CATEGORY = {
  color: DEFAULT_VALUES.color,
  icon:  DEFAULT_VALUES.icon,
  key:   'other',
  name:  'Other',
};

const CategoriesStore = {
  state: {
    categories: [],
    subcategories: [],

    /**
     * Key-based cache for categories & subcategories
     */
    cache: {},
  },

	mutations: {
    addCategory(state, category) {
      state.categories.push(category);
    },

    addSubcategory(state, subcategory) {
      state.subcategories.push(subcategory);
    },

    getCategories(state) {
      db.categories
        .toArray()
        // set cache entries -- we can get away with only doin' it here
        .then((arr) => {
          for (let el of arr)
            state.cache[el.key] = el;
          return arr;
        })
        .then(arr => arr.filter(el => !el.deleted))
        .then(arr => arr.filter(el => !el.isSubcategory))
        .then(arr => state.categories = arr)
        .catch((err) => {
          console.error('getCategories:', err);
          throw err;
        });
    },

    getSubcategories(state) {
      db.categories
        .toArray()
        .then(arr => arr.filter(el => !el.deleted))
        .then(arr => arr.filter(el => el.isSubcategory))
        .then(arr => state.subcategories = arr)
        .catch((err) => {
          console.error('getSubcategories:', err);
          throw err;
        });
    },
  },

  actions: {
    /**
     * Create category record.
     *
     * This automatically creates category/subcategory if it doesn't exist.
     *
     * @param input {CategoryInput}
     */
    async submitCategory({ dispatch, commit, state }, input) {
      let category = null,
        data = null,
        subcategory = null;

      data = {
        key:  input.key,
        name: input.name,
        color: input.color,
        isSubcategory: input.isSubcategory,
      }
      // do NOT update category icon when we edit a subcategory
      if (!input.isSubcategory) data.icon = input.icon;

      if (!data.key) {
        data.key = CategoriesService.generateKey(data.name);
      }

      category = await CategoriesService.upsert(data.key, data);

      if (input.isSubcategory) {
        // Create subcategory if passed
        data = {
          key:   input.key,
          name:  input.name,
          color: input.color,
          icon:  input.icon,
          isSubcategory: true,
        };

        if (!data.key) {
          data.key = [category.key, CategoriesService.generateKey(data.name)]
            .join('_');
        }

        subcategory = await CategoriesService.upsert(data.key, data);
      }

      // update category & subcategories color
      db.categories
        .where("key")
        .startsWith(category.key)
        .modify({ color: input.color });

      // expensive, but I'm lazy
      commit('getCategories');
      commit('getSubcategories');

      return input.isSubcategory
        ? subcategory
        : category;
    },

    deleteAll({ commit, state }, input) {
      console.warn('Categories: deleting...')
			db.categories.clear()
    },

    async deleteCategory({ commit, state }, input) {
      const count = await CategoriesService.deleteCategory(input);
      console.info(`Deleted ${count} categories`);

      // expensive, but I'm lazy
      commit('getCategories');
      commit('getSubcategories');

      return count;
    },

    seedData({ commit }) {
      db.categories
        .toArray()
        .then((arr) => {
          let i = 0,
          j = 0,
          cat = null,
          color = null,
          subCat = null,
          subCatKey = null;

          for (i = 0; i < seeds.categories.length; ++i) {
            cat = seeds.categories[i];
            color = COLORS.shift();

            // insert categories
            if (!arr.some(el => el.key == cat.key)) {
              db.categories.add({
                key: cat.key,
                name: cat.name,
                icon: cat.icon,
                isSubcategory: false,
                color: color,
              })
            }

            // insert subcategories
            for (j = 0; j < cat.subcategories.length; ++j) {
              subCat = cat.subcategories[j];
              subCatKey = `${cat.key}_${subCat.key}`;

              if (!arr.some(el => el.key == subCatKey)) {
                db.categories.add({
                  key: subCatKey,
                  name: subCat.name,
                  icon: subCat.icon,
                  isSubcategory: true,
                  color: color,
                });
              }
            }

            // so we never run out of colors
            COLORS.push(color);
          }
        })
        .then(() => commit('getCategories'))
        .then(() => commit('getSubcategories'));
    },

    /**
     * @param newData {Array<CategoryInput>}
     */
    importCategories({ commit, dispatch }, newData) {
      db.categories
        .toArray()
        .then((arr) => {
          for (const importedCategory of newData) {
            if ( !arr.find(el => el.key == importedCategory.key) ) {
              dispatch('submitCategory', {
                key: importedCategory.key,
                name: importedCategory.name,
                color: importedCategory.color,
                icon: importedCategory.icon,
                isSubcategory: !!importedCategory.isSubcategory,
              });
            }
          }
        })
        .then(() => commit('getCategories'))
        .then(() => commit('getSubcategories'));
    },
  },

	getters: {

		/**
		 * Semantic-UI-dropdown compatible options.
		 *
		 * <sui-dropdown multiple fluid selection> requires that the provided
		 * options have the format:
		 *
		 * ```
		 * 	{ key: '', text: '', value: '' }
		 * ```
		 *
		 * @return [Object]
		 */
		categoryOptions(state) {
			const list = [];
			let c = null;

			for (const i in state.categories) {
				c = state.categories[i];
				list.push({ key: c.key, text: c.name, value: c.key, icon: c.icon });
			}

			return list;
		},

    /**
     * Semantic-UI-dropdown compatible options.
     *
     * <sui-dropdown multiple fluid selection> requires that the provided
     * options have the format:
     *
     * ```
     * 	{ key: '', text: '', value: '' }
     * ```
     *
     * @param [String] category Category's key
     * @return [Object]
     */
    subcategoryOptions: (state) => (category) => {
      const list = [];
      let c = null,
        i = 0;

      for (i in state.subcategories) {
        c = state.subcategories[i];
        if (c.isSubcategory && c.key.startsWith(category)) {
          list.push({ key: c.key, text: c.name, value: c.key, icon: c.icon });
        }
      }

      return list;
    },

    /**
     * List of category's subcategories.
     *
     * @param [String] category Category's key
     * @return [Array<Object>]
     */
    categorySubcategories: (state) => (category) => {
      const list = [];
      let c = null,
        i = 0;

      for (i in state.subcategories) {
        c = state.subcategories[i];
        if (c.isSubcategory && c.key && c.key.startsWith(category)) {
          list.push(c);
        }
      }

      return list;
    },

    categoriesKeys(state) {
      return state.categories.flatMap(cat => cat.key)
    },

    otherCategory() {
      let subcategory = Object.assign({}, OTHER_CATEGORY);
      subcategory.key = `${OTHER_CATEGORY.key}_${OTHER_CATEGORY.key}`;

      return {
        category:    Object.assign({}, OTHER_CATEGORY),
        subcategory: subcategory,
      };
    },
  },
};

export {
  CategoriesStore,
  DEFAULT_VALUES,
};
