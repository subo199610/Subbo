// import Vue from 'vue'
// import Router from 'vue-router'
// import point from '../views/point'
//
// Vue.use(Router);

// export default new Router({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [
//         {
//             path: '/point',
//             name: 'point',
//             component:point
//         }
//     ]
// })

export default [
    {
        path:'/point',
        name:'point',
        component: () => import('../views/point.vue')
    },
    {
        path:'/givenchy',
        name:'givenchy',
        component:() =>import('../views/givenchy.vue')
    }

];
