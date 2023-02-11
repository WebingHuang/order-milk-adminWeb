import request from '@/utils/request'




const api = {
  getArticleByBatchId: '/article/getArticleByBatchId',  // 根据批次号查询文章详情
  addArticle: '/article/addArticle', // 添加文章
  articleList: '/article/articleFindPage', //查询文章列表
  deleteArticleList: '/article/deleteArticle', //删除文章
  uploadFiles: '/gallery/upload', //上传图片
  getArticleType: '/article/getArticleType', //查询文章类型
  updateAdopt: '/article/updateAdopt',  //修改文章状态
  updateInfo: '/article/updateInfo',  //修改文章



  removeCommodity:'/sys/commodity/deleteCommodity',

  addCommodity: "/sys/commodity/SaveOrUpdateCommodities", //添加商品

  getCommodityListPage: "/sys/commodity/findByCommodities", //查询商品列表

  openCommodity: "/sys/commodity/EnableCommodity",  //商品上架

  offCommodity: "/sys/commodity/CloseCommodity",  //商品下架


  addCommodityType: "/productSpuType/addSpuType", //添加商品类别


  updataCommodityType: "/productSpuType/updateSpuType", // 修改商品类别

  getCommodityTypeListPage: "/productSpuType/queryList", // 查询商品类别分页


  putTypeStatus: "/productSpuType/updateStatus",  //停启用接口

  removeType: "/productSpuType/removeById", //删除商品类别接口


  getTypeList: "/productSpuType/queryTypeList", //查询类别数组

  getCommodityInfoById: "/sys/commodity/findOneById", // 根据id查询详情


  updateHomeEnable: "/sys/commodity/updateHomeEnable", //启用首页展示


  updateHomeClose:"/sys/commodity/updateHomeClose",  //停用首页展示






}

export default api


export function editIsIndex (state,parameter) {
  return request({
    url: state? api.updateHomeEnable : api.updateHomeClose,
    method: 'get',
    params: parameter
  })
}





export function getCommodityInfoById (parameter) {
  return request({
    url: api.getCommodityInfoById,
    method: 'get',
    params: parameter
  })
}



export function getTypeList (parameter) {
  return request({
    url: api.getTypeList,
    method: 'get',
    params: parameter
  })
}


export function removeType (parameter) {
  return request({
    url: api.removeType,
    method: 'get',
    params: parameter
  })
}



export function putTypeStatus (parameter) {
  return request({
    url: api.putTypeStatus,
    method: 'get',
    params: parameter
  })
}




export function getCommodityTypeListPage (parameter,query) {
  return request({
    url: api.getCommodityTypeListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function editCommodityType (state,parameter) {
  return request({
    url: !state ? api.addCommodityType : api.updataCommodityType,
    method: 'post',
    data: parameter
  })
}



export function deleteCommodity (parameter) {
  return request({
    url: api.removeCommodity,
    method: 'post',
    params: parameter
  })
}

export function unloading (state,parameter) {
  return request({
    url: state ?  api.openCommodity : api.offCommodity,
    method: 'post',
    params: parameter
  })
}



export function getCommodityListPage (parameter,query) {
  return request({
    url: api.getCommodityListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}

export function addCommodity (query) {
  return request({
    url: api.addCommodity,
    method: 'post',
    data: query
  })
}

export function deleteArticleList (query) {
  return request({
    url: api.deleteArticleList,
    method: 'post',
    params: query
  })
}

export function uploadFiles (body) {
  return request({
    url: api.uploadFiles,
    method: 'post',
    params: {},
    data: body
  })
}

/**
 *
 * @param {*} state  状态，0：新增， 1：修改
 * @param {*} query
 */
export function editArticle (state,query,parameter) {
  return request({
    url: (state == 0 )?  api.addArticle : api.updateInfo,
    method: 'post',
    params: parameter,
    data: query
  })
}


export function getArticleList (parameter,query) {
  return request({
    url: api.articleList,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}


export function getArticleType(parameter) {
  return request({
    url: api.getArticleType,
    method: 'get',
    params: parameter
  })
}

export function getArticleByBatchId (query) {
  return request({
    url:api.getArticleByBatchId,
    method: 'post',
    params: query
  })
}

export function updateArticleAdopt (query) {
  return request({
    url: api.updateAdopt,
    method: 'post',
    params: query
  })
}
