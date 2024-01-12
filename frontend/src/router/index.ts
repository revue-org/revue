import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'

const router = createRouter({
  // history: createWebHistory("/"),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: HomeView }
      ]
    },
    {
      path: '/login',
      component: EmptyLayout,
      children: [{
        path: '', name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/LoginView.vue')
      }]
    }
  ]
})

export default router
