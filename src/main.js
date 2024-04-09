import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'

const pinia = createPinia()

// Vuetify
import { createVuetify } from 'vuetify'
import * as allComponents from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VEmptyState } from 'vuetify/labs/VEmptyState'

const vuetify = createVuetify({
  ssr: true,
  directives,
  components: {
    ...allComponents,
    VEmptyState
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// create app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')
