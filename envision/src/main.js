import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueAreaLinkage from 'vue-area-linkage';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-area-linkage/dist/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/base.css'


// ajax 请求库
import axios from 'axios'
Vue.use(ElementUI);
Vue.use(SlideVerify);
Vue.prototype.$http = axios;
import qs from 'qs';
Vue.prototype.$qs = qs;
// 统一设置请求的前缀
// axios.defaults.baseURL = 'http://114.116.39.38:8080'
// axios.defaults.baseURL = 'http://39.106.186.239:8080'
// axios.defaults.baseURL = 'http://172.16.7.91:8080'
axios.defaults.baseURL ='/'
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.use(VueAreaLinkage);





Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueAreaLinkage,
  render: h => h(App)
}).$mount('#app')
