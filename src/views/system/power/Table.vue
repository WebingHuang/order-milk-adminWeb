<template>
   <div id="power">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="权限名称">
                           <a-input v-model="queryCondition.name" placeholder="" />
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



            <!-- 新建用户 -->
            <div class="table-operator" >
               <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
            </div>

            <!-- 表格 -->
           <a-table :columns="columns" :data-source="loadData" :row-selection="rowSelection" childrenColumnName="children" rowKey="id" >
                   <span slot="serial" slot-scope="text, record, index">
                    {{ index + 1 }}
                  </span>
                  <span slot="type" slot-scope="text">
                    <a-badge  status="success" :text="text | typeFilter" />
                  </span>

                   <span slot="action" slot-scope="text, record">
                      <a  @click="handleEdit(record)" >修改</a>
                      <a-divider type="vertical" />
                      <a @click="handleDel(record)" >删除</a>
                   </span>
           </a-table>

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
                     <a-form-model-item has-feedback label="权限名称" prop="powerName" :required="true">
                        <a-input v-model="ruleForm.powerName" autocomplete="off" placeholder="请输入名称"/>
                     </a-form-model-item>
                     <!-- <a-form-model-item has-feedback label="权限编码" prop="powerId">
                        <a-input v-model="ruleForm.powerId" autocomplete="off"  placeholder="请输入编码" />
                     </a-form-model-item> -->
                     <a-form-model-item has-feedback label="路由集合" prop="routeList" >
                        <a-tree-select
                           v-model="treeValue"
                           style="width: 100%"
                           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                           :tree-data="treeData"
                           :replace-fields="{ children: 'children', key: 'id', value: 'routeId', title: 'title' }"
                           placeholder="选择对应的目录 | 菜单 | 按钮"
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

                     <a-form-model-item has-feedback label="权限父级" prop="powerList" >
                        <a-tree-select

                           :value="''+powerTreeValue+''"
                           style="width: 100%"
                           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                           :tree-data="powerTreeData"
                           :replace-fields="{ children: 'children', key: 'id', value: 'id', title: 'powerName' }"
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
                     <a-form-model-item has-feedback label="类型" prop="type" :required="true">
                        <!-- <a-input v-model="routerForm.type" autocomplete="off" placeholder="暂时为1" /> -->

                         <a-select  :value="''+ruleForm.type+''" style="width: 120px" @change="typeChange" mode="default">
                          <a-select-option value="0" >
                            目录
                          </a-select-option>
                          <a-select-option value="1" >
                            菜单
                          </a-select-option>
                          <a-select-option value="2" >
                            按钮
                          </a-select-option>
                        </a-select>
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

// 引入表格组件
import { STable } from '@/components'
// 引入调用接口方法

// 增删改查接口
import {getPowerList , getRouterList, editRouter,EditPower, getDeleteRoute, removePower,getRoute , getPower,editMenuStatus } from '@/api/system'


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
      title: '权限名称',
      dataIndex: 'powerName',
      align: 'center',

   },
   // {
   //    title: '图标配置',
   //    dataIndex: 'icon',
   // },
  //  {
  //     title: '跳转路径',
  //     dataIndex: 'path',
  //  },

   // {
   //    title: '路由路径',
   //    dataIndex: 'component',
   // },
   {
      title: '类型',
      dataIndex: 'type',
      scopedSlots: { customRender: 'type' },
      align: 'center',

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
      title: '启用/停用',
      dataIndex: 'status',
      scopedSlots: { customRender: 'enable' },
      align: 'center',
   },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'operation',
      width: '150px',
      scopedSlots: { customRender: 'action' },
   }

]

const menuType ={
  0:{
    text: '目录',
  },
  1:{
    text: '菜单',
  },
  2:{
    text: '按钮',
  }
}



