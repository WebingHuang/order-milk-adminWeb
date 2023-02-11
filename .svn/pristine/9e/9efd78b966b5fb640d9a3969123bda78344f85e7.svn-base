<template>
   <div id="management">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="店铺名称">
                           <a-input v-model="queryCondition.shopName" placeholder="支持模糊查询" />
                        </a-form-item>
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
            <!-- 右键菜单 -->
            <a-menu class="menustyle" :style="menuStyle" v-if="menuVisible">
               <a-menu-item>
                  <a @click="deleteAll">批量删除</a>
               </a-menu-item>
            </a-menu>
            <!-- 新建 -->
            <div class="table-operator" :title="state ? '修改信息' : '新增信息'">
               <a-button type="primary" logo="plus" @click="handleAdd">新建</a-button>
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
               bordered
               :customRow="setRow"
            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>
               <!-- 图片 -->
               <span slot="pic" slot-scope="text, record" type="primary" @click="enlargeImg(record)">
                  <img style="width: 50px; height: 50px" :src="record.logo" />
               </span>
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
                     <a @click="handleEdit(record)">修改</a>
                     <a-divider type="vertical" />
                     <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                        <a>删除</a>
                     </a-popconfirm>
                  </template>
               </span>
            </s-table>
         </a-card>
         <!-- 抽屉 -->
         <template>
            <div>
               <a-drawer
                  :title="state ? '修改店铺' : '新增店铺'"
                  :placement="placement"
                  :closable="false"
                  :visible="visible"
                  @close="onClose"
                  width="800px"
               >
                  <a-form-model
                     :model="shopForm"
                     :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     :rules="rules"
                     ref="shopForm"
                  >
                     <a-form-model-item label="店铺名称" prop="shopName">
                        <a-input v-model="shopForm.shopName" />
                     </a-form-model-item>
                     <a-form-model-item label="经营类型">
                        <!-- <a-input v-model="foda.type" /> -->
                        <!-- 下拉树 -->
                        <a-select :size="size" :value="type" style="width: 200px" @change="typeTreea">
                           <a-select-option v-for="(item, index) in typeShop" :key="index">
                              {{ item.type }}
                           </a-select-option>
                        </a-select>
                     </a-form-model-item>
                     <a-form-model-item label="地址">
                        <a-input v-model="shopForm.address" />
                     </a-form-model-item>
                     <a-form-model-item label="店铺类型int">
                        <a-input v-model="shopForm.shopType" placeholder="数字类型" />
                     </a-form-model-item>
                     <a-form-model-item label="店铺介绍">
                        <a-input v-model="shopForm.description" />
                     </a-form-model-item>
                     <!-- logo -->
                     <a-form-model-item label="店铺Logo" v-if="!state">
                        <!-- logo -->
                        <div
                           class="ant-upload-preview ant-upload ant-upload-select ant-upload-select-picture-card"
                           @click="$refs.upimg.edit(8)"
                        >
                           <img v-if="preview" :src="shopForm.logo" style="height: 100px; width: 100px" />
                           <img
                              v-else
                              src="../../../assets/upload.jpg"
                              style="height: 50px; width: 50px; margin-top: 25%"
                           />
                        </div>
                        <HeadCut ref="upimg" @ok="setavatar" />
                     </a-form-model-item>
                     <a-form-model-item label="店铺Logo" v-if="state">
                        <div
                           class="ant-upload-preview ant-upload ant-upload-select ant-upload-select-picture-card"
                           @click="$refs.upimg.edit(8)"
                        >
                           <img :src="shopForm.logo" style="height: 100px; width: 100px" />
                        </div>
                        <HeadCut ref="upimg" @ok="setavatar" />
                     </a-form-model-item>

                     <a-button type="primary" @click="handleOk" style="margin-left: 17%"> 确定 </a-button>
                  </a-form-model>
               </a-drawer>
            </div>
         </template>

         <div>
            <!-- 图片预览 -->
            <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
               <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
            </a-modal>
         </div>
      </page-header-wrapper>
   </div>
</template>
<style scoped>
.preview {
   margin-left: 25%;
}
</style>
</style>
<script>
import Vue from 'vue'
import moment, { max } from 'moment'
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
import router from '@/router'
import HeadCut from './HeadCut'
import HeadCut1 from './HeadCut'

