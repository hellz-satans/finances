import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/stores'
import App from '@/App.vue'

import '@/styles/main.scss'

const Finances = createApp(App)

Finances.use(router)
Finances.use(store)

Finances.mount('#app')
