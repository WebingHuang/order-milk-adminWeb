import request from '@/utils/request'


const api = {
  getShopListByUserId: '/shop/getShopListByUserId',  // 查询当前用户创建的店铺
  addShop: '/shop/addShop',  // 新增店铺
  updateShop: '/shop/updateShop',  // 修改店铺
  deleteShop: '/shop/deleteShop',  // 删除店铺
  getShopListPageByAdopt: '/shop/getShopListPageByAdopt',  // 审批查询店铺
  updateShopAdopt: '/shop/updateShopAdopt',  // 审核店铺
}

export default api

export function updateShopAdopt (query) {
  return request({
    url: api.updateShopAdopt,
    method: 'post',
    params: query,
  })
}

export function getShopListPageByAdopt (body,query) {
  return request({
    url: api.getShopListPageByAdopt,
    method: 'post',
    params: query,
    data:body
  })
}

export function addShop (query) {
   return request({
     url: api.addShop,
     method: 'post',
     params: query,
   })
 }

export function deleteShop (query) {
   return request({
     url: api.deleteShop,
     method: 'post',
     params: query,
   })
 }

export function editShop (state,query) {
   return request({
     url: (state == 0 )?  api.addShop : api.updateShop,
     method: 'post',
     params: query,
   })
 }

export function getShopListByUserId (parameter,query) {
  return request({
    url: api.getShopListByUserId,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}


