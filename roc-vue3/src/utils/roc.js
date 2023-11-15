import { isRef } from 'vue'
import BigNumber from 'bignumber.js'

/**
 * 通用js方法封装处理
 */

/**
 * 日期格式化
 * @param {Object | String | Number} time
 * @param {String} pattern
 * @returns {String}
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 表单重置
 * @param {import("vue").Ref<String>} refName
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 * 添加日期范围
 * @param {Object} params
 * @param {Array} dateRange
 * @param {String} propName
 * @returns {Object}
 */
export function addDateRange(params, dateRange, propName) {
  let search = params
  search.params =
    typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params)
      ? search.params
      : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}

/**
 * 回显数据字典
 * @param {Object<T>} datas
 * @param {String} value
 * @returns {String}
 */
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}

/**
 * 回显数据字典（字符串数组）
 * @param {Object} datas
 * @param {String} value
 * @param {String} separator
 * @returns {String}
 */
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false
    Object.keys(datas).some((key) => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

/**
 * 字符串格式化(%s )
 * @param {String} str
 * @returns
 */
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

/**
 * 转换字符串，undefined,null等转化为""
 * @param {String} str
 * @returns {String}
 */
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

/**
 * 数据合并
 * @param {Object} source
 * @param {Object} target
 * @returns {Object}
 */
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

/**
 * 返回项目路径
 * @param {String} p
 * @returns {String}
 */
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

/**
 * 验证是否为blob格式
 * @param {Object} data
 * @returns {Boolean}
 */
export async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

/**
 * 经过打包处理的文件路径获取，支持"@/"别名 与 assets/...直接写的方式
 * @param {String} filePath - 相对于src的文件路径
 * @returns {String} - 完整的路径
 */
export function rocRequire(filePath) {
  let url = ''
  if (filePath.indexOf('@/') !== -1) {
    const newFilePath = filePath.replace('@/', '')
    url = new URL(`../${newFilePath}`, import.meta.url)
  } else {
    url = new URL(`../${filePath}`, import.meta.url)
  }
  return url.href
}

/**
 * 字典数据转换为对象形式
 * @param {Array[{}]} labelValue
 * @returns {Object}
 */
export function labelValueToKeyValue(labelValue) {
  let newLabelValue = []
  if (isRef(labelValue)) {
    newLabelValue = labelValue.value
  } else {
    newLabelValue = labelValue
  }
  const obj = {}
  if (Array.isArray(newLabelValue)) {
    newLabelValue.map((item) => {
      obj[item.value] = item.label
    })
  }
  return obj
}

/**
 * 字符串分割数组
 * 支持指定分隔符
 * 支持指定数组中值的类型
 * @param {String} str
 * @param {String} dot
 * @param {"String" | "Number" | "Boolean"} type
 * @returns {String[] | Number[] | Boolean[]}
 */
export function string2Array(str, dot = ',', type = 'String') {
  let arr
  if (str.trim()) {
    arr = str.split(dot)
  } else {
    arr = []
  }
  return arr.map((value) => {
    switch (type) {
      case 'String':
        return String(value)
      case 'Number':
        return Number(value)
      case 'Boolean':
        return Boolean(value)
      default:
        return value
    }
  })
}

/**
 * 两数运算 指定保留小数
 * 默认 相乘 保留3位小数
 * @param {Number | String} num1
 * @param {Number | String} num2
 * @param {Object} options
 * @param {Number | String} options.decimal
 * @param {"plus" | "minus" | "times" | "div"} options.type
 * @returns {Number}
 */
export function calc(num1, num2, options = { decimal: 3, type: 'times' }) {
  let _num1 = Number(num1)
  let _num2 = Number(num2)
  let _decimal = Number(options.decimal)
  const _type = options.type

  if (isNaN(_num1)) _num1 = 0
  if (isNaN(_num2)) _num2 = 0
  if (isNaN(_decimal)) _decimal = 0

  const num1BigNumber = new BigNumber(_num1)

  if (_type === 'plus') {
    return Number(num1BigNumber.plus(_num2).toFixed(_decimal))
  } else if (_type === 'minus') {
    return Number(num1BigNumber.minus(_num2).toFixed(_decimal))
  } else if (_type === 'times') {
    return Number(num1BigNumber.times(_num2).toFixed(_decimal))
  } else if (_type === 'div') {
    return Number(num1BigNumber.div(_num2).toFixed(_decimal))
  } else {
    return 0
  }
}

/**
 * 下载文件
 * @param {String} url - 地址
 * @param {String} fileName - 文件名
 * @param {String} type - 类型 默认pdf
 */
export function downloadFile(url, fileName, type = 'pdf') {
  let xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.setRequestHeader('Content-Type', `application/${type}`)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = this.response
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(blobUrl)
    }
  }
  xhr.send()
}
