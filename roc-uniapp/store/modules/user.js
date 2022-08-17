import {
  login,
  logout
} from '@/api/login.js'
import {
  tokenKey
} from '@/common/config.js'

const state = {
  token: uni.$u.getStorage(tokenKey)
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    uni.$u.setStorage(tokenKey, token)
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
        commit('SET_TOKEN', res.token)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  LogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        uni.$u.clearStorage()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  state,
  mutations,
  actions
}
