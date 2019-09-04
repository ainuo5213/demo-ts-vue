import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/index.vue'

Vue.use(Router);

export const asyncRouterMap = [
    {
        path: '/',
        component: Layout,
        hidden: true,
        name: 'dashboard',
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'fa fa-home'
                },
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/dataManage',
        component: Layout,
        hidden: true,
        name: 'dataManage',
        meta: {
            title: '数据管理',
            icon: 'fa fa-database'
        },
        redirect: '/tableData',
        children: [
            {
                path: '/tableData',
                name: 'tableData',
                meta: {
                    title: '表格管理',
                    icon: 'fa fa-table'
                },
                component: () => import("@/views/dataManage/tableData.vue")
            },
            {
                path: '/formData',
                name: 'formData',
                meta: {
                    title: '表单管理',
                    icon: 'fa fa-file-text-o'
                },
                component: () => import("@/views/dataManage/formData.vue")
            },
            {
                path: '/chartsData',
                name: 'chartsData',
                meta: {
                    title: '图表管理',
                    icon: 'fa fa-bar-chart'
                },
                component: () => import("@/views/dataManage/chartsData.vue")
            },
        ]
    },
    {
        path: '/userManage',
        component: Layout,
        name: 'userManage',
        hidden: true,
        redirect: '/accountData',
        children: [
            {
                path: '/accountData',
                name: 'accountData',
                meta: {
                    'title': '账户管理',
                    icon: 'fa fa-user-plus'
                },
                component: () => import('@/views/userManage/accountData.vue')
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        hidden: false,
        name: 'user',
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                meta: {
                    title: '个人中心'
                },
                component: () => import('@/views/userManage/userInfo.vue')
            }
        ]
    },
    {
        path: '/404',
        hidden: false,
        meta: {
          title: '404'
        },
        component: () => import('@/views/404.vue'),
        name: '404',
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/password',
        hidden: false,
        meta: {
            title: '找回密码'
        },
        name: 'password',
        component: () => import('@/views/login/Password.vue')
    },
    {
        path: '/login',
        hidden: false,
        meta: {
            title: '系统登陆'
        },
        name: 'login',
        component: () => import('@/views/login/Login.vue')
    },
];

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: asyncRouterMap
});
// 处理token，若已登录则开放
router.beforeEach((to: any, from: any, next: any) => {
    const isLogined = localStorage.getItem('tsToken');
    if (to.path === '/login' || to.path === '/password') {
        next()
    } else {
        isLogined ? next() : next('/login')
    }
});
export default router
