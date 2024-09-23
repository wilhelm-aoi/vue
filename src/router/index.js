import {createRouter, createWebHistory} from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login2',  // 将根路径重定向到 /login
  },
  // {
  //   path: '/:pathMatch(.*)*',  // 通配所有未匹配到的路由
  //   name: '404',
  //   component: () => import('../views/error/404.vue')
  // },

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
      {
        path: '403',  // 通配所有未匹配到的路由
        name: '403',
        component: () => import('../views/error/403.vue')
      },

      { path :"home",name:"home",meta:{ name:'系统首页'},component: () => import('../views/manager/home.vue')},
      { path :"user",name:"user",meta:{ name:'用户信息'},component: () => import('../views/manager/user.vue')},
      { path :"person",name:"person",meta:{ name:'个人主页'},component: () => import('../views/manager/person.vue')},
      { path :"password",name:"password",meta:{ name:'修改密码'},component: () => import('../views/manager/password.vue')},

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

// router.beforeEach((to, from, next) => {
//   const adminPaths = ['/manager']; // 管理员才能访问的路由列表
//   const userStr = localStorage.getItem('honey-user'); // 获取用户信息的字符串
//
//   // 如果目标路径是 /403，直接放行，防止无限重定向
//   if (to.path === '/403') {
//     next(); // 直接允许进入 403 页面
//   }
//
//   // 如果用户信息为空，或者解析失败，我们将其作为一个无权限用户处理
//   if (!userStr) {
//     next('/login2'); // 如果用户信息为空，直接跳转到 403 页面
//   }
//
//   const user = JSON.parse(userStr); // 解析用户信息
//
//   // 检查当前路径是否是管理员权限路径
//   if (user.role !== '管理员' && adminPaths.includes(to.path)) {
//     next('/403'); // 用户不是管理员并且试图访问管理员页面时跳转到 403 页面
//   }
// });



export default router