// 增删改查接口
import { getShopListByUserId, editShop, deleteShop } from '@/api/shop'

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
      dataIndex: 'shopType',
      align: 'center',
   },
   // {
   //   title: '添加时间',
   //   width: '100px',
   //   dataIndex: 'addTime',
   //   align: 'center',
   // },
   // {
   //   title: '修改时间',
   //   width: '100px',
   //   dataIndex: 'editTime',
   //   align: 'center',
   // },
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
   // {
   //   title: '审批时间',
   //   width: '100px',
   //   dataIndex: 'approvalTime',
   //   align: 'center',
   // },
   {
      title: '描述',
      dataIndex: 'describe',
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
      HeadCut,
      HeadCut1,
   },
   data() {
      this.columns = columns
      return {
         preview: false,
         preview1: false,
         // 店铺类型下拉
         // 店铺类型
         typeShop: [
            { type: '线上', id: 1 },
            { type: '线下', id: 2 },
         ],
         type: '',
         size: 'default',
         // 上传图片
         previewVisible: false,
         previewVisible2: false,
         previewImage: '',
         previewImage2: '',
         // 新增,修改按钮弹窗状态
         visiblea: false,
         // 抽屉要从哪边显示
         placement: 'right',
         // 上传图片要用到的数组
         fileList: [],
         fileList2: [],
         labelCol: { span: 4 },
         wrapperCol: { span: 14 },
         // 右键菜单显示/隐藏
         menuVisible: false,
         //新增修改状态
         state: false,
         idfalse: false,
         // 表单
         shopForm: {
            shopName: '', //店铺名称
            shopType: 0, //店铺类型
            userId: '', // 店铺创建人
            companyId: '', // 店铺ID
            // adopt: '', //是否通过认证
            addTime: '', // 添加时间
            editTime: '', // 修改时间
            logo: '', // 店铺logo
            address: '', //地址
            manageType: '', // 经营类型
            approvalTime: '', // 审批时间
            description: '', // 描述
         },
         oldImg: [],
         // 表单验证
         rules: {
            shopName: [
               { required: true, message: '请输入店铺名称' },
               { whitespace: true, message: '不能添加空格' },
               { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入有误' },
               { max: 20, message: '最大10个字符' },
               { min: 3, message: '最小3个字符' },
            ],
         },
         //  图片弹窗
         icooon: '',
         enlarge: false,
         //   增加修改弹窗状态
         visible: false,
         // 右键菜单样式
         menuStyle: {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1,
            borderRadius: '5px',
            border: '1px solid #eee',
         },
         // create model
         userConfigIsShow: true,
         visible: false,
         // confirmLoading: false,
         mdl: null,
         // 高级搜索 展开/关闭
         advanced: false,
         // 查询参数
         queryParam: {},
         //
         queryCondition: {
            //商店名称
            shopName: '',
            userId: '',
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
            console.log(parameter)
            // requestParameters查询参数
            // queryCondition用户ID
            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            return getShopListByUserId(requestParameters, this.queryCondition)
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
         // 店铺类型
         manageType: [],
         typeId: '',
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
      onClose() {
         this.visible = false
      },
      onChange(e) {
         this.placement = e.target.value
      },

      getLocalStorage() {
         this.shopForm.userId = JSON.parse(localStorage.getItem('cf01'))
         this.queryCondition.userId = JSON.parse(localStorage.getItem('cf01'))
      },

      setavatar(id, url) {
         this.shopForm.logo = url
         this.preview = true
      },
      setavatar1(id, url) {
         this.shopForm.licenseUrl = url
         this.preview1 = true
      },
      // 下拉树
      typeTreea(value) {
         this.shopForm.manageType = this.typeShop[value].type
         this.type = this.typeShop[value].type
      },
      // 上传图片
      handleCancel() {
         this.previewVisible = false
      },
      handleCancel2() {
         this.previewVisible = false
      },

      // 上传后预览回调
      async handlePreview(file) {
         if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
         }
         this.previewImage = file.url || file.preview
         this.previewVisible = true
      },
      async handlePreview2(file) {
         if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
         }
         this.previewImage = file.url || file.preview
         this.previewVisible = true
      },
      examine(e) {
         this.visiblea = false
      },
      enlargeImg(record) {
         this.icooon = record.logo
         this.enlarge = true
      },
      en(e) {
         this.enlarge = false
      },
      //新增
      handleAdd() {
         this.state = false
         this.preview = false
         this.preview1 = false
         this.shopForm = {}
         this.shopForm.userId = JSON.parse(localStorage.getItem('cf01'))
         console.log(this.shopForm.userId)
         this.visible = true
         this.fileList = []
         this.fileList2 = []
         // this.manageType = ''
      },
      // 修改
      handleEdit(record) {
         this.visible = true
         this.state = true
         this.fileList.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.logo,
         })
         this.fileList2.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.licenseUrl,
         })
         // for (var i = 0; i < this.manageType.length; i++) {
         //   if (this.manageType[i].id == record.manageType) {
         //     this.manageType = this.manageType[i].manageType
         //     break
         //   }
         // }
         this.shopForm.shopName = record.shopName
         this.shopForm.manageType = record.manageType
         this.shopForm.logo = record.logo
         this.shopForm.shopType = record.shopType
         this.shopForm.description = record.description
         this.shopForm.authentication = record.authentication
         this.shopForm.describe = record.describe
         this.shopForm.id = record.id
         this.shopForm.licenseUrl = record.licenseUrl
         this.shopForm.address = record.address
         this.shopForm.userId = JSON.parse(localStorage.getItem('cf01'))
         if (this.fileList.length >= 2) {
            this.fileList.shift()
         }
         if (this.fileList2.length >= 2) {
            this.fileList2.shift()
         }
      },
      // 删除
      handleDel(record) {
         var imgLIst = []
         imgLIst.push(record.logo)
         imgLIst.push(record.authentication)
         return deleteShop({ idArr: record.id, oldImg: imgLIst.join(','), userId: this.shopForm.userId }).then(
            (res) => {
               this.$refs.table.refresh(false)
               this.$notification.success({
                  message: '提示',
                  description: res.message,
               })
            }
         )
      },
      // 批量删除
      deleteAll(record) {
         var imgLIst = []
         imgLIst.push(record.logo)
         imgLIst.push(record.authentication)
         if (this.selectedRowKeys.length > 0) {
            var that = this
            this.$confirm({
               title: '警示',
               content: '确定要全部删除吗?',
               onOk() {
                  return deleteShop({
                     idArr: that.selectedRowKeys.join(','),
                     oldImg: imgLIst.join(','),
                     userId: that.shopForm.userId,
                  }).then((res) => {
                     that.$refs.table.refresh(false)
                     that.$notification.success({
                        message: '提示',
                        description: res.message,
                     })
                  })
               },
               onCancel() {},
            })
         }
      },
      // 提交
      handleOk(e) {
         this.$refs.shopForm.validate((valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            this.shopForm.oldImg = this.oldImg.join(',')
            this.shopForm['type'] = 8
            console.log(this.shopForm)
            if (!valid) {
               return false
            } else {
               return editShop(this.state, this.shopForm).then((res) => {
                  console.log(res)
                  this.$refs.table.refresh(false)
                  this.visible = false
                  this.$notification.success({
                     message: '提示',
                     description: res.message,
                  })
               })
            }
         })
         this.preview1 = false
         this.preview = false
      },
      // 复选框选中触发事件
      onSelectChange(selectedRowKeys, selectedRows) {
         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
      },
      //取消右键菜单
      cancelClick() {
         this.menuVisible = false
         document.body.removeEventListener('click', this.cancelClick)
      },
      setRow(record) {
         return {
            on: {
               click: () => {},
               // 右键菜单
               contextmenu: (e) => {
                  e.preventDefault()
                  this.menuVisible = true
                  this.menuStyle.top = e.clientY + 'px'
                  this.menuStyle.left = e.clientX + 'px'
                  document.addEventListener('click', this.cancelClick)
               },
            },
         }
      },
   },
   mounted() {
      this.getLocalStorage()
   },
   watch: {
      // 去掉表单验证信息二次打开残留
      visible(val, newVal) {
         //监听的是控制模态框显示或隐藏开关的布尔值
         // 监视dialog状态（打开、关闭）
         if (val) {
            try {
               this.$refs['shopForm'].clearValidate() // 重置编辑表单,移出验证
            } catch (e) {}
         }
      },
   },
}
</script>