import request from '@/common/request.js'

// 获取路由
export const getRouters = (params) => request.get('/getRouters', params)
