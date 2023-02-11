<template>
   <div id="UserAdmin">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="手机">
                           <a-input v-model="queryCondition.phone" placeholder="" />
                        </a-form-item>
                     </a-col>
                     <a-col :md="8" :sm="24">
                        <a-form-item label="邮箱">
                           <a-input v-model="queryCondition.email" placeholder="" />
                        </a-form-item>
                     </a-col>

                     <a-col :md="8 || 24" :sm="24">
                        <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                        <a-button
                           style="margin-left: 8px"
                           @click="() => ((this.queryCondition = {}), $refs.table.refresh(true))"
                           >重置</a-button
                        >
                     </a-col>
                  </a-row>
               </a-form>
            </div>

            <!-- 右键菜单 -->
            <a-menu class="menustyle" :style="menuStyle" v-if="menuVisible">
               <a-menu-item>
                  <a @click="delAll">批量删除</a>
               </a-menu-item>
            </a-menu>

            <!-- 新建用户 -->
            <div class="table-operator" v-if="$store.getters.roles.authority.includes(CURD.create)">
               <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
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
               showPagination="true"
               bordered
               :customRow="setRow"
            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>

               <!-- 图片列 -->
               <span slot="pic" slot-scope="text, record" type="primary" @click="enlargeImg(record)">
                  <img style="width: 50px; height: 50px" :src="record.photoSrc" />
               </span>
               <span slot="action" slot-scope="text, record">
                  <template>
                     <a @click="handleEdit(record)" v-if="$store.getters.roles.authority.includes(CURD.update)">修改</a>
                     <a-divider type="vertical" />
                     <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                        <a v-if="$store.getters.roles.authority.includes(CURD.delete)">删除</a>
                        {{ columns.photoSrc }}
                     </a-popconfirm>
                  </template>
               </span>
            </s-table>
            <!-- form表单 -->
            <div>
               <a-drawer
                  :title="!fromFlag ? '添加用户' : '修改用户'"
                  :width="720"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="onClose"
               >
                  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="formLayout" labelAlign="left">
                     <a-row>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="账号" prop="userId">
                              <a-input v-model="ruleForm.userId" autocomplete="off" :disabled="true" v-if="fromFlag" />
                              <a-input v-model="ruleForm.userId" autocomplete="off" v-else />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="邮箱" prop="email">
                              <a-input v-model="ruleForm.email" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="密码" prop="password" v-if="!fromFlag">
                              <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>

                        <a-col :span="12">
                           <a-form-model-item has-feedback label="确认密码" prop="checkPass" v-if="!fromFlag">
                              <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>

                        <a-col :span="12" v-if="!fromFlag">
                           <a-form-model-item has-feedback label="用户名" prop="userName">
                              <a-input v-model="ruleForm.userName" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="昵称" prop="nickName">
                              <a-input v-model="ruleForm.nickName" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="性别" prop="sex">
                              <a-radio-group v-model="ruleForm.sex">
                                 <a-radio value="男"> 男 </a-radio>
                                 <a-radio value="女"> 女 </a-radio>
                              </a-radio-group>
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="备注" prop="remarks">
                              <a-input v-model="ruleForm.remarks" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="用户类型" prop="userType">
                              <a-input v-model="ruleForm.userType" autocomplete="off" />
                           </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                           <a-form-model-item has-feedback label="用户角色" prop="roleList">
                              <a-select
                                 mode="multiple"
                                 style="width: 100%"
                                 allowClear
                                 :value="defaultRoleList"
                                 placeholder="请选择角色"
                                 @change="selectHandleChange"
                              >
                                 <a-select-option v-for="(item, index) in roleList" :key="index">
                                    {{ item.roleName }}
                                 </a-select-option>
                              </a-select>
                           </a-form-model-item>
                        </a-col>
                     </a-row>

                     <a-form-model-item has-feedback label="上传头像" prop="photoSrc">
                        <div class="ant-upload-preview" @click="$refs.modal.edit(2, ruleForm.photoSrc)">
                           <!-- <a-icon type="cloud-upload-o" class="upload-icon" /> -->
                           <div class="mask">
                              <a-icon type="plus" />
                           </div>
                           <!-- <img :src="option.img" /> -->
                           <img :src="ruleForm.photoSrc" style="width: 180px; height: 180px" />
                        </div>
                        <avatar-modal ref="modal" @ok="setavatar" />
                     </a-form-model-item>
                  </a-form-model>
                  <div
                     :style="{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        zIndex: 1,
                     }"
                  >
                     <a-button :style="{ marginRight: '8px' }" @click="onClose"> 取消 </a-button>
                     <a-button type="primary" @click="handleOk"> 提交 </a-button>
                  </div>
               </a-drawer>
            </div>
         </a-card>
         <div>
            <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
               <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
            </a-modal>
         </div>
      </page-header-wrapper>
      <!-- 画布,根据用户名自动生成头像 -->
      <canvas style="display: none"></canvas>
   </div>
