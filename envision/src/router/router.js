import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import router_s from '../router/router-s.js'
import router_z from '../router/router-z.js'
import router_x from '../router/router-x.js'
import router_d from '../router/router-d.js'
import router_l from '../router/router-l.js'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home
      },
      // {
      //     path: '/backStage_home',
      //     name: 'manage',
      //     component: () => import('../views/manage.vue'),
      //     children:[
      //         //首页
      //         {
      //             path:'',
      //             name:'backStage_Itemhome',
      //             component:()=>import('../views/backStage_Itemhome.vue')
      //         },
      //         //评价管理
      //         {
      //             path:'/backStage_Itemevaluate',
      //             name:'backStage_Itemevaluate',
      //             component:()=>import('../views/backStage_Itemevaluate.vue')
      //         },
      //         //店铺装修
      //         {
      //             path:'backStage_Itemfitment',
      //             name:'backStage_Itemfitment',
      //             component:()=>import('../views/backStage_Itemfitment.vue')
      //         },
      //         //店铺装修图片
      //         {
      //             path:'backStage_fitmentCard',
      //             name:'backStage_fitmentCard',
      //             component:()=>import('../views/backStage_fitmentCard.vue')
      //         },
      //         //评论回复
      //         {
      //             path:'comment_reply',
      //             name:'comment_reply',
      //             component:()=>import('../views/backStage_commentReply.vue')
      //         },
      //         //评论详情
      //         {
      //             path:'comment_Info',
      //             name:'comment_Info',
      //             component:()=>import('../views/backStage_commentInfo.vue')
      //         },
      //     ]
      // },
      {
          path: '/refundQequest',
          name: 'refundQequest',
          component: () => import('../views/refundQequest.vue'),
          children:[
              {
                  path:"",
                  name:'refundQequest',
                  component:()=>import('../views/refundQuestDetail.vue'),
                  meta:{
                      auth:true
                  }
              },
              {
                  path:"refundWaitting",
                  name:'refundWaitting',
                  component:()=>import('../views/refundWaitting.vue'),
                  meta:{
                      auth:true
                  }
              },
          ]
      },
      {
          path: '/shopCart',
          name: 'shopCart',
          component: ()=>import('../views/shoppingCart.vue'),
          meta:{
              auth:true
          }
      },{
          path: '/order',
          name: 'order',
          component: ()=>import('../views/order.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/pay',
          name:'pay',
          component:()=>import('../views/pay.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/paySuccess',
          name:'paySuccess',
          component:()=>import('../views/paySuccess.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/manage',
          name:'manage',
          component:()=>import('../views/manage.vue'),
          children:[
              {
                  path:'',
                  name:'backStage_Itemhome',
                  component:()=>import('../views/backStage_Itemhome.vue'),
                  meta: {
                      auth: true
                  }
              },
              {
                  path:'goodsList',
                  name:'goodsList',
                  component:()=>import('../components/manage/goodsList.vue')
              } ,
              {
                  path:'editGoods',
                  name:'editGoods',
                  component:()=>import('../components/manage/editGoods.vue')
              } ,
              {
                  path:'HOrder',
                  name:'h-Order',
                  component: () => import('../views/h-Order.vue')
              },
              {
                  path:'/dia',
                  name:'dia',
                  component: () => import('../views/dia.vue')
              },
              {
                  path:'/dia2',
                  name:'dia2',
                  component: () => import('../views/dia2.vue')
              },
              {
                  path:'/dia3',
                  name:'dia3',
                  component: () => import('../views/dia3.vue')
              },

              //评价管理
              {
                  path:'backStage_Itemevaluate',
                  name:'backStage_Itemevaluate',
                  component:()=>import('../views/backStage_Itemevaluate.vue')
              },
              //评论回复
              {
                  path:'comment_reply',
                  name:'comment_reply',
                  component:()=>import('../views/backStage_commentReply.vue')
              },
              //评论详情
              {
                  path:'comment_Info',
                  name:'comment_Info',
                  component:()=>import('../views/backStage_commentInfo.vue')
              },
              {
                  path:'changePwd',
                  name:'changePwd',
                  component:()=>import('../components/manage/changePwd.vue'),
                  meta: {
                      auth: true
                  }
              },
          ]
      },
      ...router_s,
      ...router_z,
      ...router_x,
      ...router_d,
      ...router_l
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ]
})
// 全局路由钩子，在任意一个路由之前执行的一个函数
router.beforeEach((to, from, next) => {
    // console.log('即将要跳转的路由：', to)
    // console.log('即将离开的路由：', from)
    let userinfo = localStorage.getItem('userinfo');

    if (to.meta.auth) { // 需要权限的
        if (userinfo) {
            next()
        } else {
            next('/lg') // 无权限回到登陆页
        }
    } else {
        next()
    }
});

export default router
