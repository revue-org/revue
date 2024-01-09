import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import './assets/main.css'
import { useUserStore } from './stores/user'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.name != 'Login' && !userStore.isLoggedIn) next('/login')
  else next()
})
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {} // import Quasar plugins and add here
})
app.mount('#app')
