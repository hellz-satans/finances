import { createRouter, createWebHashHistory } from 'vue-router'

import About from '@/pages/About.vue'
import AccountForm from '@/components/accounts/AccountForm.vue'
import CategoryForm from '@/components/categories/CategoryForm.vue'
import ExpenseForm from '@/components/expenses/ExpenseForm.vue'
import Home from '@/pages/Home.vue'
import ImportExport from '@/pages/ImportExport.vue'
import Settings from '@/pages/Settings.vue'
import PreferenceForm from '@/components/PreferenceForm.vue'
import TransferForm from '@/components/accounts/TransferForm.vue'

export const history = createWebHashHistory()

export const router = createRouter({
  linkActiveClass: "active",

  history: history,

  routes: [
    {
      path: '/expense/:expense_id',
      name: 'expense-form',
      component: ExpenseForm,
      hide: true,
    },

    {
      path: '/transfer',
      name: 'transfer',
      icon: 'exchange-alt',
      component: TransferForm,
    },

    {
      path: '/preference/:key',
      name: 'preference',
      hide: true,
      component: PreferenceForm,
    },

    {
      path: '/account/:account_key',
      name: 'account-form',
      component: AccountForm,
      hide: true,
    },

    {
      path: '/categories',
      name: 'categories',
      icon: 'database',
      component: CategoryForm,
    },

    {
      path: '/import-export',
      name: 'data',
      icon: 'folder-open',
      component: ImportExport
    },

    {
      path: '/settings',
      name: 'settings',
      icon: 'settings',
      component: Settings,
    },

    {
      path: '/',
      name: 'home',
      icon: 'home',
      hide: true,
      exact: true,
      component: Home
    },

    {
      path: '/about',
      name: 'about',
      icon: 'info',
      component: About,
    },
  ]
})
