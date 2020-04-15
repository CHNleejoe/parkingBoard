import Vue from 'vue'
import Router from 'vue-router'

const View = ()=>import('../views/view')
const HrPage = ()=>import('../views/HrPage.vue')
const Performance = ()=>import('../views/performance.vue')
const Recruitment = ()=>import('../views/recruitment.vue')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'View',
      component: View
    },
    {path:'/hrPage',name:'HrPage',component:HrPage},//人力资源总表
    {path:'/performance',name:'Performance',component:Performance},//全员绩效表
    {path:'/pecruitment',name:'Recruitment',component:Recruitment},
  ]
})