</template>

<script>
import moment from 'moment'
// 引入表格组件 和
import { STable } from '@/components'
// 引入调用接口方法
import { getRoleList, getServiceList } from '@/api/manage'
// 增删改查接口
import { getUserList, editUser, deleteUser, getUploadImgUrl, getRole } from '@/api/system'
// 引入图片裁剪组件
import AvatarModal from '@/views/account/settings/AvatarModal'

// 表头
const columns = [
   {
      title: '#',
      scopedSlots: { customRender: 'serial' },
   },
   {
      title: '手机号',
      dataIndex: 'phone',
   },
   {
      title: '用户头像',
      dataIndex: 'photoSrc',
      scopedSlots: { customRender: 'pic' },
   },
   {
      title: '性别',
      dataIndex: 'sex',
   },
   {
      title: '邮箱',
      dataIndex: 'email',
   },
   {
      title: '用户类型',
      dataIndex: 'userType',
   },
   // {
   //    title: '创建时间',
   //    dataIndex: 'createDate',
   // },
   {
      title: '最后一次登录时间',
      dataIndex: 'loginDate',
   },
   {
      title: '备注',
      dataIndex: 'remarks',
   },
   {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
   },
]

// 把上传的图片转化为base64格式
function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
   })
}

//把base64格式的图片转化成file格式
function dataURLtoFile(dataURI, type) {
   let file = atob(dataURI.split(',')[1])
   let array = []
   for (let i = 0; i < file.length; i++) {
      array.push(file.charCodeAt(i))
   }
   return new Blob([new Uint8Array(array)], { type: type })
}

