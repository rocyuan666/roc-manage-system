/**
 * 全局计算属性抽取
 */
const getters = {
  token: state => state.user.token,
}
export default getters
