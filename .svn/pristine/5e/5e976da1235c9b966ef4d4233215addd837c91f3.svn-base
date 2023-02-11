<template>
   <div id="UserAdmin">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="权限名称">
                           <a-input v-model="queryCondition.powerName" placeholder="" />
                        </a-form-item>
                     </a-col>

                     <a-col :md="8 || 24" :sm="24">
                        <a-button type="primary" @click="getListByName(true)">查询</a-button>
                        <a-button
                           style="margin-left: 8px"
                           @click="getListByName(false)"
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
            <template>
               <a-table :columns="columns" :data-source="loadData" :row-selection="rowSelection" childrenColumnName="childrens" rowKey="id" >
                   <span slot="serial" slot-scope="text, record, index">
                    {{ index + 1 }}
                  </span>
                   <span slot="action" slot-scope="text, record">
                      <a  @click="handleEdit(record)" v-if="$store.getters.roles.authority.includes(CURD.update)">修改</a>
                      <a-divider type="vertical" />
                      <a @click="handleDel(record)" v-if="$store.getters.roles.authority.includes(CURD.delete)">删除</a>
                   </span>
               </a-table>
            </template>
            <!-- <s-table
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
                     <a @click="handleDel(record)" v-if="$store.getters.roles.authority.includes(CURD.delete)">删除</a>
                  </template>
               </span>
            </s-table> -->
            <!-- form表单 -->
            <div>
               <a-drawer
                  :title="!fromFlag ? '添加权限' : '修改权限'"
                  :width="720"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="handleCancel"
               >
                  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
                     <a-form-model-item has-feedback label="权限名称" prop="powerName">
                        <a-input v-model="ruleForm.powerName" autocomplete="off" placeholder="请输入名称"/>
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="权限编码" prop="powerId">
                        <a-input v-model="ruleForm.powerId" autocomplete="off"  placeholder="请输入编码" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="路由集合" prop="routeList">
                        <a-tree-select
                           v-model="treeValue"
                           style="width: 100%"
                           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                           :tree-data="treeData"
                           :replace-fields="{ children: 'children', key: 'id', value: 'routeId', title: 'title' }"
                           placeholder="选择对应的名字,增删改查不需要选择"
                           allowClear
                           :getPopupContainer="
                              (triggerNode) => {
                                 return triggerNode.parentNode || document.body
                              }
                           "
                           @change="onChangeTreeSelect"
                        >
                           <!-- <span v-if="key == '4'" slot="title" slot-scope="{ key, value }" style="color: #08c">
                              Child Node1 {{ value }}
                           </span> -->
                        </a-tree-select>
                     </a-form-model-item>

                     <a-form-model-item has-feedback label="权限父级" prop="powerList">
                        <a-tree-select
                           v-model="powerTreeValue"
                           style="width: 100%"
                           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                           :tree-data="powerTreeData"
                           :replace-fields="{ children: 'childrens', key: 'id', value: 'id', title: 'powerName' }"
                           placeholder="请选择父级(一级权限不需要上传)"
                           allowClear
                           :getPopupContainer="
                              (triggerNode) => {
                                 return triggerNode.parentNode || document.body
                              }
                           "
                           @change="onChangePowerTreeSelect"
                        >
                           <!-- <span v-if="key == '4'" slot="title" slot-scope="{ key, value }" style="color: #08c">
                              Child Node1 {{ value }}
                           </span> -->
                        </a-tree-select>
                     </a-form-model-item>
                     <!-- <a-form-model-item has-feedback label="操作" prop="operation" >
                        <a-input v-model="ruleForm.operation" autocomplete="off" />
                     </a-form-model-item> -->
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
// 增删改查接口
import { getPowerList, getDeletePower, getEditPower, getRoute, getPower } from '@/api/system'
// 路由列表树组件
import { TreeSelect } from 'ant-design-vue'

