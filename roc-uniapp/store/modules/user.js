import {
  login
} from '@/api/login.js'

const state = {
  token: ''
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  Login: ({
    commit
  }, userInfo) => {
    return new Promise((resolve, reject) => {
      const sendObj = {
        username: userInfo.username.trim(),
        password: userInfo.password,
        code: userInfo.code,
        uuid: userInfo.uuid,
      }
      login(sendObj).then((res) => {
        console.log(res, 'login后信息，设置token信息')
        commit('SET_TOKEN', res.token)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
