import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/view/index').default
    },
    {
      path: '/wx',
      name: 'wx-page',
      component: require('@/view/wx').default
    },
    {
      path: '/shell_list',
      name: 'shell-list',
      component: require('@/view/shell_list').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
