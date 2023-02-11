import request from '@/utils/request'




const api = {
  usersFindPage: '/system/usersFindPage',  // 用户管理 table列表
  getUserListByCompanyId: '/company/getUserListByCompanyId',  // 用户管理 table列表

  upDateUser: '/sys/user/updateUser',   // 修改用户
  // addUser: '/system/addUser', // 添加用户
  deleteUser: '/system/deleteUser', // 删除用户

  roleFindPage: '/system/roleFindPage',  // 角色管理 table列表


  updateRoleInfo: '/sys/role/updateRole',  // 修改角色


  addRole: '/sys/role/save',  // 添加角色

  deleteRole: '/sys/role/removeRole', // 删除角色

  routesFindPage: '/sys/route/queryRouteList',  // 路由管理 table列表
  updateRouteInfo: '/sys/route/updateRoute',  // 修改菜单

  addRoute: '/sys/route/addRoute',  // 添加菜单

  deleteRoute: '/sys/route/removeRoute',  // 删除路由

  removePower:"/sys/power/removePower",


  powersFindPage: '/sys/power/queryPowerList',  // 权限管理 table列表


  updatePowerInfo: '/sys/power/updatePower',  // 修改权限

  addPower: '/sys/power/addPower',  // 添加权限

  deletePower: '/system/deletePower',  // 删除权限


  getRole: '/system/getRole', // 查询角色列表
  getRoute: '/sys/route/queryRouteTree', // 查询菜单列表

  getPower: '/sys/power/queryPowerTree', // 查询权限树

  companyFindPage: '/company/companyFindPage', //公司管理分页查询


  getShopListPage: '/sys/store/queryStore', //店铺管理分页查询


  getUserListPage: "/sys/user/queryUserList", //用户列表分页查询

  addUser:"/sys/user/save",  //添加用户

  getSysRoleListPage: '/sys/role/queryRoleList', //查询角色列表、

  upload: '/UploadPictures/upload',  // 上传用户头像

  getRoleTypeList: "/sys/role/queryRoleNameList",//查询角色列表

  removeUser: "/sys/user/removeUser",

  getCardListPage: '/shop/findByCards', //查询提货卡列表

  getfindByCardList:"/shop/findByCardList",





  addCard: "/shop/GenerateCard",//生成提货卡


  getSwperListPage: '/sys/staticInfo/queryList', //查询轮播图静态资源

  addSwiper: "/sys/staticInfo/uploadStaticInfo",


  updateStatus: "/sys/staticInfo/updateStatus", //启用停用

  editSwiper: "/sys/staticInfo/updateStaticInfo", //修改轮播图信息


  delSwiper: "/sys/staticInfo/removeImg", //删除轮播图

  addShop: "/sys/staticInfo/",//添加店铺


  editMenuStatus: "/sys/route/updateStatus", // 修改菜单状态



  getUserArray:"/sys/user/getUserNameOnPhone", //查询用户手机号，名称，usercode



  getBatchNoList :"/shop/queryBn", //查询所有会员卡批次号



  getFindByOrderListPage: "/common/OmsOrder/findByOrderByStatus",//查询订单分页



  updateOrderStatus: "/common/OmsOrder/updateStatus", //修改订单状态


  updateOrderSettlement: "common/OmsOrder/updateOrderSettlement", //修改结算状态

  getNoticeListPage: "/sys/announcement/findByAnnouncements",  // 查询公告分页


  getNoticeInfoById: "/sys/announcement/findOneById",//根据id查询公告详情

  editNotice: "/sys/announcement/SaveOrUpdateAnnouncement", // 编辑公告


  getRefundListPage: "/sys/refundInfo/queryRefundList", //查询退款信息分页



  getOrderInfoById: "/common/OmsOrder/queryOrder", //根据批次号查询订单详情

  getByOrderSn:"/common/OmsOrder/queryByOrderSn",//查询订单详情根据订单id查询


  getBankListPage: "/sys/AdministratorReview/findByUserInfos", //查询银行卡分页

  getMoneyListPage: "/sys/AdministratorReview/findByWithdraw", //查询提现信息


  getRateListPage: "/sys/rate/queryList", //分页查询配置提现信息


  addRate:"/sys/rate/addRate", //新增提现配置

  updateRate: "/sys/rate/updateRate",  //修改提现配置

  editRateStatus: "/sys/rate/updateStatus", //修改停启用状态

  removeEateById :"/sys/rate/removeById", //删除配置信息


  editUserStatus: "/sys/user/updateStatus", //用户停启用


  updateByCode: "/shop/updateByCode", // 指派代理商

  updateCrodFlag: "shop/updateFlag", // 修改打印状态


  updateAgent: "/shop/updateAgent", //指派代理商



  checkRefund: "/sys/refundInfo/checkRefund", //审核退款信息


  getCommodityList: "/sys/commodity/queryList",// 查询商品名称和Id

  putWithdrawalAdopt: "/sys/AdministratorReview/WithdrawApproved", //提现通过接口

  putWithdrawalNotAdopt: "/sys/AdministratorReview/WithdrawAuditFailed", //提现不通过接口


  getCardListByUserCOde: "/sys/user/queryInfoByUserCode", //根据用的的code查询使用过的卡 和订单和总消费金额



  getOrderExcel:"/common/OmsOrder/findOrderExcel", //查询所有订单excl
  exportPieSalaryRecordExcel:"/common/OmsOrder/exportPieSalaryRecordExcel", //查询所有订单excl
  querySchoolClassNameByOrder: "/common/OmsOrder/querySchoolClassNameByOrder",

  getQrImg: "/shop/queryShopCardEwm", //查看臻香卡二维码

  putOderState:"/api/wechatpay/wechatpay_callback_shsd",

  getAgentUser: "/agentUp/queryAgentUser", //查询下级用户

  getAgentUserOrder:"/agentUp/queryAgentUserOrder", //查询下级订单

  getSchoolPage: "/sys/querySchoolsAndClass", // 学校查询
  addSchool: "/sys/addSchool", 
  updateSchool: "/sys/updateSchoolName", 
  deteleSchool: "/sys/deteleSchool", 
  addSchoolClass: "/sys/addSchoolClass", 
  deteleSchoolClass: "/sys/deteleSchoolClass", 

  getQueryContactUs: "/sys/queryContactUs", // 客服设置
  addOrUpdateContactUs: "/sys/addOrUpdateContactUs",
  deteleContactUs: "/sys/deteleContactUs",

  getQueryInform: "/sysinform/queryInform", // 通知设置
  addInform: "/sysinform/addInform",
  deteleInform: "/sysinform/deteleInform",
  
  queryDeliveryRecord: "sys/queryDeliveryRecord", // 查询送货记录
  deliveringGoods: "sys/deliveringGoods", // 查询送货记录

}

