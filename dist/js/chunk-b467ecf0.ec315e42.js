(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b467ecf0"],{"0740":function(e,t,r){"use strict";r("c7cd");var o=function(){var e=this,t=e._self._c;return t("a-modal",{attrs:{title:e.title,visible:e.visible,maskClosable:!1,confirmLoading:e.confirmLoading,width:1e3,footer:null},on:{cancel:e.cancelHandel}},[t("a-row",[t("a-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[t("vue-cropper",{key:"0",ref:"cropper",attrs:{img:e.options.img,info:!0,autoCrop:e.options.autoCrop,autoCropWidth:e.options.autoCropWidth,autoCropHeight:e.options.autoCropHeight,fixedBox:e.options.fixedBox,canScale:e.options.canScale,fixed:e.options.fixed,fixedNumber:e.options.fixedNumber,centerBox:e.options.centerBox},on:{realTime:e.realTime}})],1),t("a-col",{style:{height:"400px"},attrs:{xs:24,md:12}},[t("div",{staticClass:"avatar-upload-preview"},[t("img",{style:e.previews.img,attrs:{src:e.previews.url}})])]),t("a-col",{attrs:{lg:2,md:2}},[t("a-upload",{attrs:{name:"file",beforeUpload:e.beforeUpload,showUploadList:!1,data:{type:4}}},[t("a-button",{attrs:{icon:"upload"}},[e._v("选择图片")])],1)],1),t("a-col",{attrs:{lg:{span:1,offset:2},md:2}},[t("a-button",{attrs:{icon:"plus"},on:{click:function(t){return e.changeScale(1)}}})],1),t("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[t("a-button",{attrs:{icon:"minus"},on:{click:function(t){return e.changeScale(-1)}}})],1),t("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[t("a-button",{attrs:{icon:"undo"},on:{click:e.rotateLeft}})],1),t("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[t("a-button",{attrs:{icon:"redo"},on:{click:e.rotateRight}})],1),t("a-col",{attrs:{lg:{span:2,offset:6},md:2}},[t("a-button",{attrs:{type:"primary"},on:{click:function(t){return e.finish("blob")}}},[e._v("保存")])],1)],1)],1)},n=[],a=(r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("9861"),r("fcac")),u={name:"HeadCut",data:function(){return{title:"",visible:!1,id:null,confirmLoading:!1,uploading:!1,options:{img:"",autoCrop:!0,autoCropWidth:400,autoCropHeight:300,fixedBox:!1,fixed:!1,fixedNumber:[7,7],canScale:!0,centerBox:!0},previews:{},previewVisible:!1,cover:""}},methods:{edit:function(e){this.id=e,this.visible=!0,this.title=1==e?"上传Logo":"上传营业执照"},close:function(){this.id=null,this.visible=!1,this.options.img=""},cancelHandel:function(){this.close()},changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},beforeUpload:function(e){var t=this,r=new FileReader;return r.readAsDataURL(e),r.onload=function(){t.options.img=r.result},!1},finish:function(e){var t=this,r=this,o=new FormData;"blob"===e?this.$refs.cropper.getCropBlob((function(e){var n=window.URL.createObjectURL(e);t.model=!0,t.modelSrc=n;var u=new File([e],"image.jpeg");return o.append("files",u),o.append("type",5),Object(a["c"])(o).then((function(e){r.$message.success("上传成功"),r.$emit("ok",1,e.data[0]),r.visible=!1}))})):this.$refs.cropper.getCropData((function(e){t.model=!0,t.modelSrc=e}))},realTime:function(e){this.previews=e}}},s=u,d=(r("5678"),r("2877")),i=Object(d["a"])(s,o,n,!1,null,"44b4c776",null);t["a"]=i.exports},5678:function(e,t,r){"use strict";r("e34b")},8593:function(e,t,r){"use strict";r.d(t,"g",(function(){return a})),r.d(t,"T",(function(){return u})),r.d(t,"i",(function(){return s})),r.d(t,"c",(function(){return d})),r.d(t,"h",(function(){return i})),r.d(t,"l",(function(){return c})),r.d(t,"j",(function(){return p})),r.d(t,"k",(function(){return m})),r.d(t,"d",(function(){return l})),r.d(t,"q",(function(){return f})),r.d(t,"M",(function(){return y})),r.d(t,"G",(function(){return g})),r.d(t,"H",(function(){return b})),r.d(t,"S",(function(){return h})),r.d(t,"U",(function(){return O})),r.d(t,"u",(function(){return S})),r.d(t,"C",(function(){return C})),r.d(t,"w",(function(){return w})),r.d(t,"x",(function(){return j})),r.d(t,"e",(function(){return I})),r.d(t,"v",(function(){return R})),r.d(t,"t",(function(){return P})),r.d(t,"D",(function(){return L})),r.d(t,"I",(function(){return U})),r.d(t,"n",(function(){return v})),r.d(t,"A",(function(){return B})),r.d(t,"B",(function(){return N})),r.d(t,"Y",(function(){return x})),r.d(t,"X",(function(){return q})),r.d(t,"z",(function(){return z})),r.d(t,"m",(function(){return A})),r.d(t,"f",(function(){return F})),r.d(t,"Z",(function(){return k})),r.d(t,"r",(function(){return D})),r.d(t,"O",(function(){return T})),r.d(t,"W",(function(){return E})),r.d(t,"J",(function(){return W})),r.d(t,"P",(function(){return H})),r.d(t,"R",(function(){return $})),r.d(t,"N",(function(){return _})),r.d(t,"E",(function(){return G})),r.d(t,"K",(function(){return Q})),r.d(t,"b",(function(){return M})),r.d(t,"ab",(function(){return J})),r.d(t,"y",(function(){return V})),r.d(t,"V",(function(){return K})),r.d(t,"p",(function(){return X})),r.d(t,"L",(function(){return Y})),r.d(t,"a",(function(){return Z})),r.d(t,"o",(function(){return ee})),r.d(t,"s",(function(){return te})),r.d(t,"F",(function(){return re}));var o=r("b775"),n={usersFindPage:"/system/usersFindPage",getUserListByCompanyId:"/company/getUserListByCompanyId",upDateUser:"/sys/user/updateUser",deleteUser:"/system/deleteUser",roleFindPage:"/system/roleFindPage",updateRoleInfo:"/sys/role/updateRole",addRole:"/sys/role/save",deleteRole:"/sys/role/removeRole",routesFindPage:"/sys/route/queryRouteList",updateRouteInfo:"/sys/route/updateRoute",addRoute:"/sys/route/addRoute",deleteRoute:"/sys/route/removeRoute",removePower:"/sys/power/removePower",powersFindPage:"/sys/power/queryPowerList",updatePowerInfo:"/sys/power/updatePower",addPower:"/sys/power/addPower",deletePower:"/system/deletePower",getRole:"/system/getRole",getRoute:"/sys/route/queryRouteTree",getPower:"/sys/power/queryPowerTree",companyFindPage:"/company/companyFindPage",getShopListPage:"/sys/store/queryStore",getUserListPage:"/sys/user/queryUserList",addUser:"/sys/user/save",getSysRoleListPage:"/sys/role/queryRoleList",upload:"/UploadPictures/upload",getRoleTypeList:"/sys/role/queryRoleNameList",removeUser:"/sys/user/removeUser",getCardListPage:"/shop/findByCards",getfindByCardList:"/shop/findByCardList",addCard:"/shop/GenerateCard",getSwperListPage:"/sys/staticInfo/queryList",addSwiper:"/sys/staticInfo/uploadStaticInfo",updateStatus:"/sys/staticInfo/updateStatus",editSwiper:"/sys/staticInfo/updateStaticInfo",delSwiper:"/sys/staticInfo/removeImg",addShop:"/sys/staticInfo/",editMenuStatus:"/sys/route/updateStatus",getUserArray:"/sys/user/getUserNameOnPhone",getBatchNoList:"/shop/queryBn",getFindByOrderListPage:"/common/OmsOrder/findByOrderByStatus",updateOrderStatus:"/common/OmsOrder/updateStatus",updateOrderSettlement:"common/OmsOrder/updateOrderSettlement",getNoticeListPage:"/sys/announcement/findByAnnouncements",getNoticeInfoById:"/sys/announcement/findOneById",editNotice:"/sys/announcement/SaveOrUpdateAnnouncement",getRefundListPage:"/sys/refundInfo/queryRefundList",getOrderInfoById:"/common/OmsOrder/queryOrder",getByOrderSn:"/common/OmsOrder/queryByOrderSn",getBankListPage:"/sys/AdministratorReview/findByUserInfos",getMoneyListPage:"/sys/AdministratorReview/findByWithdraw",getRateListPage:"/sys/rate/queryList",addRate:"/sys/rate/addRate",updateRate:"/sys/rate/updateRate",editRateStatus:"/sys/rate/updateStatus",removeEateById:"/sys/rate/removeById",editUserStatus:"/sys/user/updateStatus",updateByCode:"/shop/updateByCode",updateCrodFlag:"shop/updateFlag",updateAgent:"/shop/updateAgent",checkRefund:"/sys/refundInfo/checkRefund",getCommodityList:"/sys/commodity/queryList",putWithdrawalAdopt:"/sys/AdministratorReview/WithdrawApproved",putWithdrawalNotAdopt:"/sys/AdministratorReview/WithdrawAuditFailed",getCardListByUserCOde:"/sys/user/queryInfoByUserCode",getOrderExcel:"/common/OmsOrder/findOrderExcel",exportPieSalaryRecordExcel:"/common/OmsOrder/exportPieSalaryRecordExcel",querySchoolClassNameByOrder:"/common/OmsOrder/querySchoolClassNameByOrder",getQrImg:"/shop/queryShopCardEwm",putOderState:"/api/wechatpay/wechatpay_callback_shsd",getAgentUser:"/agentUp/queryAgentUser",getAgentUserOrder:"/agentUp/queryAgentUserOrder",getSchoolPage:"/sys/querySchoolsAndClass",addSchool:"/sys/addSchool",updateSchool:"/sys/updateSchoolName",deteleSchool:"/sys/deteleSchool",addSchoolClass:"/sys/addSchoolClass",deteleSchoolClass:"/sys/deteleSchoolClass",getQueryContactUs:"/sys/queryContactUs",addOrUpdateContactUs:"/sys/addOrUpdateContactUs",deteleContactUs:"/sys/deteleContactUs",getQueryInform:"/sysinform/queryInform",addInform:"/sysinform/addInform",deteleInform:"/sysinform/deteleInform",queryDeliveryRecord:"sys/queryDeliveryRecord",deliveringGoods:"sys/deliveringGoods"};function a(e){return Object(o["b"])({url:n.deliveringGoods,method:"post",data:e})}function u(e){return Object(o["b"])({url:n.queryDeliveryRecord,method:"post",data:e})}function s(e){return Object(o["b"])({url:n.deteleInform,method:"post",data:e})}function d(e){return Object(o["b"])({url:n.addInform,method:"post",data:e})}function i(e){return Object(o["b"])({url:n.deteleContactUs,method:"post",data:e})}function c(e){return Object(o["b"])({url:n.addOrUpdateContactUs,method:"post",data:e})}function p(e){return Object(o["b"])({url:n.deteleSchool,method:"post",data:e})}function m(e){return Object(o["b"])({url:n.deteleSchoolClass,method:"post",data:e})}function l(e){return Object(o["b"])({url:n.addSchoolClass,method:"post",data:e})}function f(e,t){return Object(o["b"])({url:0==e?n.addSchool:n.updateSchool,method:"post",data:t})}function y(e,t){return Object(o["b"])({url:n.getSchoolPage,method:"post",params:t,data:{schoolName:t.schoolName,pageNum:e.pageNo,pageSize:e.pageSize}})}function g(e,t){return Object(o["b"])({url:n.getQueryContactUs,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function b(e,t){return Object(o["b"])({url:n.getQueryInform,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function h(e){return Object(o["b"])({url:n.putOderState,method:"get",params:e})}function O(e){return Object(o["b"])({url:n.querySchoolClassNameByOrder,method:"post",data:e})}function S(e){return Object(o["b"])({url:n.exportPieSalaryRecordExcel,method:"post",responseType:"blob",data:e})}function C(e){return Object(o["b"])({url:n.getOrderExcel,method:"post",data:e})}function w(e){return Object(o["b"])({url:n.getCardListByUserCOde,method:"get",params:e})}function j(e){return Object(o["b"])({url:n.getCommodityList,method:"get",params:e})}function I(e){return Object(o["b"])({url:n.checkRefund,method:"get",params:e})}function R(e){return Object(o["b"])({url:n.getByOrderSn,method:"get",params:e})}function P(e){return Object(o["b"])({url:n.editUserStatus,method:"post",params:e})}function L(e){return Object(o["b"])({url:n.getOrderInfoById,method:"get",params:e})}function U(e,t){return Object(o["b"])({url:n.getRefundListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function v(e){return Object(o["b"])({url:n.editNotice,method:"post",data:e})}function B(e){return Object(o["b"])({url:n.getNoticeInfoById,method:"get",params:e})}function N(e,t){return Object(o["b"])({url:n.getNoticeListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function x(e){return Object(o["b"])({url:n.updateOrderStatus,method:"get",params:e})}function q(e){return Object(o["b"])({url:n.updateOrderSettlement,method:"post",data:e})}function z(e,t){return Object(o["b"])({url:n.getFindByOrderListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function A(e){return Object(o["b"])({url:n.editMenuStatus,method:"post",params:e})}function F(e){return Object(o["b"])({url:n.delSwiper,method:"post",params:e})}function k(e){return Object(o["b"])({url:n.updateStatus,method:"post",params:e})}function D(e,t){return Object(o["b"])({url:0==e?n.addSwiper:n.editSwiper,method:"post",data:t})}function T(e,t){return Object(o["b"])({url:n.getSwperListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function E(e){return Object(o["b"])({url:n.removeUser,method:"post",params:e})}function W(e,t){return Object(o["b"])({url:n.getRoleTypeList,method:"post",data:t})}function H(e,t){return Object(o["b"])({url:n.getSysRoleListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function $(e,t){return Object(o["b"])({url:n.getUserListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function _(e,t){return Object(o["b"])({url:n.getShopListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function G(){return Object(o["b"])({url:n.getPower,method:"post"})}function Q(e){return Object(o["b"])({url:n.getRoute,method:"post",params:e})}function M(e,t){return Object(o["b"])({url:e?n.updatePowerInfo:n.addPower,method:"post",data:t})}function J(e){return Object(o["b"])({url:n.upload,method:"post",params:{},data:e})}function V(e){return Object(o["b"])({url:n.deleteRoute,method:"post",params:e})}function K(e){return Object(o["b"])({url:n.removePower,method:"post",params:e})}function X(e,t){return Object(o["b"])({url:e?n.updateRouteInfo:n.addRoute,method:"post",data:t})}function Y(e,t){return Object(o["b"])({url:n.routesFindPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function Z(e){return Object(o["b"])({url:n.deleteRole,method:"post",params:e})}function ee(e,t){return Object(o["b"])({url:e?n.updateRoleInfo:n.addRole,method:"post",data:t})}function te(e,t){return Object(o["b"])({url:0==e?n.addUser:n.upDateUser,method:"post",data:t})}function re(e){return Object(o["b"])({url:n.powersFindPage,method:"post",params:e})}},e34b:function(e,t,r){},fcac:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"d",(function(){return u})),r.d(t,"e",(function(){return s})),r.d(t,"a",(function(){return d})),r.d(t,"c",(function(){return i}));var o=r("b775"),n={addCompany:"/company/addCompany",companyFindPage:"/company/companyFindPage",getCompanyListByUserId:"/company/getCompanyListByUserId",upDateCompany:"/company/updateCompany",deleteCompany:"/company/deleteCompany",filesCompany:"/gallery/upload",stateCompany:"/company/updateAdopt",typeCompany:"/company/getCompanyType",getCompanyIntroductionListPage:"/sys/CompanyIntroduction/findByCompanyIntroduction",editCompanyIntroduction:"/sys/CompanyIntroduction/SaveOrUpdateCompanyIntroduction",getCompanyIntroductionInfoById:"/sys/CompanyIntroduction/findOneById"};function a(e){return Object(o["b"])({url:n.editCompanyIntroduction,method:"post",data:e})}function u(e){return Object(o["b"])({url:n.getCompanyIntroductionInfoById,method:"get",params:e})}function s(e,t){return Object(o["b"])({url:n.getCompanyIntroductionListPage,method:"post",params:t,data:{pageNum:e.pageNo,pageSize:e.pageSize}})}function d(e){return Object(o["b"])({url:n.deleteCompany,method:"post",params:e})}function i(e){return Object(o["b"])({url:n.filesCompany,method:"post",params:{},data:e})}}}]);