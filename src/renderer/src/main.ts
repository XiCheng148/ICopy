import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

createApp(App)
  .use(PrimeVue, {
    unstyled: true
  })
  .mount('#app')
