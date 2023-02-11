<template>
   <div id="companyagement">
      <page-header-wrapper>
         <!-- 这是店铺审批 -->
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="店铺名称">
                           <a-input v-model="queryCondition.shopName" placeholder="" />
                        </a-form-item>
                     </a-col>
                     <a-col :md="(!advanced && 8) || 24" :sm="24">
                        <a-select
                           label-in-value
                           :default-value="{ key: '1' }"
                           style="width: 130px"
                           @change="handleChangea"
                        >
                           <a-select-option value="">
                              <a-badge status="success" text="全部店铺" color="#2db7f5" />
                           </a-select-option>
                           <a-select-option value="1">
                              <a-badge status="default" text="待认证店铺" />
                           </a-select-option>
                           <a-select-option value="2">
                              <a-badge status="success" text="已认证店铺" />
                           </a-select-option>
                           <a-select-option value="3">
                              <a-badge status="error" text="未通过" />
                           </a-select-option>
                        </a-select>
                     </a-col>
                     <a-col :md="(!advanced && 8) || 24" :sm="24">
                        <span
                           class="table-page-search-submitButtons"
                           :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                        >
                           <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                           <a-button
                              style="margin-left: 8px"
                              @click="() => ((this.queryCondition = {}), $refs.table.refresh(true))"
                              >重置</a-button
                           >
                        </span>
                     </a-col>
                  </a-row>
               </a-form>
            </div>
            <!-- 表格 -->
            <s-table
               ref="table"
               size="default"
               rowKey="id"
               :columns="columns"
               :data="loadData"
               :alert="true"
               :rowSelection="rowSelection"
               showPagination="auto"
               bordered
            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>
               <!-- Logo  -->
               <span slot="pic" slot-scope="text, record" type="primary" @click="enlargeImg(record)">
                  <img style="width: 50px; height: 50px" :src="record.logo" />
               </span>
               <!-- 营业执照  -->
               <!-- <span slot="pic2" slot-scope="text, record" type="primary" @click="enlargeImga(record)">
                  <img style="width: 50px; height: 50px" :src="record.licenseUrl" />
               </span> -->
               <!-- 审核 -->
               <span slot="status" slot-scope="text">
                  <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
               </span>
               <span slot="status" slot-scope="text">
                  <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
               </span>
               <span slot="description" slot-scope="text">
                  <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
               </span>
               <span slot="action" slot-scope="text, record">
                  <template>
                     <a @click="showModal(record)">审核</a>
                  </template>
               </span>
            </s-table>
         </a-card>
         <!-- 图片预览 -->
         <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
            <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
         </a-modal>
         <a-modal v-model="enlargea" title="预览" @ok="en" okText="完成" width="550px" cancelText="关闭">
            <img style="width: 500px; height: 300px" :src="icooona" />
         </a-modal>
         <!-- 审核弹窗 -->
         <template>
            <div>
               <a-modal v-model="visiblea" title="审核信息" cancelText="未通过审核" okText="通过审核">
                  <a-form-model :model="companyForm" :label-col="labelCol" :wrapper-col="wrapperCol">
                     <a-form-model-item label="店铺名称">
                        {{ companyForm.shopName }}
                     </a-form-model-item>
                     <a-form-model-item label="店铺类型">
                        {{ companyForm.type }}
                     </a-form-model-item>
                     <a-form-model-item label="地址">
                        {{ companyForm.address }}
                     </a-form-model-item>
                     <a-form-model-item label="Logo" v-if="state">
                        <img
                           :src="companyForm.logo"
                           style="width: 100px; height: 100px"
                           @click="lookimg(companyForm.logo)"
                        />
                     </a-form-model-item>
                    
                     <a-form-model-item label="id" v-if="idfalse">
                        {{ forcompanyForm.id }}
                     </a-form-model-item>
                     
                    <a-form-model-item label="经营类型">
                        {{ companyForm.manageType }}
                     </a-form-model-item>

                     <a-form-model-item label="描述">
                        {{ companyForm.description }}
                     </a-form-model-item>
                  </a-form-model>
                  <template slot="footer">
                     <a-button @click="cancel">取消</a-button>
                     <a-button type="danger" @click="Save(3)">未通过审核</a-button>
                     <a-button type="primary" @click="Save(2)">通过审核</a-button>
                  </template>
               </a-modal>
            </div>
         </template>
      </page-header-wrapper>
   </div>
</template>
<style scoped>
.preview {
   margin-left: 25%;
}
</style>
<script>
import Vue from 'vue'
import moment, { max } from 'moment'
// 引入表格组件 和 文字省略组件
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法
import { getCompanyList, stateCompany } from '@/api/company'
// 打算打发打发 审批管理
import { getShopListPageByAdopt, updateShopAdopt } from '@/api/shop'
// import { FormModel } from 'ant-design-vue'
import router from '@/router'