// import { validateId } from '@/utils/common'
const SHOW_PARENT = TreeSelect.SHOW_ALL // 选中所有子节点,只渲染父节点名称,如果取消,点哪个渲染哪个
// 表头
const columns = [
   {
      title: '编号',
      scopedSlots: { customRender: 'serial' },
   },
   {
      title: '权限名称',
      dataIndex: 'powerName',
   },

   // {
   //    title: '操作',
   //    dataIndex: 'operation',
   // },
   {
      title: '添加时间',
      dataIndex: 'addTime',
      ellipsis: true,
   },
   {
      title: '修改时间',
      dataIndex: 'editTime',
   },
   {
      title: '操作',
      dataIndex: 'action',
      key: 'operation',
      width: '150px',
      scopedSlots: { customRender: 'action' },
   },
];


export default {
   name: 'RoleAdmin',
   components: {
      STable, //表格组件
   },
   data() {
      this.columns = columns

      // 权限编码验证
      let validateId = (rule, value, callback) => {
         let that = this //保存this
         var flag = true //定义状态,如果为true,验证通过,false为已存在
         if (value === '') {
            callback(new Error('请输入powerId'))
         } else {
            // 递归判断树列表中存不存在,如果存在,验证不通过
            if (flag && value != this.powerIdFlag) {
               function dis(tree) {
                  tree.forEach((item) => {
                     if (value == item.powerId && flag) {
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
               dis(that.powerTreeData)
            }
            if (!flag) {
               callback(new Error('routerId已存在'))
            } else {
               callback()
            }
         }
      }

      return {

         data:[
               {
               key: 1,
               name: 'John Brown sr.',
               age: 60,
               address: 'New York No. 1 Lake Park',
               children: [
                  {
                  key: 11,
                  name: 'John Brown',
                  age: 42,
                  address: 'New York No. 2 Lake Park',
                  },
                  {
                  key: 12,
                  name: 'John Brown jr.',
                  age: 30,
                  address: 'New York No. 3 Lake Park',
                  children: [
                     {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                     },
                  ],
                  },
                  {
                  key: 13,
                  name: 'Jim Green sr.',
                  age: 72,
                  address: 'London No. 1 Lake Park',
                  children: [
                     {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                        {
                           key: 1311,
                           name: 'Jim Green jr.',
                           age: 25,
                           address: 'London No. 3 Lake Park',
                        },
                        {
                           key: 1312,
                           name: 'Jimmy Green sr.',
                           age: 18,
                           address: 'London No. 4 Lake Park',
                        },
                        ],
                     },
                  ],
                  },
               ],
            },
            {
               key: 2,
               name: 'Joe Black',
               age: 32,
               address: 'Sidney No. 1 Lake Park',
            },
         ],
         // 路由树
         treeData: [],
         // 权限树
         powerTreeData: [],
         // 权限树双向绑定
         treeValue: undefined,
         powerTreeValue: undefined,
         // 路由树选择方式
         SHOW_PARENT,
         // 右键菜单显示/隐藏
         menuVisible: false,
         // 表单显示/隐藏
         visible: false,
         // 修改/添加 判断值
         fromFlag: true,
         // 修改时取消选中项的编码重复验证
         powerIdFlag: '',
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
            create: 1055,
            update: 1056,
            read: 1057,
            delete: 1058,
         },
         //  表单
         ruleForm: {
            //表单数据
            id: '',
            powerName: '', //权限名称
            routeList: [], //路由列表
            operation: '',
            addTime: '',
            editTime: '',
            pId: '',
            powerId: '',
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
            // ]
            powerId: [{ validator: validateId, required: true, trigger: 'blur' }],
         },
         // 栅格布局
         layout: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
         },
         // 查询参数
         queryCondition: {
            powerName:"",
         },
         // 分页参数
         pageFrom: {
            // pageNum: 1, //第几次请求
            // pageSize: 12, //每页显示几条
            // totalPages: 0, //请求总次数
            // totalSize: 0, //所有数据数量
         },
         // 表格数据
         loadData: [],
         // 表格选中行的ID
         selectedRowKeys: [],
         //表格选中行的所有数据
         selectedRows: [],
      }
   },
   mounted(){
      this.loadingData();
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

      // 路由树选择事件(除一级菜单外,添加权限的时候需要找到对应的路由id)
      onChangeTreeSelect(value) {
         this.ruleForm.routeList = value
      },
      // 权限树选择事件(选择父级,选择pId)
      onChangePowerTreeSelect(value) {
         this.ruleForm.pId = value
      },
      //根据名称查询数据
      getListByName(value) {
         if(this.queryCondition.powerName && value){
           this.loadData = this.rebuildData(this.queryCondition.powerName,this.loadData);
         }else{
            this.queryCondition.powerName = '';
            this.loadingData();
         }
      },
      //处理树的数据
      rebuildData(value, arr){
         let newarr = [];
         arr.forEach(element => {
         if (element.powerName.indexOf(value) > -1) {
            newarr.push(element);
         } else {
            if (element.childrens && element.childrens.length > 0) {
               const ab = this.rebuildData(value, element.childrens);
               const obj = {
               ...element,
               childrens: ab
               };
               if (ab && ab.length>0) {
               newarr.push(obj);
               }
            }
         }
         });
         return newarr;
      },

      async loadingData(){
      // 判断是否添加表格操作列
         if (
           !this.$store.getters.roles.authority.includes(this.CURD.update) &&
           !this.$store.getters.roles.authority.includes(this.CURD.delete)
            ) {
               this.columns.pop()
            }
            return getPower()
            .then((res) => {
              if (res.state == 2000) {
                 res.data.map(item=>{

                 })
                this.loadData = res.data
               }
             })
            .catch((err) => {
              alert(err)
            })
      },

      // 新建权限
      async handleAdd(record) {
         this.powerIdFlag = ''
         this.fromFlag = false
         this.ruleForm.powerName = ''
         this.ruleForm.routeList = ''
         this.ruleForm.pId = ''
         this.ruleForm.operation = ''
         this.ruleForm.addTime = ''
         this.ruleForm.editTime = ''
         this.ruleForm.powerId = ''
         this.visible = true
         this.treeValue = undefined
         this.powerTreeValue = undefined
         await getRoute()
         .then((res) => {
               this.treeData = res.data
         })
         await getPower()
         .then((res) => {
            this.powerTreeData = res.data
         })
      },

      // 修改
      async handleEdit(record) {
         this.powerIdFlag = record.powerId
         this.fromFlag = true
         this.visible = true
         this.ruleForm.id = record.id
         this.ruleForm.powerName = record.powerName
         this.ruleForm.powerId = record.powerId
         this.ruleForm.operation = record.operation
         this.ruleForm.addTime = record.addTime
         this.ruleForm.editTime = record.editTime
         if(record.routeList==''){
            this.treeValue=[]
         }else{
            this.treeValue = record.routeList
         }
         this.powerTreeValue = record.pId
         this.ruleForm.pId = record.pId
         this.ruleForm.routeList = record.routeList
         await getRoute().then((res) => {
            this.treeData = res.data
         })
         await getPower().then((res) => {
            this.powerTreeData = res.data
         })
      },

      // 删除
      async handleDel(record) {
         // 定义数组,存放选中的id和当前节点的所有子集id
         console.log(record.id)
         let delListArr = []
         // 获取权限列表数据,用于查找所有id
         await getPower().then((res) => {
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
               return getDeletePower({ idArr: delListArr.join(',') }).then((res) => {
                  that.loadingData();
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
         //          return getDeletePower({ idArr: that.selectedRowKeys.join(',') }).then((res) => {
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
            this.treeValue = []
            this.powerTreeValue = []
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
            }
            // 校验全部通过，提交 (验证成功)
            await getEditPower(this.fromFlag, this.ruleForm).then((res) => {
               if (res.state == 2000) {
                  this.loadingData();
                  this.visible = false
                  this.powerIdFlag = ''
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
         this.treeValue = ''
         this.powerTreeValue = ''
         this.ruleForm.powerId = ''
         this.powerIdFlag = ''
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

