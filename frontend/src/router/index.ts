import { createRouter, createWebHistory, type Router } from 'vue-router'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'
/*import MonitoringView from '@/views/MonitoringView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NotificationView from '@/views/NotificationView.vue'
import SecurityRuleView from '@/views/SecurityRuleView.vue'*/
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DevicesView from "@/views/DevicesView.vue";
import NotificationView from "@/views/NotificationView.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          path: 'notifications',
          name: 'Notifications',
          component: NotificationView
        }
        /*{
          path: 'monitoring',
          name: 'Monitoring',
          component: MonitoringView
        },
        {
          path: 'alarms',
          name: 'Alarms',
          component: SecurityRuleView
        },
        {
          path: 'history',
          name: 'History',
          component: LogView
        }*/
      ]
    },
    {
      path: '/login',
      component: EmptyLayout,
      children: [
        {
          path: '',
          name: 'Login',
          // lazy-load
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
