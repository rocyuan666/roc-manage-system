/**
 * 格式化get请求url参数，将对象解析为字符串
 * @param {*} url
 * @param {*} params
 * @returns
 */
function urlFormater(url, params) {
  if (params) {
    let paramList = []
    for (let key in params) {
      paramList.push(key + '=' + params[key])
    }
    return url.indexOf('?') > -1 ? (url + '&' + paramList.join('&')) : (url + '?' + paramList.join('&'))
  }
  return url
}

const request = {
  // post提交
  post(url, params, header = {}) {
    return uni.$roc.http.post(url, params, header)
  },
  // get提交
  get(url, params, header = {}) {
    let path = urlFormater(url, params)
    return uni.$roc.http.get(path, header)
  },

  // put提交
  put(url, params, header = {}) {
    return uni.$roc.http.put(url, params, header)
  },

  // delete提交
  delete(url, params, header = {}) {
    return uni.$roc.http.delete(url, params, header)
  },

}

export default request