export default {
   name: 'power',
   components: {
      STable, //表格组件
   },
   data() {
      this.columns = columns
      // 路由编码验证

      return {
        powerTreeValue:"0",
         // 权限树
         treeData: [],
        // 权限树
         powerTreeData: [],
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
            type: 0,
            title: '',
            status: true,
            pId: '',
            meta: '',
         },

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
            type: '0',
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
            // routeId: [{ validator: validateId, required: true, trigger: 'blur' }],
         },
         // 栅格布局
         layout: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
         },
         // 查询参数
         queryCondition: {
            name:""

         },
         // 分页参数
         pageFrom: {
            // pageNum: 1, //第几次请求
            // pageSize: 12, //每页显示几条
            // totalPages: 0, //请求总次数
            // totalSize: 0, //所有数据数量
         },
         // 加载数据方法 必须为 Promise 对象
         loadData: [],
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
   filters:{

    typeFilter(type) {
      return menuType[type].text
    },

   },
   mounted(){
      this.loadingData();
   },
   methods: {

    onChangePowerTreeSelect(value) {

       if(value){
           this.powerTreeValue = value;
           this.ruleForm.pId = value
       }else{
           this.powerTreeValue = 0;
           this.ruleForm.pId = 0;
       }

    },
    getListByName(value) {

         if(!value){
            this.queryCondition.name = '';
         }
          this.loadingData();
    },

    async loadingData(){
      // 判断是否添加表格操作列

            return getPowerList({
               name: this.queryCondition.name
            })
            .then((res) => {
              if (res.code == 200) {
                //  res.data.map(item=>{

                //  })
                this.loadData = res.data
               }
             })
            .catch((err) => {
              alert(err)
            })
      },

     typeChange(value,option){
       console.log(value)

       this.ruleForm.type = value;


     },

     unloading(item){



      if(item.status ==1){
        item.status = 2;
      }else{
        item.status = 1;

      }


      return editMenuStatus({
          id:item.id,
          status: item.status,
          dataVersion: item.dataVersion,
      }).then((res) => {
            if(res.code == 200){
              this.$notification.success({
                message: '提示',
                description: "操作成功",
              })
            }

      })
     },
      // 树选择事件
      onChangeTreeSelect(value) {
         console.log(value)

         this.ruleForm.routeList = value
      },
      // 新建权限
      async handleAdd() {
         this.powerIdFlag = ''
         this.fromFlag = false
         this.ruleForm.powerName = '';
         this.ruleForm.routeList = '';
         this.ruleForm.pId = '';
         this.ruleForm.type = 0;

         this.ruleForm.operation = ''

         this.ruleForm.powerId = ''
         this.visible = true
         this.treeValue = undefined
         this.powerTreeValue = '0'
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
        console.log(record.pid)

         //  this.powerTreeValue="";


         this.powerIdFlag = record.powerId
         this.fromFlag = true
         this.visible = true
         this.ruleForm.id = record.id
         if(record.pid){
            this.ruleForm.pid = record.pid
            this.powerTreeValue = record.pid
            console.log( this.powerTreeValue )

         }


         this.ruleForm.type = record.type;

         this.ruleForm.powerName = record.powerName
         this.ruleForm.powerId = record.powerId
         this.ruleForm.operation = record.operation
         this.ruleForm.addTime = record.addTime
         this.ruleForm.editTime = record.editTime

        if(this.fromFlag){
          this.ruleForm['dataVersion'] = record.dataVersion;
          this.ruleForm['powerId'] = record.powerId;
        }


         if(record.routeGather==''){
            this.treeValue=[]
         }else{
            this.treeValue = record.routeGather
         }

         this.ruleForm.pId = record.pId

         this.ruleForm.routeList = record.routeGather
         this.$forceUpdate();


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
         let delListArr = []
         // 获取路由列表数据,用于查找所有id
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


               return removePower({
                  id:delListArr.join(',')
               }).then((res) => {
                  that.getListByName(false)
                  that.$notification.success({
                     message: '提示',
                     description: res.msg,
                  })
               })
            },
            onCancel() {
              //  console.log('取消删除')
            },
         })
      },

      // 提交
      handleOk(e) {
         this.$refs.ruleForm.validate(async (valid) => {
            this.treeValue = []
            this.powerTreeValue = '0'
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
            }

            var data ={
              powerName:this.ruleForm.powerName,
              pid:this.ruleForm.pId,
              routeGather:this.ruleForm.routeList,
              type:this.ruleForm.type,


            };

            if(this.fromFlag){
              data['dataVersion'] = this.ruleForm.dataVersion
              data['id'] = this.ruleForm.id
              data['powerId'] = this.ruleForm.powerId

            }





            // 校验全部通过，提交 (验证成功)
            await EditPower(this.fromFlag, data)
            .then((res) => {
               if (res.code == 200) {
                  this.loadingData();
                  this.visible = false
                  this.powerIdFlag = ''
                  this.$notification.success({
                     message: '提示',
                     description: res.msg,
                  })
               } else {
                  this.$notification.success({
                     message: '提示',
                     description: res.msg,
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

         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
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
               // routerForm 为ref指向的表单
            } catch (e) {}
         }
      },
   },
}
</script>

