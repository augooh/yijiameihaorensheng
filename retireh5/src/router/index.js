import Vue from 'vue'
import Router from 'vue-router'
import WinMain from '@/components/WinMain'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/:pagename',
      name: 'WinMain',
      component: WinMain
    }
  ]
})