export default {
   name: 'TableList',
   components: {
      STable, //表格组件
      AvatarModal, // 头像裁切
   },
   data() {
      this.columns = columns
      // 密码验证
      let validatePass = (rule, value, callback) => {
         if (value === '') {
            callback(new Error('请输入密码'))
         } else {
            if (this.ruleForm.checkPass !== '') {
               this.$refs.ruleForm.validateField('checkPass')
            }
            callback()
         }
      }
      //  确认密码验证
      let validatePass2 = (rule, value, callback) => {
         if (value === '') {
            callback(new Error('请确认密码'))
         } else if (value !== this.ruleForm.password) {
            callback(new Error('输入有误'))
         } else {
            callback()
         }
      }
      return {
         // 预览
         icooon: '',
         enlarge: false,

         // previewVisible: false,
         previewImage: '',
         // 保存上传图片信息,缩略图
         fileList: [],

         // 角色列表
         roleList: [],
         defaultRoleList: [],

         // 右键菜单显示/隐藏
         menuVisible: false,
         // 表单显示/隐藏
         visible: false,
         // 批量删除,图片
         photoSrcList: [],
         // 修改/添加 判断值
         fromFlag: true,
         // 右键菜单样式
         menuStyle: {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1,
            borderRadius: '5px',
            border: '1px solid #eee',
         },
         //  表单
         value: '', //选择性别
         // 增删改查按钮是否显示
         CURD: {
            create: 1055,
            update: 1056,
            read: 1057,
            delete: 1058,
         },
         ruleForm: {
            //表单数据
            userId: '', //用户ID
            sex: '', //性别
            nickName: '', //昵称
            email: '', //邮箱
            userName: '', //用户名
            photoSrc: '', //上传新图片
            remarks: '', //描述
            roleList: '', //角色列表
            userType: '', //用户类型
            password: '123456',
            checkPass: '123456',
            oldImg: '', //修改前的图片
            type:1,//必填项,后台用来判断图片保存地址
         },
         // 头像参数
         option: {
            img: this.$store.getters.userInfo.userInfo.photoSrc,
            info: true,
            size: 1,
            outputType: 'jpeg',
            canScale: false,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 180,
            autoCropHeight: 180,
            fixedBox: true,
            // 开启宽度和高度比例
            fixed: true,
            fixedNumber: [1, 1],
         },
         // 表单验证
         rules: {
            // userId: [
            //    { required: true, message: '请输入账号', trigger: 'blur' },
            //    { whitespace: true, message: '输入有误', trigger: 'blur' },
            //    { pattern: /^1[357689]\d{9}$/gi, message: '输入有误', trigger: 'blur' },
            // ],
            // password: [
            //    { validator: validatePass,required: true, trigger: 'blur' },
            // ],
            // checkPass: [
            //    { validator: validatePass2, required: true,trigger: 'blur' },
            // ],
            // nickName: [
            //    { required: true, message: '请输入昵称', trigger: 'blur' },
            //    { min: 2, max: 10, message: '长度2~10', trigger: 'blur' },
            //    { whitespace: true, message: '不能输入空格', trigger: 'blur' },
            // ],
            // email: [
            //    { required: true, message: '请输入邮箱', trigger: 'blur' },
            //    {
            //       pattern: /^([a-zA-Z0-9]*[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            //       message: '邮箱不正确',
            //       trigger: 'blur',
            //    },
            // ],
            // userName:[
            //    { required: true, message: '请输入用户名', trigger: 'blur' },
            //    { min: 1, max: 5, message: '长度1~5', trigger: 'blur' },
            // ]
         },
         // 栅格布局
         formLayout: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
         },
         // 查询参数
         queryCondition: {
            // userId: '',
            // email: '',
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
            // 判断是否添加表格操作列
            if (
               !this.$store.getters.roles.authority.includes(this.CURD.update) &&
               !this.$store.getters.roles.authority.includes(this.CURD.delete)
            ) {
               this.columns.pop()
            }

            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            return getUserList(requestParameters, this.queryCondition)
               .then((res) => {
                  if (res.state == 2000) {
                     const pageData = {
                        data: res.data.content,
                        pageNo: res.data.pageNum,
                        pageSize: res.data.pageSize,
                        totalCount: res.data.totalSize,
                        totalPage: res.data.totalPages,
                     }
                     pageData.data.forEach((element) => {
                        element.loginDate = this.$renderTime(element.loginDate)
                        if (element.editTime == '' && element.editTime == null) {
                           element.editTime = this.$renderTime(element.editTime)
                        }
                     })
                     return pageData
                  } else {
                     return
                  }
               })
               .catch((err) => {
                  alert(err)
               })
         },
         // 表格选中行的ID
         selectedRowKeys: [],
         //表格选中行的所有数据
         selectedRows: [],
      }
   },
   created() {
      // getRoleList({ t: new Date() })
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
      // 角色列表下拉框选择事件
      selectHandleChange(value) {
         this.defaultRoleList = value
         this.ruleForm.roleList = []
         value.forEach((item, index) => {
            this.ruleForm.roleList.push(this.roleList[item].roleId)
         })
         this.ruleForm.roleList = this.ruleForm.roleList.join(',')
         console.log(this.ruleForm.roleList)
      },
      // 头像保存事件 // url: 上传的图片
      setavatar(url) {
         // this.option.img = url
         this.ruleForm.photoSrc = url
      },

      // 点击表格内头像预览
      enlargeImg(record) {
         this.icooon = record.photoSrc
         this.enlarge = true
      },
      // 预览框显示/隐藏
      en(e) {
         this.enlarge = false
      },

      // 新建用户
      handleAdd(record) {
         this.fromFlag = false
         this.ruleForm.userId = ''
         this.ruleForm.userName = ''
         this.ruleForm.nickName = ''
         this.ruleForm.photoSrc = ''
         this.ruleForm.sex = '男'
         this.ruleForm.password = '123456'
         this.ruleForm.checkPass = '123456'
         this.ruleForm.email = ''
         this.ruleForm.userType = ''
         this.ruleForm.roleList = ''
         this.visible = true
         this.roleList = []
         this.defaultRoleList = []
         return getRole().then((res) => {
            this.roleList = res.data
         })
      },
      // 修改
      handleEdit(record) {
         this.roleList = []
         this.defaultRoleList = []
         this.fromFlag = true
         this.visible = true
         this.ruleForm.password = ''
         this.ruleForm.checkPass = ''
         this.ruleForm.userId = record.userId
         this.ruleForm.sex = record.sex
         this.ruleForm.email = record.email
         this.ruleForm.nickName = record.nickName
         this.ruleForm.userType = record.userType
         this.ruleForm.remarks = record.remarks
         this.ruleForm.photoSrc = record.photoSrc
         this.ruleForm.roleList = record.roleList
         this.fileList.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.photoSrc,
         })
         this.ruleForm.oldImg = record.photoSrc || ''
         const roleListNewArr = record.roleList.split(',').map(function (item) {
            return item - 0
         })
         console.log(roleListNewArr)
         return getRole().then((res) => {
            this.roleList = res.data
            console.log(res.data)
            roleListNewArr.forEach((item, index) => {
               this.roleList.forEach((item_, index_) => {
                  if (item_.roleId == item) {
                     this.defaultRoleList.push(index_)
                  }
               })
            })
         })
      },
      // 删除
      handleDel(record) {
         console.log(record.id)
         return deleteUser({ idArr: record.id, imgList: record.photoSrc,type:1 }).then((res) => {
            // console.log(res)
            this.$refs.table.refresh(false)
            this.$notification.success({
               message: '提示',
               description: res.message,
            })
         })
      },
      // 批量删除
      delAll() {
         if (this.selectedRowKeys.length > 0) {
            var that = this
            this.$confirm({
               title: '警示',
               content: '确定要全部删除吗?',
               onOk() {
                  console.log(that.photoSrcList)
                  return deleteUser({
                     idArr: that.selectedRowKeys.join(','),
                     imgList: that.photoSrcList.join(','),
                  }).then((res) => {
                     that.$refs.table.refresh(false)
                     that.$notification.success({
                        message: '提示',
                        description: res.message,
                     })
                  })
               },
               onCancel() {
                  // console.log('取消')
               },
            })
         }
      },
      // 提交
      async handleOk(e) {
         this.$refs.ruleForm.validate(async (valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
            }
            // 如果用户没有上传头像,通过画布自动按昵称首字生成
            if (this.ruleForm.photoSrc == '') {
               //设置头像昵称，如果为null或者为空时，设置为无
               var nickname =
                  this.ruleForm.nickName == null
                     ? '无'
                     : this.ruleForm.nickName == ''
                     ? '无'
                     : this.ruleForm.nickName.substring(0, 1).toUpperCase()
               //设置头像背景颜色
               let colors = [
                  '#9900ff',
                  '#cc0099',
                  '#3333cc',
                  '#000099',
                  '#009999',
                  '#00cc00',
                  '#666633',
                  '#663300',
                  '#993300',
                  '#2c3e50',
                  '#ff0000',
                  '#001a00',
                  '#660022',
                  '#cc2900',
                  '#95a5a6',
                  '#f39c12',
                  '#d35400',
                  '#c0392b',
                  '#bdc3c7',
                  '#7f8c8d',
               ]
               // 获取随机背景颜色
               let avatarColor = colors[Math.floor(Math.random() * colors.length)]

               //设置头像内部字体
               var fontWeight = 'normal'
               //设置头像内部文字大小
               var fontSize = 16
               let canvas = document.querySelector('canvas')
               let oCtx = canvas.getContext('2d')
               canvas.width = 40 // 宽
               canvas.height = 40 //高
               oCtx.fillStyle = avatarColor //设置背景颜色
               oCtx.fillRect(0, 0, canvas.width, canvas.height)
               oCtx.fillStyle = '#fff' // 设置字体颜色
               oCtx.font = fontWeight + ' ' + fontSize + 'px sans-serif'
               // 设置对其方式
               oCtx.textBaseline = 'middle'
               oCtx.textAlign = 'center'
               let textMetrics = oCtx.measureText(nickname)
               let actualBoundingBoxDescent = textMetrics.actualBoundingBoxDescent
               oCtx.fillText(nickname, canvas.width / 2, (canvas.height + actualBoundingBoxDescent) / 2)
               let dataURL = canvas.toDataURL('image/jpeg', 0.6)
               let blob = dataURLtoFile(dataURL, 'image/jpeg') // 转为blob格式
               let fileOfBlob = new File([blob], '测试' + '.jpg') // 转为file格式
               console.log(fileOfBlob)
               const myform = new FormData()
               myform.append('files', fileOfBlob)
               myform.append('type', 1)
               // 上传图片接口
               await getUploadImgUrl(myform).then((res) => {
                  // 返回图片链接
                  this.ruleForm.photoSrc = res.data[0]
               })
            }
            // 校验全部通过，提交 (验证成功)
            console.log(this.ruleForm.roleList)
            await editUser(this.fromFlag, this.ruleForm).then((res) => {
               if (res.state == '2000') {
                  this.$refs.table.refresh(false)
                  this.visible = false
                  this.fileList = []
                  this.roleList = []
                  this.$notification.success({
                     message: '提示',
                     description: res.message,
                  })
               } else {
                  this.$notification.success({
                     message: '提示',
                     description: res.message,
                  })
               }
            })
         })
      },
      // 点击表单关闭按钮,清空上传图片列表
      onClose() {
         this.fileList = []
         this.defaultRoleList = []
         this.visible = false
      },
      // 复选框选中触发事件
      onSelectChange(selectedRowKeys, selectedRows) {
         // console.log(selectedRowKeys)
         // console.log(selectedRows)
         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
         // 保存图片地址,批量删除用
         this.photoSrcList = []
         selectedRows.forEach((item, index) => {
            this.photoSrcList.push(item.photoSrc)
         })
      },

      // 点击行事件 (未完成)
      setRow(record) {
         return {
            on: {
               click: () => {
                  // console.log('点击行')
                  let flag = false
                  let keys = []
                  keys = this.selectedRowKeys
                  if (keys.indexOf(record.id) >= 0) {
                     flag = true
                  }
                  if (flag) {
                     keys.splice(
                        keys.findIndex((item) => item === record.id),
                        1
                     )
                     this.selectedRows.splice(
                        this.selectedRows.findIndex((item) => item === record.id),
                        1
                     )
                  } else {
                     keys.push(record.id)
                     this.selectedRows.push(record)
                  }
                  // console.log(this.selectedRowKeys)
                  // console.log(this.selectedRows)
               },
               // 右键菜单
               contextmenu: (e) => {
                  // console.log(e)
                  e.preventDefault()
                  this.menuVisible = true
                  this.menuStyle.top = e.clientY + 'px'
                  this.menuStyle.left = e.clientX + 'px'
                  document.addEventListener('click', this.cancelClick)
               },
               //取消右键菜单
               cancelClick() {
                  this.menuVisible = false
                  document.body.removeEventListener('click', this.cancelClick)
               },
            },
         }
      },
   },
   watch: {
      // 去掉表单验证信息二次打开残留
      visible(val, newVal) {
         //监听的是控制模态框显示或隐藏开关的布尔值
         // 监视dialog状态（打开、关闭）
         if (val) {
            try {
               this.$refs['ruleForm'].clearValidate() // 重置编辑表单,移出验证
               // ruleForm 为ref指向的表单
            } catch (e) {}
         }
      },
   },
}
</script>
<style lang="less" scoped>
#UserAdmin {
   /* you can make up upload button and sample style by using stylesheets */
   .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
   }

   .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
   }
}
// 头像
.ant-upload-preview {
   position: relative;
   width: 100%;
   max-width: 180px;
   box-shadow: 0 0 4px #ccc;

   .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.2);
   }
   .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
         opacity: 1;
      }

      i {
         font-size: 2rem;
         position: absolute;
         top: 50%;
         left: 50%;
         margin-left: -1rem;
         margin-top: -1rem;
         color: #d6d6d6;
      }
   }

   img,
   .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      overflow: hidden;
   }
}
</style>
