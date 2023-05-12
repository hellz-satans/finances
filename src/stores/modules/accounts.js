import db from '@/db';

const SKIP_DEFAULT_ACCOUNT = 'SKIP_DEFAULT_ACCOUNT'
const DEFAULT_ACCOUNT = {
  key: 'cash',
  name: 'Cash',
  balance: 0,
  color: '#2ecc70',
}

const AccountsStore = {
	state: {
		accounts: [],
    cache: {},
	},

	mutations: {
    addAccount(state, account) {
      state.accounts.push(account)
    },

		getAccounts(state) {
			db.accounts.toArray()
				.then(arr => state.accounts = arr)
        .then(() => {
          state.accounts.forEach((acc, i) => {
            state.cache[acc.key] = acc
          })
        })
				.catch((err) => {
					console.error('getAccounts:', err);
					throw err;
				});
		},

    toggleIncludeAccount(state, key) {
      db.accounts.get(key)
        .then((acc) => {
          return db.accounts.update(acc.key, {
            includeInSummary: !acc.includeInSummary,
          });
        })
        .catch((err) => {
          console.warn('account not found:', key);
          throw err;
        });
    },
	},

	actions: {

    createAccount({ commit }, account) {
      if (!account.key && account.name) {
        // TODO: add filter for account name
        account.key = account.name.toLowerCase()
      }
      return db.accounts.add(account)
        .then((key) => {
          account.key = key;
          commit('addAccount', account);
          return key;
        })
        .catch((err) => {
          console.error('[ACTION] createAccount:', err);
          throw err
        });
    },

    toggleIncludeAccount({ commit }, key) {
      commit('toggleIncludeAccount', key);
      // give it time to update the record
      window.setTimeout((ev) => { commit('getAccounts'); }, 180);
    },

		submitAccount({ commit, dispatch, state }, data) {
			const actionName = (data.key)
				? 'updateAccount'
				: 'createAccount';

      console.debug('[ACTION] submitAccount:', actionName, data);
			return dispatch(actionName, data)
				.then((key) => {
					return key;
				});
		},

    updateAccount({ commit, state }, data) {
      return db.accounts.get({ key: data.key })
        .then((acc) => {
          data.key = acc.key;
          return db.accounts.update(data.key, data);
        })
        .then((n) => {
          if (n > 0) {
            // update cached record
            state.accounts
              .map((el) => {
                if (el.key === data.key) {
                  for (let k in data) {
                    el[k] = data[k];
                  }
                }
              });
          }

          return n;
        });
    },

    /**
     * Add (or deduct, if given a negative amount) credits from account.
     *
     * @option data {Number} amount If negative, deduct amount from balance
     * @option data {String} key Account key
     * @param {Object} data
     */
    add({ commit }, data) {
      return db.accounts.get({ key: data.key })
        .then((account) => {
          if (!account) {
            throw `Account not found: ${data.key}`;
          }

          const fields = {
            // be paranoid about data types 'cuz JS
            balance: Number(account.balance + data.amount),
          }
          return db.accounts.update(account.key, fields)
        })
        .then((key) => {
          commit('getAccounts')
          return key
        })
        .catch((err) => {
          console.error('accounts/add:', err)
        })
    },

    /**
     * Transfer amount from one account to another
     *
     * @option data {Number} amount
     * @option data {String} from Account key
     * @option data {String} to Account key
     * @param {Object} data
     */
    transfer({ commit, dispatch, state }, data) {
      const from = state.cache[data.from]
      const to = state.cache[data.to]
      const amount = Number(data.amount)

      if (!from || !to) {
        const err = `Invalid accounts: from = ${data.from}, to = ${data.to}`;
        window.alert(err)
        throw err
      }

      // expenses/createExpense will dispatch accounts/add(price * -1)
      dispatch(
        'expenses/createExpense',
        {
          account: from.key,
          category: 'transfer',
          date: new Date(),
          description: `Transfer -> ${to.name} (${to.key})`,
          price: (amount * -1),
          subcategory: 'transfer_transfer',
          transfer: true,
        },
        { root: true }
      ).then(() => {
        return dispatch('add', {
          amount: amount,
          key: to.key,
        })
      }).then((toKey) => {
        commit('expenses/getExpenses', undefined, { root: true })
        return true;
      })
    },

		deleteAccount({ commit, dispatch }, account) {
      if (account.key == DEFAULT_ACCOUNT.key) {
        dispatch('preferences/submitPreference',
          {
            key: SKIP_DEFAULT_ACCOUNT,
            value: true,
          },
          { root: true }
        )
      }

			return db.accounts.delete(account.key)
				.then((whatever) => {
					commit('getAccounts');
					return whatever;
				});
		},

		deleteAll({ dispatch }) {
      console.warn('Accounts: deleting...')
			db.accounts
				.toArray()
				.then((arr) => {
					for (let i in arr) {
						dispatch('deleteAccount', arr[i])
					}
				})
				.catch((err) => {
					console.error('accounts/deleteAll:', err)
					throw err
				})
		},

		importAccounts({ dispatch }, newData) {
			db.accounts
				.toArray()
				.then((arr) => {
          let exists = false

          for (let acc of newData) {
            exists = arr.some((el) => {
              return el.key === acc.key && el.name === acc.name
            })

            if (!exists) {
              dispatch('createAccount', acc)
            }
					}
				})
				.catch((err) => {
					console.error('accounts/importAccount:', err)
					throw err
				})
		},

    /**
     * Default account.
     */
    createCashAccount({ commit }) {
      // make sure the preferences table exists
      if (db.preferences) {
        db.preferences
          .where('key').equals(SKIP_DEFAULT_ACCOUNT)
          .toArray()
          .then((arr) => {
            return arr.length === 0 || !arr[0].value
          })
          .then((shouldCreate) => {
            if (shouldCreate) {
              return db
                .accounts
                .where('key').equals(DEFAULT_ACCOUNT.key)
                .toArray()
            }
          })
          .then((arr) => {
            if (arr && arr.length === 0) {
              db.accounts
                .add(DEFAULT_ACCOUNT)
                .then((key) => {
                  commit('addAccount', DEFAULT_ACCOUNT)
                })
            }
          })
      }
    },

    seedData({ commit, state }) {
      const n = 2
      let i = 0,
        account = {}

      for (i = 1; i <= n; ++i) {
        account = {
          key: `account${i}`,
          name: `Account #${i}`,
          balance: i * 100,
          color: `#${i*2}${i*4+1}${i*2+3}`,
        }
        if (!state.cache[account.key]) {
          db.accounts.add(account)
        }
      }

      commit('getAccounts')
    },
	},

	getters: {
    totalBalance: (state) => {
      if (state.accounts.length === 0)
        return 0;

      return state.accounts
        .filter(acc => acc.includeInSummary)
        .map(acc => acc.balance)
        .reduce((total, curr) => total + curr, 0);
    },

    /**
     * Return SUI-compatible options for dropdown component.
     *
     * @return [Object]
     */
    accountsOptions(state) {
      const list = []
      let a = null

      for (const i in state.accounts) {
        a = state.accounts[i]
        list.push({ key: a.key, text: a.name, value: a.key })
      }

      return list
    },
	},
};

export { AccountsStore };