// Vue.use(FormModel)
// import StepByStepModal from '@/views/list/modules/StepByStepModal'
// 引入操作/配置/弹出框组件
// import CreateForm from '@/views/list/modules/CreateForm'
const columns = [
   {
      title: '#',
      width: '70px',
      scopedSlots: { customRender: 'serial' },
      align: 'center',
   },
   {
      title: '店铺名称',
      width: '100px',
      dataIndex: 'shopName',
      align: 'center',
   },
   {
      title: '店铺类型',
      width: '100px',
      dataIndex: 'type',
      align: 'center',
   },
   {
      title: 'Logo',
      width: '100px',
      dataIndex: 'logo',
      scopedSlots: { customRender: 'pic' },
      align: 'center',
   },
   {
      title: '地址',
      width: '100px',
      dataIndex: 'address',
      align: 'center',
   },
   {
      title: '经营类型',
      width: '100px',
      dataIndex: 'manageType',
      align: 'center',
   },
   {
      title: '描述',
      dataIndex: 'description',
      width: '100px',
      ellipsis: true, //文字多会以省略号的形式展示
      align: 'center', //列内容居中
   },
   {
      title: '操作',
      dataIndex: 'action',
      width: '100px',
      scopedSlots: { customRender: 'action' },
      align: 'center',
   },
]
const statusMap = {
   1: {
      status: 'default',
      text: '待认证',
   },
   2: {
      status: 'success',
      text: '已认证',
   },
   3: {
      status: 'error',
      text: '未通过',
   },
}
function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
   })
}
export default {
   name: 'TableList',
   components: {
      STable,
      Ellipsis,
   },
   data() {
      this.columns = columns
      return {
         // 审核按钮弹窗状态
         visiblea: false,
         idfalse: false,

         state: false,
         labelCol: { span: 4 },
         wrapperCol: { span: 14 },
         companyForm: {
            shopName: '', //店铺名称
            type: 0, //店铺类型
            userId: '', // 店铺创建人
            companyId: '', // 店铺ID
            adopt: '', //是否通过认证
            addTime: '', // 添加时间
            editTime: '', // 修改时间
            logo: '', // 店铺logo
            address: '', //地址
            manageType: '', // 经营类型
            approvalTime: '', // 审批时间
            description: '', // 描述
            id: 0,
            oldImg: '',
         },
         //  图片弹窗
         icooon: '',
         icooona: '',

         enlarge: false,
         enlargea: false,

         // create model
         userConfigIsShow: true,
         visible: false,
         // confirmLoading: false,
         mdl: null,
         // 高级搜索 展开/关闭
         advanced: false,
         // 查询参数
         queryCondition: {
            //店铺名称
            shopName: '',
            adopt: 1,
         },
         // 分页参数
         pageFrom: {
            // pageNum: 1, //第几次请求
            // pageSize: 10, //每页显示几条
            // totalPages: 0, //请求总次数
            // totalSize: 0, //所有数据数量
         },
         // 加载数据方法 必须为 Promise 对象
         loadData: (parameter) => {
            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            console.log(this.queryCondition)
            return getShopListPageByAdopt(requestParameters, this.queryCondition)
               .then((res) => {
                  if (res.state == 2000) {
                     const pageData = {
                        data: res.data.content,
                        pageNo: res.data.pageNum,
                        pageSize: res.data.pageSize,
                        totalCount: res.data.totalSize,
                        totalPage: res.data.totalPages,
                     }
                     return pageData
                  } else {
                     return
                  }
               })
               .catch((err) => {
                  alert(err)
               })
         },
         //表格选中行的ID
         selectedRowKeys: [],
         //表格选中行的所有数据
         selectedRows: [],
      }
   },
   filters: {
      statusFilter(type) {
         return statusMap[type].text
      },
      statusTypeFilter(type) {
         return statusMap[type].status
      },
   },
   computed: {
      rowSelection() {
         return {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
         }
      },
   },
   methods: {
      //点击审核按钮后弹出的页面图片预览
      lookimg(str) {
         var newwin = window.open()
         newwin.document.write('<img src=' + str + " class='lookimg'/>")
      },
      //审核状态
      handleChangea(value) {
        console.log(value)
         this.queryCondition.adopt = value.key
         console.log(this.queryCondition)
         this.$refs.table.refresh(false)
      },
      // 审核按钮弹窗状态
      showModal(record) {
         this.visiblea = true
         this.state = true
         this.companyForm.shopName = record.shopName
         this.companyForm.manageType = record.manageType
         this.companyForm.logo = record.logo
         this.companyForm.type = record.type
         this.companyForm.description = record.description
         this.companyForm.authentication = record.authentication
         this.companyForm.describe = record.describe
         this.companyForm.id = record.id
         this.companyForm.address = record.address
         this.companyForm.userId = JSON.parse(localStorage.getItem('cf01'))
      },

      // 复选框选中触发事件
      onSelectChange(selectedRowKeys, selectedRows) {
         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
      },
      // 图片弹窗
      enlargeImg(record) {
         this.icooon = record.logo
         this.enlarge = true
      },
      // enlargeImga(record) {
      //    this.icooona = record.licenseUrl
      //    this.enlargea = true
      // },
      en(e) {
         this.enlarge = false
         this.enlargea = false
      },
      // 取消按钮
      cancel() {
         this.visiblea = false
      },
      // 审核
      Save(val) {
        console.log(val)
         return updateShopAdopt({ id: this.companyForm.id, adopt: val }).then((res) => {
            this.visiblea = false
            this.$refs.table.refresh(false)
            this.$notification.success({
               message: '提示',
               description: '审核修改完成',
            })
         })
      },
   },
}
</script>