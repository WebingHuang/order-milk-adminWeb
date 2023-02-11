//2020-10-29
import request from '@/utils/request'




const api = {
  addCompany:'/company/addCompany',  //添加公司
  companyFindPage: '/company/companyFindPage', //分页查询
  getCompanyListByUserId: '/company/getCompanyListByUserId', //分页查询
  upDateCompany:'/company/updateCompany', //修改
  deleteCompany:'/company/deleteCompany',  //删除
  filesCompany:'/gallery/upload',//上传文件
  stateCompany:'/company/updateAdopt',//审批公司
  typeCompany: '/company/getCompanyType',//公司类型


  getCompanyIntroductionListPage: "/sys/CompanyIntroduction/findByCompanyIntroduction",//查询公司介绍分页


  editCompanyIntroduction:"/sys/CompanyIntroduction/SaveOrUpdateCompanyIntroduction", //编辑公司介绍接口



  getCompanyIntroductionInfoById: "/sys/CompanyIntroduction/findOneById", //根据id查询公司介绍详情







}

export default api


export function editCompanyIntroduction (query) {
  return request({
    url: api.editCompanyIntroduction,
    method: 'post',
    data: query
  })
}




export function getCompanyIntroductionInfoById (query) {
  return request({
    url: api.getCompanyIntroductionInfoById,
    method: 'get',
    params: query
  })
}



export function getCompanyIntroductionListPage (parameter,query) {
  return request({
    url: api.getCompanyIntroductionListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function getCompanyList (parameter,query) {
  return request({
    url: api.companyFindPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function getCompanyListByUserId (parameter,query) {
  return request({
    url: api.getCompanyListByUserId,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function addCompany (query) {
  return request({
    url: api.addCompany,
    method: 'post',
    params: query
  })
}

export function editUser (state,query) {
  return request({
    url: (state == false ) ?  api.addCompany : api.upDateCompany,
    method: 'post',
    params: query,
  })
}

export function deleteCompany (query) {
  return request({
    url: api.deleteCompany,
    method: 'post',
    params: query
  })
}

export function filesCompany (body) {
  return request({
    url: api.filesCompany,
    method: 'post',
    params: {},
    data:body
  })
}

export function stateCompany (query) {
  return request({
    url: api.stateCompany,
    method: 'post',
    params: query
  })
}


export function typeCompany (query) {
  return request({
    url: api.typeCompany,
    method: 'get',
    params: query
  })
}


