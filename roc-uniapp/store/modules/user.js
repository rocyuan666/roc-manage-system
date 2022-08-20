import {
  login,
  logout
} from '@/api/login.js'
import {
  getUserProfile
} from '@/api/system/user.js'
import {
  tokenKey
} from '@/common/config.js'

const state = {
  token: uni.$u.getStorage(tokenKey),
  user: uni.$u.getStorage('user'),
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    uni.$u.setStorage(tokenKey, token)
  },
  SET_USER: (state, user) => {
    state.user = user
    uni.$u.setStorage('user', user)
  }
}
const actions = {
  UserProfile: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      getUserProfile().then((res) => {
        commit('SET_USER', res.data)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
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
        commit('SET_USER', '')
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
