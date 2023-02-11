import request from '@/utils/request'



const api = {



  queryAgentOrOrder:"/statistics/queryAgentOrOrder", //代理商统计接口


  queryUserOrOrder: "/statistics/queryUserOrOrder", //统计用户数量和订单信息


  queryAgentPerformance:"/agentUp/queryAgentPerformance"


}

export default api

export function queryAgentOrOrder () {
  return request({
    url: api.queryAgentOrOrder,
    method: 'get'
  })
}


export function queryAgentPerformance () {
  return request({
    url: api.queryAgentPerformance,
    method: 'get'
  })
}


export function queryUserOrOrder () {
  return request({
    url: api.queryUserOrOrder,
    method: 'get'
  })
}



