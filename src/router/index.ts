import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Popular from '../views/Popular.vue'
import Search from '../views/Search.vue'
import Wishlist from '../views/Wishlist.vue'
import Auth from '../views/Auth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/popular',
      name: 'popular',
      component: Popular
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

export default router