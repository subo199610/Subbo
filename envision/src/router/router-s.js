
import Account from '../views/Account.vue'
import userInfo from '../views/UserInfo.vue'
import personalInfo from '../views/PersonalInfo.vue'
import accountSafe from '../views/AccountSafe.vue'
import myOrders from '../views/MyOrders.vue'
import allOrders from '../views/allOrders.vue'
import orders1 from '../views/orders1.vue'
import orders2 from '../views/orders2.vue'
import orders3 from '../views/orders3.vue'
import orders4 from '../views/orders4.vue'
import orders5 from '../views/orders5.vue'
import orders6 from '../views/orders6.vue'
import refund from '../views/Refund.vue'
import allRefund from '../views/allRefund.vue'
import refund1 from '../views/refund1.vue'
import refund2 from '../views/refund2.vue'
import myAddress from '../views/myAddress.vue'
import myCous from '../views/myCous.vue'
import refundBack from '../views/refundBack.vue'
import foot from '../views/foot.vue'
import fav from '../views/fav.vue'

export default [
    {
        path: '/account',
        name: 'account',
        component: Account,
        children:[
            {
                path:'',
                name:'userInfo',
                component: userInfo,
                meta:{
                    auth:true
                }
            },
            {
                path:'/personalInfo',
                name:'personalInfo',
                component: personalInfo,
                meta:{
                    auth:true
                }
            },
            {
                path:'/accountSafe',
                name:'accountSafe',
                component:accountSafe,
                meta:{
                    auth:true
                }
            },
            {
                path:'/myOrders',
                name:'myOrders',
                component:myOrders,
                children:[
                    {
                        path:'',
                        name:'allOrders',
                        component: allOrders,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders1',
                        name:'orders1',
                        component: orders1,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders2',
                        name:'orders2',
                        component: orders2,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders3',
                        name:'orders3',
                        component: orders3,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders4',
                        name:'orders4',
                        component: orders4,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders5',
                        name:'orders5',
                        component: orders5,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/myOrders/orders6',
                        name:'orders6',
                        component: orders6,
                        meta:{
                            auth:true
                        }
                    },
                ]
            },
            {
                path:'/refund',
                name:'refund',
                component:refund,
                children:[
                    {
                        path:'',
                        name:'allRefund',
                        component: allRefund,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/refund/refund1',
                        name:'refund1',
                        component: refund1,
                        meta:{
                            auth:true
                        }
                    },
                    {
                        path:'/refund/refund2',
                        name:'refund2',
                        component: refund2,
                        meta:{
                            auth:true
                        }
                    }
                ]
            },
            {
                path:'/foot',
                name:'foot',
                component:foot,
                meta:{
                    auth:true
                }
            },
            {
                path:'/myAddress',
                name:'myAddress',
                component:myAddress,
                meta:{
                    auth:true
                }
            },
            {
                path:'/myCous',
                name:'myCous',
                component:myCous,
                meta:{
                    auth:true
                }
            },
            {
                path:'/fav',
                name:'fav',
                component:fav,
                meta:{
                    auth:true
                }
            }
        ]
    }
]