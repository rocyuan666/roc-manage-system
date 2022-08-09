/* 
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan@luojing.top、rocyuan666@163.com
 * @微信：rocyuan666
 * @个人网站：https://luojing.top
 */
import {
  devBaseUrl,
  proBaseUrl
} from "@/common/config.js";
import http from "@/utils/request/index.js"

const install = (Vue, vm) => {
  http.setConfig({
    baseUrl: process.env.NODE_ENV == "development" ? devBaseUrl : proBaseUrl,
    // 是否在拦截器中返回服务端的原始数据 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data 设置为true后，就需要在this.$roc.http.interceptor.response进行多一次的判断，请打印查看具体值
    // originalData: false,
    // 设置为json，返回后会对数据进行一次JSON.parse()
    // dataType: 'json',
    // 是否显示请求中的loading
    // showLoading: true,
    // 请求loading中的文字提示
    // loadingText: '请求中...',
    // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms，默认800
    // loadingTime: 800,
    // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // loadingMask: true,
    // 设置自定义头部content-type
    // header: {
    // 	'content-type': 'xxx'
    // }
  });
  // 请求拦截，配置Token等参数
  http.interceptor.request = (config) => {
    // config.header.Token = 'xxxxxx';

    // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
    // config.header.token = vm.token;

    // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
    // config.header.token = vm.$store.state.token;

    // 方式三，如果token放在了globalData，通过getApp().globalData获取
    // config.header.token = getApp().globalData.username;

    // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
    // const token = uni.getStorageSync('token');
    // config.header.token = token;

    return config;
  }
  // 响应拦截，判断状态码是否通过
  http.interceptor.response = (res) => {
    // 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
    // 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
    if (res.code == 200) {
      // 如果把originalData设置为了true，这里return回什么，this.$roc.post的then回调中就会得到什么
      return res;
    } else {
      uni.showToast({
        icon: "none",
        title: res.msg
      })
      return false;
    }
  }
}

export default {
  install
}
