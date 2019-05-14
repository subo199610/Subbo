import Dior from '../views/Dior.vue'
import searchPage from '../views/searchPage.vue'
import loginReg from '../views/staticLoginReg.vue'
import singlepro from '../views/singlepro.vue'

export default [
    {
        path: '/dior',
        name: 'dior',
        component: Dior
    },
    {
        path: '/search',
        name: 'search',
        component: searchPage
    },
    {
        path: '/loginReg',
        name: 'loginReg',
        component: loginReg
    },
    {
        path: '/howBuy',
        name: 'howBuy',
        component: singlepro
    }
]
