/* 
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan@luojing.top、rocyuan666@163.com
 * @微信：rocyuan666
 * @个人网站：https://luojing.top
 */
import http from "@/utils/request/index.js"
const install = (Vue, vm) => {
  // 可增api接口
  vm.$api.getBannerData = async (params = {}) => await http.get('/banner', params);
}

export default {
  install
}
