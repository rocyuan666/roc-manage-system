import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// 不希望有命名空间的vuex模块
const namespacedFalseList = ['permission', 'user']

const modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((url) => {
  const key = url.replace(/(modules\.|\/|\.|js)/g, '')
  modules[key] = {
    ...files(url).default,
    namespaced: !namespacedFalseList.includes(key),
  }
})

const store = new Vuex.Store({
  modules,
  getters,
})

export default store
