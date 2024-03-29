import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ShowView/:id',
      name: 'ShowView',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShowView.vue')
    },
    {
      path: '/AddView',
      name: '/AddView',
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/Total/:id',
      name: 'Total',
      props: true,
      component: () => import('../views/ShowTotal.vue')
    },
  ]
})

export default router
