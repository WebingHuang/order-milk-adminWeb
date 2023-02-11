<template>
   <div id="routerTable">
      <page-header-wrapper>
         <!-- 搜索/筛选栏 查询/重置 -->
         <a-card :bordered="false">
            <div class="table-page-search-wrapper">
               <a-form layout="inline">
                  <a-row :gutter="48">
                     <a-col :md="8" :sm="24">
                        <a-form-item label="菜单名称">
                           <a-input v-model="queryCondition.name" placeholder="" />
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



            <!-- 新建用户 -->
            <div class="table-operator" >
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

            >
               <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
               </span>

               <span slot="type" slot-scope="text">
                  <a-badge  status="success" :text="text | typeFilter" />
                </span>

                <span slot="enable" slot-scope="text, record" type="primary" >
                  <a-switch checked-children="开" un-checked-children="关" :checked='record.status==1' @click="unloading(record)" />
                </span>
               <span slot="action" slot-scope="text, record">
                  <template>
                     <a @click="handleEdit(record)"  >修改</a>
                     <a-divider type="vertical" />
                     <a @click="handleDel(record)"  >删除</a>
                  </template>
               </span>
            </s-table>

            <!-- form表单 -->
            <div>
               <a-drawer
                  :title="!fromFlag ? '添加菜单' : '修改菜单'"
                  :width="720"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="handleCancel"
               >
                  <a-form-model ref="routerForm" :model="routerForm" :rules="rules" v-bind="layout">
                     <!-- <a-form-model-item has-feedback label="路由ID" prop="id" v-if="fromFlag">
                        <a-input v-model="routerForm.id" autocomplete="off" :disabled="true" />
                     </a-form-model-item> -->
                     <a-form-model-item has-feedback label="菜单名称" prop="title" :required="true">
                        <a-input v-model="routerForm.title" autocomplete="off" placeholder="请输入名字" />
                     </a-form-model-item>
                     <a-form-model-item has-feedback label="菜单唯一标识" prop="name" :required="true">
                        <a-input v-model="routerForm.name" autocomplete="off" placeholder="请输入name" />
                     </a-form-model-item>
                     <!-- <a-form-model-item has-feedback label="路由编码" prop="routeId">
                        <a-input v-model="routerForm.routeId" autocomplete="off" placeholder="请输入编码(1001)" />
                     </a-form-model-item> -->
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

                        </a-tree-select>
                     </a-form-model-item>

                     <a-form-model-item has-feedback label="类型" >


                         <a-select  default-value="0"  style="width: 120px" @change="typeChange" :required="true">
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
                     <a-form-model-item has-feedback label="启用/停用"  >

                          <a-switch default-checked :checked="routerForm.status" @click="routerForm.status=!routerForm.status"/>
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
import { getRouterList, editRouter, getDeleteRoute, getRoute ,editMenuStatus } from '@/api/system'


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
      title: '停用/启用',
      dataIndex: 'status',
      scopedSlots: { customRender: 'enable' },
      align: 'center',
   },
   {
      title: '添加时间',
      dataIndex: 'createdDate',
      align: 'center',

   },


   {
      title: '修改时间',
      dataIndex: 'updateDate',
      align: 'center',

   },
   {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' },
   },
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
   name: 'routerTable',
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
            type: 1,
            title: '',
            status: true,
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
            // routeId: [{ validator: validateId, required: true, trigger: 'blur' }],
         },
         // 栅格布局
         layout: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
         },
         // 查询参数
         queryCondition: {

            name:"",

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


            const requestParameters = Object.assign({}, parameter, this.pageFrom)
            return getRouterList(requestParameters, this.queryCondition)
               .then((res) => {
                  if (res.code == 200) {

                    res.data.records.map(item =>{
                      if(item){

                        item.status = Number(item.status);
                        item.type = Number(item.type);

                      }
                    })


                    const pageData = {
                      data: res.data.records,
                      pageNo:Number(res.data.current),
                      pageSize: Number(res.data.size),
                      totalCount: Number(res.data.total),
                      totalPage: Number(res.data.pages),
                    }
                    return pageData
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
   filters:{

    typeFilter(type) {
      return menuType[type].text
    },

   },
   methods: {

     typeChange(value,option){

       this.routerForm.type = value;


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
              this.$refs.table.refresh(false);
            }


      })
     },
      // 树选择事件
      onChangeTreeSelect(value) {
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
         this.routerForm.type = 1
         this.routerForm.status = true
         this.routerForm.title = ''
         this.routerForm.pId = 0
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
         this.treeValue = record.pid

         this.routerForm['dataVersion'] = record.dataVersion;

         this.routerForm['routeId'] = record.routeId;



         this.treeData = []
         await getRoute()
         .then((res) => {

            this.treeData = res.data
            this.treeData.unshift({ id: 0, title: '新建路由' })
            this.fromFlag = true
            this.visible = true
         })
      },
      // 删除
      async handleDel(record) {
         // 定义数组,存放选中的id和当前节点的所有子集id
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

            console.log(delListArr)

         })


         // 调用删除接口,并给出警示
         var that = this
         that.$confirm({
            title: '警示',
            content: '此操作会同时删除所有子节点,确定要全部删除吗?',
            onOk() {
               return getDeleteRoute({
                   id: delListArr.join(',')
               }).then((res) => {
                  that.$notification.success({
                     message: '提示',
                     description: res.msg,
                  })
                  that.$refs.table.refresh(false);

               })
            },
            onCancel() {
              //  console.log('取消删除')
            },
         })
      },

      // 提交
      handleOk(e) {
         this.$refs.routerForm.validate((valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
            }

            let metaData = {}
            metaData.title = this.routerForm.title
            // metaData.keepAlive = true
            metaData.redirect = '/form / base - form'
            metaData.path = this.routerForm.path
            metaData.permission = [this.routerForm.name]
            this.routerForm.meta = JSON.stringify(metaData)
            console.log(this.routerForm)


            var data ={
              name:this.routerForm.name,
              title:this.routerForm.title,
              pid:this.routerForm.pId,
              type:Number(this.routerForm.type) ,
              status:this.routerForm.status? 1:0,
              meta: this.routerForm.meta,
            };

            if(this.fromFlag){
              data['id'] = Number(this.routerForm.id) ;
              data['dataVersion']=this.routerForm.dataVersion;
              data['routeId'] = this.routerForm.routeId;
            }





            return editRouter(this.fromFlag, data).then((res) => {
               if (res.code == 200) {
                  this.$refs.table.refresh(false)
                  this.visible = false
                  this.routerIdFlag = ''
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
               this.$refs['routerForm'].clearValidate() // 重置编辑表单
               // routerForm 为ref指向的表单
            } catch (e) {}
         }
      },
   },
}
</script>

