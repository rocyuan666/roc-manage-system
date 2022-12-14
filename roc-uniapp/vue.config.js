// 代理的devBaseUrl
const {
  devBaseUrl
} = require('./common/config.js')

module.exports = {
  devServer: {
    // 前端配置代理访问后端的示例 http://roc.luojing.top:3001 请更换为自己的接口地址
    // devBaseUrl必须为/xxx，不是后端服务器，请先了解代理逻辑，再设置前端代理
    // 这里配置了跨域及代理只针对开发环境生效
    proxy: {
      [devBaseUrl]: {
        target: `http://rms.luojing.top:18080`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + devBaseUrl]: '',
        },
      },
    }
  },
}
