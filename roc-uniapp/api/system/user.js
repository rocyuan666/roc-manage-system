import request from '@/common/request.js'

// 查询用户个人信息
export const getUserProfile = (params) => request.get('/system/user/profile', params)
