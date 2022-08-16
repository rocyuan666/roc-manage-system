import request from '@/common/request.js'

// 登录方法
export const login = (params) => request.post('/login', params)

// 注册方法
export const register = (params) => request.post('/register', params)

// 获取用户详细信息
export const getInfo = (params) => request.get('/getInfo', params)

// 退出方法
export const logout = (params) => request.post('/logout', params)

// 获取验证码
export const getCodeImg = (params) => request.get('/captchaImage', params)
