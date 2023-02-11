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
}

export default api

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
