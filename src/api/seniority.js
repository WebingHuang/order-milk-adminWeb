import request from '@/utils/request'




const api = {
  getBusinessList: '/system/getBusinessList',
  getMechanismList: '/system/getMechanismList',
  getShopvoucherList: '/system/getShopvoucherList',
  getBusinessById: "/system/getBusinessById",
  businessAdopt: "/system/businessAdopt", //审批接口
  getMechanismById: "/system/getMechanismById",
  mechanismAdopt: "/system/mechanismAdopt",
  getShopvoucherById: "/system/getShopvoucherById",
  shopvoucherAdopt: "/system/shopvoucherAdopt",


  getPersonalList: "/system/getPersonalList",
  getEnterpriseList: "/system/getEnterpriseList",
  getInfoById: "/system/getInfoById",
  infoAdopt: "/system/userInfoAdopt",

}

export default api

export function getBusinessList(parameter, query) {
  return request({
    url: api.getBusinessList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function getMechanismList(parameter, query) {
  return request({
    url: api.getMechanismList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function getShopvoucherList(parameter, query) {
  return request({
    url: api.getShopvoucherList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function getBusinessById(query) {
  return request({
    url: api.getBusinessById,
    method: 'get',
    params: query,
  })
}

export function businessAdopt(query) {
  return request({
    url: api.businessAdopt,
    method: 'put',
    params: query,
  })
}

export function getMechanismById(query) {
  return request({
    url: api.getMechanismById,
    method: 'get',
    params: query,
  })
}

export function mechanismAdopt(query) {
  return request({
    url: api.mechanismAdopt,
    method: 'put',
    params: query,
  })
}

export function getShopvoucherById(query) {
  return request({
    url: api.getShopvoucherById,
    method: 'get',
    params: query,
  })
}

export function shopvoucherAdopt(query) {
  return request({
    url: api.shopvoucherAdopt,
    method: 'put',
    params: query,
  })
}

export function getPersonalList(parameter, query) {
  return request({
    url: api.getPersonalList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function getEnterpriseList(parameter, query) {
  return request({
    url: api.getEnterpriseList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function getInfoById(query) {
  return request({
    url: api.getInfoById,
    method: 'get',
    params: query,
  })
}


export function infoAdopt(query) {
  return request({
    url: api.infoAdopt,
    method: 'put',
    params: query,
  })
}



