import request from '@/utils/request'




const api = {
   getUserBaseInfo: '/users/getUserInfo',  // 获取当前用户信息
   updateUserInfo: '/users/updateUserInfo', // 修改当前用户信息
   getRole: '/system/getRole', // 修改当前用户信息
}

export default api

export function getRole (query) {
  return request({
    url: api.getRole,
    method: 'get',
    params: query
  })
}

export function updateUserInfo (query) {
  return request({
    url: api.updateUserInfo,
    method: 'post',
    params: query
  })
}

export function getUserBaseInfo (query) {
  return request({
    url: api.getUserBaseInfo,
    method: 'post',
    params: query
  })
}


