<template>
   <div id="UserAdmin">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="账号">
                           <a-input v-model="queryCondition.userId" placeholder="" />
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
               bordered
               :customRow="setRow"
            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>
               <span slot="action" slot-scope="text, record">
                  <template>
                     <a @click="handleEdit(record)"  v-if="$store.getters.roles.authority.includes(CURD.update)">修改</a>
                     <a-divider type="vertical" />
                     <a @click="handleDel(record)"  v-if="$store.getters.roles.authority.includes(CURD.delete)">删除</a>
                  </template>
               </span>
            </s-table>

            <!-- form表单 -->
            <div>
               <a-drawer
                  :title="!fromFlag ? '添加路由' : '修改路由'"
                  :width="720"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="handleCancel"
               >
                  <a-form-model ref="routerForm" :model="routerForm" :rules="rules" v-bind="layout">
                     <!-- <a-form-model-item has-feedback label="路由ID" prop="id" v-if="fromFlag">
                        <a-input v-model="routerForm.id" autocomplete="off" :disabled="true" />
                     </a-form-model-item> -->
                     <a-form-model-item has-feedback label="路由名称" prop="title">
                        <a-input v-model="routerForm.title" autocomplete="off" placeholder="请输入名字" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="路由name" prop="name">
                        <a-input v-model="routerForm.name" autocomplete="off" placeholder="请输入name" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="路由编码" prop="routeId">
                        <a-input v-model="routerForm.routeId" autocomplete="off" placeholder="请输入编码(1001)" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="父级路由" prop="pId">
                        <a-tree-select
                           v-model="treeValue"
                           style="width: 100%"
                           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                           :tree-data="treeData"
                           :replace-fields="{ children: 'children', key: 'id', value: 'id', title: 'title' }"
                           placeholder="请选择父级路由.一级路由不需要选择"
                           @change="onChangeTreeSelect"
                           :getPopupContainer="
                              (triggerNode) => {
                                 return triggerNode.parentNode || document.body
                              }
                           "
                        >
                           <!-- <span v-if="key == '4'" slot="title" slot-scope="{ key, value }" style="color: #08c">
                              Child Node1 {{ value }}
                           </span> -->
                           <!-- <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0"> </a-tree-select-node> -->
                        </a-tree-select>
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="图标配置" prop="icon">
                        <a-input v-model="routerForm.icon" autocomplete="off" placeholder="请输入图标" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="跳转路径" prop="path">
                        <a-input v-model="routerForm.path" autocomplete="off" placeholder="请输入path" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="组件路径" prop="component">
                        <a-input v-model="routerForm.component" autocomplete="off" placeholder="请输入component" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="路由状态" prop="type">
                        <a-input v-model="routerForm.type" autocomplete="off" placeholder="暂时为1" />
                     </a-form-model-item>

                     <template slot="footer">
                        <a-button type="primary">确定</a-button>
                     </template>
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
                     <a-button :style="{ marginRight: '8px' }" @click="handleCancel"> 取消 </a-button>
                     <a-button type="primary" @click="handleOk"> 提交 </a-button>
                  </div>
               </a-drawer>
            </div>
         </a-card>
      </page-header-wrapper>
   </div>
</template>

<script>
import moment from 'moment'
// 引入表格组件
import { STable } from '@/components'
// 引入调用接口方法
import { getRoleList } from '@/api/manage'
// 增删改查接口
import { getRouterList, editRouter, getDeleteRoute, getRoute } from '@/api/system'
// 路由列表树中用
import { TreeSelect } from 'ant-design-vue'

// import { validateId } from '@/utils/common'
const SHOW_PARENT = TreeSelect.SHOW_ALL // 选中所有子节点,只渲染父节点名称,如果取消,点哪个渲染哪个

// 表头
const columns = [
   {
      title: '#',
      scopedSlots: { customRender: 'serial' },
   },
   // {
   //    title: '路由ID',
   //    dataIndex: 'id',
   // },
   {
      title: '路由名',
      dataIndex: 'title',
   },
   // {
   //    title: '图标配置',
   //    dataIndex: 'icon',
   // },
   {
      title: '跳转路径',
      dataIndex: 'path',
   },

   // {
   //    title: '路由路径',
   //    dataIndex: 'component',
   // },
   {
      title: '类型',
      dataIndex: 'type',
   },
   // {
   //    title: 'lable值',
   //    dataIndex: 'label',
   // },
   // {
   //    title: '父级',
   //    dataIndex: 'pId',
   // },
   {
      title: '添加时间',
      dataIndex: 'addTime',
   },
   {
      title: '修改时间',
      dataIndex: 'editTime',
   },
   {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' },
   },
]

