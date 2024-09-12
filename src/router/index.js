import {createRouter, createWebHistory} from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login2',  // 将根路径重定向到 /login
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manager.vue'),
    redirect:"/manager/home", //重定向到主页

    children:[
      { path :"home",name:"home",component: () => import('../views/manager/home.vue')},
      { path :"user",name:"user",component: () => import('../views/manager/user.vue')}

    ]

  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },
  {
    path: '/login2',
    name: 'login2',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login2.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
