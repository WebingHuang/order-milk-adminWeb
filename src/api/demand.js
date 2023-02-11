//2020-10-29
import request from '@/utils/request'

const api = {



  getDemandByAdopt:'/demand/getDemandByAdopt',//公司需求审批
  updateAdoptCompanu:'/demand/updateAdopt',//修改审批状态
  demandTypeCompanuy: '/demand/listDemandType',
  demandInfoByBatchId:"/demand/demandInfoByBatchId" //根据批次号查询需求类型

}
export default api
export function getDemandByAdopt (query) {
    return request({
      url: api.getDemandByAdopt,
      method: 'post',
      params: query
    })
}

export function updateAdoptCompanu (query) {
  return request({
    url: api.updateAdoptCompanu,
    method: 'post',
    params: query
  })
}

export function demandTypeCompanuy (query) {
  return request({
    url: api.demandTypeCompanuy,
    method: 'get',
    params: query
  })
}

export function demandInfoByBatchId (query) {
  return request({
    url: api.demandInfoByBatchId,
    method: 'post',
    params: query
  })
}

