import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/index').default
    },
    {
      path: '/wx',
      name: 'wx-page',
      component: require('@/components/wx').default
    },
    {
      path: '/shell_list',
      name: 'shell-list',
      component: require('@/components/shell_list').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
