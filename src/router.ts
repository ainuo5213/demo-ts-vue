import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('@/views/login/Password.vue')
    },
  ]
});
// 处理token，若已登录则开放
router.beforeEach((to: any, from: any, next: any) => {
  const isLogined = localStorage.getItem('tsToken');
  if (to.path === '/login' || to.path === '/password') {
      next()
  } else {
    isLogined ? next(): next('/login')
  }
});
export default router
