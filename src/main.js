import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import axios from 'axios'
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$axios = axios
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