export default {
   name: 'TableList',
   components: {
      STable, //表格组件
   },
   data() {
      this.columns = columns
      // 路由编码验证
      let validateId = (rule, value, callback) => {
         let that = this //保存this
         var flag = true //定义状态,如果为true,验证通过,false为已存在
         if (value === '') {
            callback(new Error('请输入routerId'))
         } else {
            // 递归判断树列表中存不存在,如果存在,验证不通过
            if (flag && value != this.routerIdFlag) {
               function dis(tree) {
                  tree.forEach((item) => {
                     if (value == item.routeId && flag) {
                        // 如果相等,状态改为false并提示存在,本次验证不通过
                        flag = false
                        return
                     } else {
                        if (item.children && item.children.length > 0 && flag) {
                           // 如果不相等,判断有没有子集,继续下一次找,直到找不到相等的为止
                           dis(item.children)
                        } else {
                           // 验证通过
                           return
                        }
                     }
                  })
               }
               dis(that.treeData)
            }
            if (!flag) {
               callback(new Error('routerId已存在'))
            } else {
               callback()
            }
         }
      }

      return {
         // 权限树
         treeData: [],
         // 权限树双向绑定
         treeValue: undefined,
         // 路由树选择方式
         SHOW_PARENT,
         // 右键菜单显示/隐藏
         menuVisible: false,
         // 表单显示/隐藏
         visible: false,
         // 修改/添加 判断值
         fromFlag: true,
         // 修改时取消选中项的编码重复验证
         routerIdFlag: '',
         // 右键菜单样式
         menuStyle: {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1,
            borderRadius: '5px',
            border: '1px solid #eee',
         },
         // 增删改查按钮是否显示
         CURD: {
            create: 1039,
            update: 1040,
            read: 1041,
            delete: 1042,
         },
         //  表单
         routerForm: {
            //表单数据
            routeId: '',
            name: '',
            icon: '',
            path: '',
            component: '',
            type: '',
            title: '',
            pId: '',
            meta: '',
         },
         // 表单验证
         rules: {
            // userId: [
            //    { required: true, message: '请输入账号', trigger: 'blur' },
            //    { whitespace: true, message: '输入有误', trigger: 'blur' },
            //    { pattern: /^1[357689]\d{9}$/gi, message: '输入有误', trigger: 'blur' },
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
            routeId: [{ validator: validateId, required: true, trigger: 'blur' }],
         },
         // 栅格布局
         layout: {
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
            // pageSize: 12, //每页显示几条
            // totalPages: 0, //请求总次数
            // totalSize: 0, //所有数据数量
         },
         // 加载数据方法 必须为 Promise 对象
         loadData: (parameter) => {
            // 判断是否增加表格操作列
            if (
               !this.$store.getters.roles.authority.includes(this.CURD.update) &&
               !this.$store.getters.roles.authority.includes(this.CURD.delete)
            ) {
               this.columns.pop()
            }
            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            return getRouterList(requestParameters, this.queryCondition)
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
                        element.addTime = this.$renderTime(element.addTime)
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
      // 树选择事件
      onChangeTreeSelect(value) {
         console.log(value)
         this.routerForm.pId = value
      },
      // 新建路由
      async handleAdd(record) {
         this.routerIdFlag = ''
         this.fromFlag = false
         this.routerForm.id = ''
         this.routerForm.name = ''
         this.routerForm.icon = ''
         this.routerForm.path = ''
         this.routerForm.component = ''
         this.routerForm.type = ''
         this.routerForm.title = ''
         this.routerForm.pId = ''
         this.routerForm.routeId = ''
         this.routerForm.meta = {}
         this.visible = true
         this.treeValue = []
         this.treeDtae = []
         await getRoute().then((res) => {
            this.treeData = res.data
            this.treeData.unshift({ id: 0, title: '新建路由' })
         })
      },
      // 修改
      async handleEdit(record) {
         this.routerIdFlag = record.routeId

         this.routerForm.id = record.id
         this.routerForm.name = record.name
         this.routerForm.icon = record.icon
         this.routerForm.path = record.path
         this.routerForm.component = record.component
         this.routerForm.type = record.type
         this.routerForm.title = record.title
         this.routerForm.pId = record.pId
         this.routerForm.meta = record.meta
         this.routerForm.routeId = record.routeId
         this.treeValue = record.pId
         this.treeData = []
         await getRoute().then((res) => {
            this.treeData = res.data
            this.treeData.unshift({ id: 0, title: '新建路由' })
            this.fromFlag = true
            this.visible = true
         })
      },
      // 删除
      async handleDel(record) {
         // 定义数组,存放选中的id和当前节点的所有子集id
         console.log(record.id)
         let delListArr = []
         // 获取路由列表数据,用于查找所有id
         await getRoute().then((res) => {
            // 定义递归函数,对比所有子集id,直到找到当前选中id的为止
            function dis(tree, id) {
               // 循环每一层数据
               tree.forEach((item) => {
                  if (item.id == id) {
                     // 如果找到当前选中的id,再定义一个递归函数,用来找到此id下的所有子集id
                     function cunzai(item) {
                        if (item.children && item.children.length > 0) {
                           item.children.forEach((item_) => {
                              // 只要存在子集,就不停的往下找
                              delListArr.push(item_.id)
                              cunzai(item_)
                           })
                        } else {
                           return false
                        }
                     }
                     cunzai(item)
                  } else if (
                     tree.every((x) => {
                        return x.id != id
                     })
                  ) {
                     if (item.children && item.children.length > 0) {
                        // 如果当前层没有找到id,继续往下一层寻找
                        dis(item.children, id)
                     } else {
                        return
                     }
                  }
               })
            }
            dis(res.data, record.id)
            delListArr.push(record.id) // 找到所有子集id,并把当前选中的id存进去
         })
         // 调用删除接口,并给出警示
         var that = this
         that.$confirm({
            title: '警示',
            content: '此操作会同时删除所有子节点,确定要全部删除吗?',
            onOk() {
               return getDeleteRoute({ idArr: delListArr.join(',') }).then((res) => {
                  that.$refs.table.refresh(false)
                  that.$notification.success({
                     message: '提示',
                     description: res.message,
                  })
               })
            },
            onCancel() {
               console.log('取消删除')
            },
         })
      },
      // 批量删除
      delAll() {
         // if (this.selectedRowKeys.length > 0) {
         //    var that = this
         //    this.$confirm({
         //       title: '警示',
         //       content: '确定要全部删除吗?',
         //       onOk() {
         //          return getDeleteRoute({ idArr: that.selectedRowKeys.join(',') }).then((res) => {
         //             that.$refs.table.refresh(false)
         //             that.$notification.success({
         //                message: '提示',
         //                description: res.message,
         //             })
         //          })
         //       },
         //       onCancel() {
         //          console.log('取消删除')
         //       },
         //    })
         // }
      },
      // 提交
      handleOk(e) {
         this.$refs.routerForm.validate((valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
            }
            // 校验全部通过，提交 (验证成功)
            // {"title":"分步表单","keepAlive":true,"path":"/form/step-form","icon":"form","permission":["StepForm"]}
            // this.routerForm.meta={}
            let metaData = {}
            metaData.title = this.routerForm.title
            // metaData.keepAlive = true
            metaData.redirect = '/form / base - form'
            metaData.path = this.routerForm.path
            metaData.permission = [this.routerForm.name]
            this.routerForm.meta = JSON.stringify(metaData)
            console.log(this.routerForm)

            // 创建FormData表单,用于接口传参
            const myform = new FormData()
            myform.append('name', this.routerForm.name)
            myform.append('icon', this.routerForm.icon)
            myform.append('path', this.routerForm.path)
            myform.append('component', this.routerForm.component)
            myform.append('type', this.routerForm.type)
            myform.append('title', this.routerForm.title)
            myform.append('pId', this.routerForm.pId)
            myform.append('routeId', this.routerForm.routeId)
            myform.append('meta', this.routerForm.meta)
            myform.append('id', this.routerForm.id)

            return editRouter(this.fromFlag, myform).then((res) => {
               if (res.state == '2000') {
                  this.$refs.table.refresh(false)
                  this.visible = false
                  this.routerIdFlag = ''
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
      // 对话框关闭按钮
      handleCancel() {
         this.routerIdFlag = ''
         this.treeValue = []
         this.treeData = []
         this.visible = false
      },
      // 复选框选中触发事件
      onSelectChange(selectedRowKeys, selectedRows) {
         console.log(selectedRowKeys)
         console.log(selectedRows)
         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
      },
      //取消右键菜单
      cancelClick() {
         this.menuVisible = false
         document.body.removeEventListener('click', this.cancelClick)
      },

      // 点击行事件 (未完成)
      setRow(record) {
         return {
            on: {
               click: () => {
                  console.log('点击行')
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
                  console.log(e)
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
   watch: {
      // 去掉表单验证信息二次打开残留
      visible(val, newVal) {
         //监听的是控制模态框显示或隐藏开关的布尔值
         // 监视dialog状态（打开、关闭）
         if (val) {
            try {
               this.$refs['routerForm'].clearValidate() // 重置编辑表单
               // routerForm 为ref指向的表单
            } catch (e) {}
         }
      },
   },
}
</script>

