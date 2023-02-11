import request from '@/utils/request'



const userApi = {
  Login: '/sys/login',
  Logout: '/api/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  // UserInfo: '/user/info',
  UserInfo: '/sys/user/getUserInfo',
  UserMenu: '/user/nav',

  getCodeImg:'/sys/verification', //获取图片验证码




}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "dataType": "json",
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // transformRequest: [
    //   function(data) {
    //     var ret = ''
    //     for (var it in data) {
    //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //     }
    //     ret = ret.substring(0, ret.lastIndexOf('&'))
    //     return ret
    //   }
    // ]
  })
}

export function getCodeImg (parameter) {
  return request({
    url: userApi.getCodeImg,
    method: 'get',
    params: parameter,
    responseType: 'arraybuffer'
  })
}


export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

// 获取账户信息 (改)
export function getInfo (parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// export function getInfo (parameter) {
//   return request({
//     url: userApi.UserInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

// 退出
export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
// export function get2step (parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
