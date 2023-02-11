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
            <!-- 新建角色 -->
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
               :alert="{
                  show: true,
                  clear: () => {
                     this.selectedRowKeys = []
                  },
               }"
               :rowSelection="rowSelection"
               bordered
               :customRow="setRow"
            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>
               <span slot="action" slot-scope="text, record">
                  <template>
                     <a @click="handleEdit(record)" v-if="$store.getters.roles.authority.includes(CURD.update)">修改</a>
                     <a-divider type="vertical" />
                     <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                        <a v-if="$store.getters.roles.authority.includes(CURD.delete)">删除</a>
                     </a-popconfirm>
                  </template>
               </span>
            </s-table>
            <!-- form表单 -->
            <div>
               <a-drawer
                  :title="!fromFlag ? '添加角色' : '修改角色'"
                  :width="720"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="handleCancel"
               >
                  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
                     <a-form-model-item has-feedback label="id" prop="id" v-if="fromFlag">
                        <a-input v-model="ruleForm.id" autocomplete="off" :disabled="true" />
                        <!-- <a-input v-model="ruleForm.id" autocomplete="off" v-else/> -->
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="角色名称" prop="roleName">
                        <a-input v-model="ruleForm.roleName" autocomplete="off"  placeholder="请输入名称" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="角色编码" prop="roleId">
                        <a-input v-model="ruleForm.roleId" autocomplete="off"  placeholder="请输入编码" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="优先级" prop="priority">
                        <a-input v-model="ruleForm.priority" autocomplete="off"  placeholder="暂时不需要输入" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="描述" prop="describe">
                        <a-input v-model="ruleForm.describe" autocomplete="off"  placeholder="角色特点" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="权限列表" prop="powerList">
                        <a-tree-select
                           v-model="oldPowerList"
                           style="width: 100%"
                           :tree-data="treeData"
                           tree-checkable
                           :show-checked-strategy="SHOW_PARENT"
                           search-placeholder="Pleaase select"
                           :replace-fields="{ children: 'childrens', key: 'id', value: 'id', title: 'powerName' }"
                           @change="onChangeTreeSelect"
                           placeholder="请分配权限"
                           :getPopupContainer="
                              (triggerNode) => {
                                 return triggerNode.parentNode || document.body
                              }
                           "
                           allowClear
                        />
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
// 引入表格组件 和
import { STable } from '@/components'
// 引入调用接口方法
// import { getRoleList } from '@/api/manage'
// 增删改查接口
import { getRolesList, getUpdateRoleInfo, getDeleteRole, getPower, getRole } from '@/api/system'

// 权限列表树中用
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_ALL // 选中所有子节点,只渲染父节点名称,如果取消,点哪个渲染哪个
// 表头
const columns = [
   {
      title: '#',
      scopedSlots: { customRender: 'serial' },
   },

   {
      title: '角色名称',
      dataIndex: 'roleName',
   },

   {
      title: '权限列表',
      dataIndex: 'powerList',
      ellipsis: true,
   },
   {
      title: '描述',
      dataIndex: 'describe',
      ellipsis: true,
   },
   {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' },
   },
]

