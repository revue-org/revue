import { createPinia, type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { Notify, Quasar } from 'quasar' // Import icon libraries
import '@quasar/extras/material-icons/material-icons.css' // Import Quasar css
import 'quasar/src/css/index.sass'
import '@/assets/main.scss'
import { useUserStore } from '@/stores/user'

const app = createApp(App)
const pinia: Pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // here you are applying a package to the second instance that is not the one which is connected to the vue app.
app.use(pinia)

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.name != 'Login' && !userStore.isLoggedIn) next('/login')
  else if (to.name == 'Login' && userStore.isLoggedIn) next('/')
  else next()
})

app.use(router)
app.use(Quasar, {
  plugins: { Notify } // import Quasar plugins and add here
})
app.mount('#app')
