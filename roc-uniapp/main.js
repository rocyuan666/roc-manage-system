// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store'

// 剥离uView中js工具
import rocUniappUtils from '@/roc-uniapp-utils'
Vue.use(rocUniappUtils)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
// #endif

/* ======================================================== */

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
