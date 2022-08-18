/**
 * 全局计算属性抽取
 */
const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
}
export default getters
