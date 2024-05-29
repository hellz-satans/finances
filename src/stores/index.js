import { createStore } from 'vuex';

import { exportDB } from '@/db/exporter';
import modules from '@/stores/modules';
import { downloadJsonUsingBrowser } from '@/services/downloads';

export const store = createStore({
  modules: {
		accounts: {
			namespaced: true,
			... modules.accounts,
		},
		categories: {
			namespaced: true,
			... modules.categories,
		},
		expenses: {
			namespaced: true,
			... modules.expenses,
		},
		preferences: {
			namespaced: true,
			... modules.preferences,
		},
  },

  mutations: {
    addDebugMessage(state, msg) {
      state.debugMessages.push(msg);
    },
  },

  actions: {
		/**
		 * Destroy local data:
		 *
		 * 	* accounts
		 * 	* expenses
		 *
		 * @return void
		 */
		deleteData({ dispatch }) {
      console.warn('Deleting data...')
			dispatch('accounts/deleteAll')
			dispatch('categories/deleteAll')
			dispatch('expenses/deleteAll')
		},

		/**
		 * Export data in a secure fashion.
		 *
		 * Maybe ask the user for a passphrase or something like that.
		 * First encode data and then cipher it, see
		 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
		 */
		exportData({ dispatch, state }, ext = 'json') {
      dispatch('addDebugMessage', { level: 'info', message: 'Exporting data...' });
      exportDB()
        // .then((data) => {
        //   console.debug('db#exportDB: data =', data);
        // });
        .then((data) => {
          downloadJsonUsingBrowser(`my_finances.${ext}`, data)
        })
        .catch((err) => {
          dispatch(
            'addDebugMessage',
            {
              level: 'error',
              message: `Could not export data: ${err}`
            }
          );
        });
		},

    /**
     * Import secured data.
     *
     * Maybe ask the user for a passphrase or something like that and
     * decipher before inserting.
     */
    importData({ dispatch }, data) {
      if (data.accounts) {
        dispatch('accounts/importAccounts', data.accounts)
      }
      if (data.categories) {
        dispatch('categories/importCategories', data.categories)
      }
      if (data.expenses) {
        dispatch('expenses/importExpenses', data.expenses)
      }
      if (data.preferences) {
        dispatch('preferences/importPreferences', data.preferences)
      }
    },

    /**
     * Seed data to DB.
     *
     * Each store should handle its seed data operation.
     */
    seedData({ dispatch }) {
      dispatch('accounts/seedData')
      dispatch('expenses/seedData')
    },

    addDebugMessage({ commit }, msg) {
      commit('addDebugMessage', msg);

      switch (msg.level) {
        case 'error':
          console.error(msg.message || msg);
          break;
        case 'warn':
          console.warn(msg.message || msg);
          break;
        case 'info':
        default:
          console.info(msg.message || msg);
          break;
      }
    }
  },

  state: {
    debugMessages: []
  },

  getters: {
    balanceSummary: (state, getters, rootGetters) => {
      return getters['accounts/totalBalance'] - getters['expenses/totalExpenses'];
    },
  }
})