export default api


export function deliveringGoods(query) {

  return request({
    url: api.deliveringGoods,
    method: 'post',
    data: query
  })
}

export function queryDeliveryRecord(query) {

  return request({
    url: api.queryDeliveryRecord,
    method: 'post',
    data: query
  })
}
export function deteleInform(query) {

  return request({
    url: api.deteleInform,
    method: 'post',
    data: query
  })
}
export function addInform(query) {

  return request({
    url: api.addInform,
    method: 'post',
    data: query
  })
}
export function deteleContactUs(query) {

  return request({
    url: api.deteleContactUs,
    method: 'post',
    data: query
  })
}
export function editContactUs(query) {

  return request({
    url: api.addOrUpdateContactUs,
    method: 'post',
    data: query
  })
}

export function deteleSchool(query) {

  return request({
    url: api.deteleSchool,
    method: 'post',
    data: query
  })
}
export function deteleSchoolClass(query) {

  return request({
    url: api.deteleSchoolClass,
    method: 'post',
    data: query
  })
}

export function addSchoolClass(query) {

  return request({
    url: api.addSchoolClass,
    method: 'post',
    data: query
  })
}
export function editSchool(state, query) {

  return request({
    url: (state == 0 )?  api.addSchool : api.updateSchool,
    method: 'post',
    data: query
  })
}

