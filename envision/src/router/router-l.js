
export default [
    {
        path: '/help',
        name: 'help',
        component: () => import('../components/help.vue')
    },
    {
        path: '/findway',
        name: 'findway',
        component: () => import('../components/findway.vue')
    },
    {
        path: '/confirm',
        name: 'confirm',
        component: () => import('../components/confirm.vue')
    }
    ,
    {
        path: '/resetpw',
        name: 'resetpw',
        component: () => import('../components/resetpw.vue')
    }
    ,
    {
        path: '/setsuccess',
        name: 'setsuccess',
        component: () => import('../components/setsuccess.vue')
    }
    ,
    {
        path: '/chanel',
        name: 'chanel',
        component: () => import('../views/chanel.vue')
    }
    ,
    {
        path: '/armani',
        name: 'armani',
        component: () => import('../views/armani.vue')
    }
]