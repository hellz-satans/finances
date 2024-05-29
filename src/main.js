import { createApp } from 'vue'
import { i18n } from '@/i18n'
import { router } from '@/router'
import { store } from '@/stores'
import App from '@/App.vue'

import '@/styles/main.scss'

const Finances = createApp(App)

Finances.use(i18n)
Finances.use(router)
Finances.use(store)

Finances.config.errorHandler = (err, instance, info) => {
  store.dispatch('addDebugMessage', 'error', err);
};

Finances.mount('#app')