export function getSchoolPage  (parameter,query) {
  return request({
    url: api.getSchoolPage,
    method: 'post',
    params: query,
    data: {
      schoolName: query.schoolName,
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}
export function getQueryContactUs  (parameter,query) {
  return request({
    url: api.getQueryContactUs,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}
export function getQueryInform  (parameter,query) {
  return request({
    url: api.getQueryInform,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize: parameter.pageSize
    }
  })
}



export function getAgentUserOrder (parameter) {
  return request({
    url: api.getAgentUserOrder,
    method: 'get',
    params: parameter
  })
}

export function getAgentUser (parameter) {
  return request({
    url: api.getAgentUser,
    method: 'get',
    params: parameter
  })
}

export function putOderState (parameter) {
  return request({
    url: api.putOderState,
    method: 'get',
    params: parameter
  })
}


export function getQrImg (parameter) {
  return request({
    url: api.getQrImg,
    method: 'get',
    params: parameter
  })
}

export function querySchoolClassNameByOrder (parameter) {
  return request({
    url: api.querySchoolClassNameByOrder ,
    method: 'post',
    data: parameter
  })
}
export function exportPieSalaryRecordExcel (parameter) {
  return request({
    url: api.exportPieSalaryRecordExcel ,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/vnd.ms-excel',
    // },
    responseType: 'blob',
    data: parameter
  })
}
export function getOrderExcel (parameter) {
  return request({
    url: api.getOrderExcel ,
    method: 'post',
    data: parameter
  })
}

export function getCardListByUserCOde (parameter) {
  return request({
    url: api.getCardListByUserCOde ,
    method: 'get',
    params: parameter
  })
}

export function WithdrawalAdopt (state,parameter) {
  return request({
    url: state? api.putWithdrawalAdopt : api.putWithdrawalNotAdopt,
    method: 'get',
    params: parameter
  })
}



export function getCommodityList (parameter) {
  return request({
    url: api.getCommodityList,
    method: 'get',
    params: parameter
  })
}



export function checkRefund (parameter) {
  return request({
    url: api.checkRefund,
    method: 'get',
    params: parameter
  })
}


export function getByOrderSn (parameter) {
  return request({
    url: api.getByOrderSn,
    method: 'get',
    params: parameter
  })
}

export function updateByCode (parameter) {
  return request({
    url: api.updateByCode,
    method: 'post',
    data: parameter
  })
}


export function updateCrodFlag (parameter) {
  return request({
    url: api.updateCrodFlag,
    method: 'post',
    data: parameter
  })
}


export function editUserStatus (parameter) {
  return request({
    url: api.editUserStatus,
    method: 'post',
    params: parameter
  })
}


export function removeEateById (parameter) {
  return request({
    url: api.removeEateById,
    method: 'get',
    params: parameter
  })
}


export function editRateStatus (parameter) {
  return request({
    url: api.editRateStatus,
    method: 'get',
    params: parameter
  })
}




export function editRate(state, query) {

  return request({
    url: (state == 0 )?  api.addRate : api.updateRate,
    method: 'post',
    data: query
  })
}





export function getRateListPage (parameter,query) {
  return request({
    url: api.getRateListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}




export function getMoneyListPage (parameter,query) {
  return request({
    url: api.getMoneyListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}




export function getBankListPage (parameter,query) {
  return request({
    url: api.getBankListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}




export function getOrderInfoById (query) {
  return request({
    url: api.getOrderInfoById,
    method: 'get',
    params: query
  })
}


export function getRefundListPage (parameter,query) {
  return request({
    url: api.getRefundListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}


export function editNotice (query) {
  return request({
    url: api.editNotice,
    method: 'post',
    data: query
  })
}




export function getNoticeInfoById (query) {
  return request({
    url: api.getNoticeInfoById,
    method: 'get',
    params: query
  })
}



export function getNoticeListPage (parameter,query) {
  return request({
    url: api.getNoticeListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}



export function updateOrderStatus (query) {
  return request({
    url: api.updateOrderStatus,
    method: 'get',
    params: query
  })
}

export function updateOrderSettlement (query) {
  return request({
    url: api.updateOrderSettlement,
    method: 'post',
    data: query
  })
}





export function getFindByOrderListPage (parameter,query) {
  return request({
    url: api.getFindByOrderListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}



export function getBatchNoList () {
  return request({
    url: api.getBatchNoList,
    method: 'get',
  })
}


export function getUserArray (parameter) {
  return request({
    url: api.getUserArray,
    method: 'get',
    params: parameter

  })
}

export function editMenuStatus (parameter) {
  return request({
    url: api.editMenuStatus,
    method: 'post',
    params: parameter
  })
}


export function getfindByCardList (parameter) {
  return request({
    url: api.getfindByCardList,
    method: 'post',
    data:parameter

  })
}






export function delSwiper(query) {

  return request({
    url: api.delSwiper,
    method: 'post',
    params: query
  })
}


export function updateStatus(query) {

  return request({
    url: api.updateStatus,
    method: 'post',
    params: query
  })
}


export function editSwiper(state, query) {

  return request({
    url: (state == 0 )?  api.addSwiper : api.editSwiper,
    method: 'post',
    data: query
  })
}





export function getSwperListPage (parameter,query) {
  return request({
    url: api.getSwperListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}





export function getCardListPage (parameter,query) {
  return request({
    url: api.getCardListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}




export function editCard(state, query) {

  return request({
    url: (state == 0 )?  api.addCard : api.updateAgent,
    method: 'get',
    params: query
  })
}

export function removeUser (query) {
  return request({
    url: api.removeUser,
    method: 'post',
    params: query,
  })
}



export function getRoleTypeList (parameter,query) {
  return request({
    url: api.getRoleTypeList,
    method: 'post',
    data: query,
  })
}




export function getSysRoleListPage (parameter,query) {
  return request({
    url: api.getSysRoleListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}


export function getUserListPage (parameter,query) {
  return request({
    url: api.getUserListPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function getShopListPage (parameter,query) {
  return request({
    url: api.getShopListPage,
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

export function getPower () {
  return request({
    url: api.getPower,
    method: 'post',
  })
}

export function getRoute (query) {
  return request({
    url: api.getRoute,
    method: 'post',
    params: query
  })
}

export function getRole (query) {
  return request({
    url: api.getRole,
    method: 'get',
    params: query
  })
}

export function getDeletePower (query) {
  return request({
    url: api.deletePower,
    method: 'post',
    params: query
  })
}

export function EditPower (state,query) {
  return request({
    url: state ?  api.updatePowerInfo : api.addPower,
    method: 'post',
    data: query
  })
}

export function uploadFiles(body) {
  return request({
    url: api.upload,
    method: 'post',
    params: {},
    data:body
  })
}

export function getDeleteRoute (query) {
  return request({
    url: api.deleteRoute,
    method: 'post',
    params: query
  })
}

export function removePower (query) {
  return request({
    url: api.removePower,
    method: 'post',
    params: query
  })
}




export function editRouter (state,query) {
  return request({
    url: state ?  api.updateRouteInfo : api.addRoute,
    method: 'post',
    data: query,
  })
}

export function getRouterList (parameter,query) {
  return request({
    url: api.routesFindPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function DeleteRole (query) {
  return request({
    url: api.deleteRole,
    method: 'post',
    params: query
  })
}

export function editRoleInfo (state,query) {
  return request({
    url: !state ?  api.addRole : api.updateRoleInfo,
    method: 'post',
    data: query
  })
}


export function getRolesList (parameter) {
  return request({
    url: api.roleFindPage,
    method: 'post',
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function getUserList (parameter,query) {
  return request({
    url: api.usersFindPage,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function getUserListByCompanyId (parameter,query) {
  return request({
    url: api.getUserListByCompanyId,
    method: 'post',
    params: query,
    data: {
      pageNum: parameter.pageNo,
      pageSize:parameter.pageSize
    }
  })
}

export function deleteUser (query) {
  return request({
    url: api.deleteUser,
    method: 'post',
    params: query
  })
}

export function editUser (state,query) {
  return request({
    url: (state == 0 )?  api.addUser : api.upDateUser,
    method: 'post',
    data: query
  })
}

export function getPowerList (query) {
  return request({
    url: api.powersFindPage,
    method: 'post',
    params: query,
  })
}