export default {
   name: 'RoleAdmin',
   components: {
      STable, //表格组件
   },
   data() {
      this.columns = columns

      // 编码验证
      let validateId = async (rule, value, callback) => {
         let that = this //保存this
         let roleTreeDate = [] // 保存权限列表,用以比对新输入的roleId是否存在
         // 获取角色列表树
         await getRole().then((res) => {
            roleTreeDate = res.data
         })
         var flag = true //定义状态,如果为true,验证通过,false为已存在
         if (value === '') {
            callback(new Error('请输入roleId'))
         } else {
            // 递归判断树列表中存不存在,如果存在,验证不通过
            if (flag && value != this.roleIdFlag) {
               function dis(tree) {
                  tree.forEach((item) => {
                     if (value == item.roleId && flag) {
                        // 如果相等,状态改为false并提示存在,本次验证不通过
                        flag = false
                        return
                     } else {
                        if (item.childrens && item.childrens.length > 0 && flag) {
                           // 如果不相等,判断有没有子集,继续下一次找,直到找不到相等的为止
                           dis(item.childrens)
                        } else {
                           // 验证通过
                           return
                        }
                     }
                  })
               }
               dis(roleTreeDate)
            }
            if (!flag) {
               callback(new Error('roleId已存在'))
            } else {
               callback()
            }
         }
      }

      return {
         // 权限树
         treeData: [],
         // 权限树选择方式
         SHOW_PARENT,
         // 保存选中的节点,并把它的父节点存进去,用于提交
         newValue: [],
         // 点击修改时默认选中项
         oldPowerList: [],
         // 右键菜单显示/隐藏
         menuVisible: false,
         // 表单显示/隐藏
         visible: false,
         // 修改/添加 判断值
         fromFlag: true,
         // 修改时取消选中项的编码重复验证
         roleIdFlag: '',
         // 右键菜单样式
         menuStyle: {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1,
            borderRadius: '5px',
            border: '1px solid #eee',
         },
         CURD: {
            create: 1051,
            update: 1052,
            read: 1053,
            delete: 1054,
         },
         //  表单
         ruleForm: {
            //表单数据
            id: '',
            roleName: '', //角色名称
            describe: '', //描述
            powerList: [], //权限id
            roleId: '', // 编码
            priority: '', //优先级
         },

         // 表单验证
         rules: {
            // id: [
            //    { required: true, message: '', trigger: 'blur' },
            // ],
            // roleName: [
            //    { required: true, message: '请输入昵称', trigger: 'blur' },
            //    { min: 2, max: 10, message: '长度2~10', trigger: 'blur' },
            //    { whitespace: true, message: '不能输入空格', trigger: 'blur' },
            // ],
            // describe: [
            //    { required: true, message: '请输入描述', trigger: 'blur' },
            //    { min: 2, max: 10, message: '长度2~10', trigger: 'blur' },
            // ],
            // powerList: [
            //    { required: true, message: '', trigger: 'blur' },
            // ],
            roleId: [{ validator: validateId, required: true, trigger: 'blur' }],
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
            if (
               !this.$store.getters.roles.authority.includes(this.CURD.update) &&
               !this.$store.getters.roles.authority.includes(this.CURD.delete)
            ) {
               this.columns.pop()
            }
            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            return getRolesList(requestParameters)
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
      // 权限列表树选中的ID
      onChangeTreeSelect(value, node, extra) {
         this.ruleForm.powerList = [...value]
      },
      // 新建用户
      async handleAdd(record) {
         this.roleIdFlag = ''
         this.oldPowerList = []
         this.fromFlag = false
         this.ruleForm.roleName = ''
         this.ruleForm.roleId = ''
         this.ruleForm.describe = ''
         this.ruleForm.powerList = []
         this.visible = true
         await getPower().then((res) => {
            this.treeData = res.data
         })
      },
      // 修改
      async handleEdit(record) {
         this.roleIdFlag = record.roleId
         this.ruleForm.roleId = record.roleId
         this.fromFlag = true
         this.visible = true
         this.ruleForm.id = record.id
         this.ruleForm.roleName = record.roleName
         this.ruleForm.describe = record.describe
         await getPower().then((res) => {
            this.treeData = res.data
         })
         console.log(record.powerList)
         // 把选中的权限列表转换为数组,并保存进回显数组里
         if (record.powerList.length > 0) {
            this.oldPowerList = record.powerList.split(',').map((item) => {
               return item - 0
            })
         }
         // console.log(this.oldPowerList)
         // 保存this到that,在递归函数中使用
         let that = this
         // 创建转换递归函数,处理选中powerId,全部转换为对应的id
         function replaceId(tree) {
            tree.forEach((item) => {
               if (that.oldPowerList.indexOf(item.powerId) != -1) {
                  that.oldPowerList.splice(that.oldPowerList.indexOf(item.powerId), 1, item.id)
                  replaceId(that.treeData)
               } else {
                  if (item.childrens && item.childrens.length > 0) {
                     replaceId(item.childrens)
                  }
               }
            })
         }

         // 启动转换id的递归函数
         replaceId(this.treeData)
         // console.log(this.oldPowerList)

         // 创建递归函数,处理列表树数据,删除所有的父节点ID,提交的时候再添加
         function isPid(tree) {
            for (let i = 0; i < tree.length; i++) {
               // 判断选中的权限列表里有没有pid
               if (that.oldPowerList.indexOf(tree[i].pId) != -1) {
                  // 如果有pid,删除这个pid,并重新走一遍循环
                  that.oldPowerList.splice(that.oldPowerList.indexOf(tree[i].pId), 1)
                  isPid(that.treeData)
               } else {
                  // 如果选中权限列表中没有当前数据的pid,就判断当前数据有没有子集
                  if (tree[i].childrens && tree[i].childrens.length > 0) {
                     // 如果有子集,调用递归函数
                     isPid(tree[i].childrens)
                  } else {
                     // 其他情况..跳出本次循环
                     continue
                  }
               }
            }
         }
         // 启动删除父id的递归函数
         isPid(this.treeData)
         console.log(this.oldPowerList)
         this.ruleForm.powerList = this.oldPowerList
      },
      // 删除
      handleDel(record) {
         return getDeleteRole({ idArr: record.id }).then((res) => {
            this.$refs.table.refresh(false)
            this.$notification.success({
               message: '提示',
               description: res.message,
            })
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
         //          return getDeleteRole({ idArr: that.selectedRowKeys.join(',') }).then((res) => {
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
         this.$refs.ruleForm.validate(async (valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            console.log(valid)
            if (!valid) {
               return false
            }

            // 保存this,再递归函数中使用
            let that = this
            // 递归函数,用于添加选中权限的父级
            function pushParentId(tree) {
               for (let i = 0; i < tree.length; i++) {
                  // 对比选中列表,如果存在当前循环到的id,并且不存在它的父级Id,就把它的父级添加进去,并重新开启循环
                  if (
                     that.ruleForm.powerList.indexOf(tree[i].id) != -1 &&
                     that.ruleForm.powerList.indexOf(tree[i].pId) == -1 &&
                     tree[i].pId
                  ) {
                     that.ruleForm.powerList.push(tree[i].pId) //添加父级Id
                     pushParentId(that.treeData) //重新开启循环
                  } else if (
                     that.ruleForm.powerList.indexOf(tree[i].id) == -1 &&
                     tree[i].childrens &&
                     tree[i].childrens.length > 0
                  ) {
                     //如果选中列表不存在当前循环到的id,并且当前数据含有子集,使用递归函数,继续循环下一层
                     pushParentId(tree[i].childrens)
                  } else {
                     // 其他情况...不满足条件就跳出本次循环
                     continue
                  }
               }
            }
            // 启动添加父id的递归函数
            pushParentId(this.treeData)

            // console.log(that.ruleForm.powerList)

            // 处理选中id,全部转换为对应的powerId,创建递归函数
            function replacePowerId(tree) {
               tree.forEach((item) => {
                  // 如果存在id
                  if (that.ruleForm.powerList.indexOf(item.id) != -1) {
                     // 把所有id替换为对应的powerId,并重新开始循环
                     that.ruleForm.powerList.splice(that.ruleForm.powerList.indexOf(item.id), 1, item.powerId)
                     replacePowerId(that.treeData)
                  } else {
                     // 如果不存在当前id,就判断是否有子节点,如果有,调用递归函数
                     if (item.childrens && item.childrens.length > 0) {
                        replacePowerId(item.childrens)
                     }
                  }
               })
            }
            // 启动替换id的递归函数
            replacePowerId(this.treeData)
            console.log(this.ruleForm.powerList)
            // 处理选中权限列表为逗号分割的字符串
            this.ruleForm.powerList = this.ruleForm.powerList.join(',')

            // 校验全部通过，提交 (验证成功)
            await getUpdateRoleInfo(this.fromFlag, this.ruleForm).then((res) => {
               if (res.state == '2000') {
                  this.$refs.table.refresh(false)
                  this.visible = false
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
            console.log(this.ruleForm.powerList)

            this.oldPowerList = []
            this.roleIdFlag = ''
         })
      },

      // 对话框关闭按钮
      handleCancel() {
         this.roleIdFlag = ''
         this.oldPowerList = []
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
               this.$refs['ruleForm'].clearValidate() // 重置编辑表单
               // ruleForm 为ref指向的表单
            } catch (e) {}
         }
      },
   },
}
</script>

