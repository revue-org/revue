import { createRouter, createWebHistory } from 'vue-router'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'
import MonitoringView from '@/views/MonitoringView.vue'
import DevicesView from '@/views/DevicesView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NotificationView from "@/views/NotificationView.vue";

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'devices',
          name: 'Devices',
          component: DevicesView
        },
        {
          path: 'monitoring',
          name: 'Monitoring',
          component: MonitoringView
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: NotificationView
        }
      ]
    },
    {
      path: '/login',
      component: EmptyLayout,
      children: [
        {
          path: '',
          name: 'Login',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/LoginView.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
