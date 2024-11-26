import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import TrendingContent from '../views/TrendingContent.vue'
import Browse from '../views/Browse.vue'
import MyList from '../views/MyList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingContent,
      meta: { requiresAuth: true }
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-list',
      name: 'myList',
      component: MyList,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/signin')
  } else {
    next()
  }
})

export default router