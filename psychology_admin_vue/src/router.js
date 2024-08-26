import Vue from 'vue'
import Router from 'vue-router'

const login = () => import( './components/Login.vue')

const home = () => import('./components/Home.vue')

const welcome = () => import( './components/Welcome.vue')

const users = () => import('./components/user/Users.vue')
const myOrder = () => import('./components/user/MyOrder.vue')
const myFavorite = () => import( './components/user/MyFavorite.vue')
const myActivityList = () => import('./components/user/MyActivityList.vue')
const articleList = () => import( './components/shop/ArticleList.vue')
const classList = () => import('./components/shop/ClassList.vue')
const comments = () => import('./components/shop/Comments.vue')
const activityList = () => import('./components/shop/ActivityList.vue')
const problem = () => import('./components/shop/Problem.vue')
const scoreRecord = () => import('./components/shop/ScoreRecord.vue')


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: welcome },
        { path: '/users', component: users },
        { path: '/myOrder', component: myOrder },
        { path: '/myFavorite', component: myFavorite },
        { path: '/articleList', component: articleList },
        { path: '/classList', component: classList },
        { path: '/comments', component: comments},
        { path: '/activityList', component: activityList},
        { path: '/myActivityList', component: myActivityList},
        { path: '/problem', component: problem },
        { path: '/scoreRecord', component: scoreRecord },

      ]
    },
    {
      path:'/:catchAll(.*)',
      name:'NotFound',
      component: () => import('./components/NotFound.vue')
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
