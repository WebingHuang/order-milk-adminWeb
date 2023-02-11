<template>
  <div id="sysrole">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="角色名称">
                  <a-input v-model="queryCondition.searchParam" placeholder="" />
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
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        </div>
        <!-- 表格 -->
        <s-table
          ref="table"
          size="small"
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
            <img style="width: 50px; height: 50px" :src="record.icon" />
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
            :title="state ? '修改角色' : '新增角色'"
            :placement="placement"
            :closable="false"
            :visible="visible"
            @close="onClose"
            width="800px"
          >
            <a-form-model
              :model="ruleForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
              ref="ruleForm"
            >
              <a-form-model-item label="角色名称"  :required="true">
                <a-input v-model="ruleForm.roleName" />
              </a-form-model-item>

              <a-form-model-item has-feedback label="权限列表" >
                        <a-tree-select
                           v-model="oldPowerList"
                           style="width: 100%"
                           :tree-data="treeData"
                           tree-checkable
                           :show-checked-strategy="SHOW_PARENT"
                           search-placeholder="Pleaase select"
                           :replace-fields="{ children: 'children', key: 'id', value: 'id', title: 'powerName' }"
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





              <a-form-model-item label="用户激活返佣比例"  v-if="isagent">
                <a-input v-model="ruleForm.rebateUser" />
              </a-form-model-item>

              <a-form-model-item label="用户激活间接返佣比例" v-if="isagent">
                <a-input v-model="ruleForm.rebateInUser" />
              </a-form-model-item>

              <a-form-model-item label="精油复购间接返佣比例" v-if="isagent">
                <a-input v-model="ruleForm.rebateInOil" />
              </a-form-model-item>

              <a-form-model-item label="精油复购返佣比例" v-if="isagent">
                <a-input v-model="ruleForm.rebateOil" />
              </a-form-model-item>




              <a-form-model-item label="用户买卡返佣比例" v-if="isagent">
                <a-input v-model="ruleForm.rebateCard" />
              </a-form-model-item>

              <a-form-model-item label="间接用户买卡返佣比例" v-if="isagent">
                <a-input v-model="ruleForm.rebateInCard" />
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
<script>
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法
import {  editUser, deleteCompany, filesCompany, } from '@/api/company'


import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_ALL // 选中所有子节点,只渲染父节点名称,如果取消,点哪个渲染哪个



import {  getSysRoleListPage ,getPower, editRoleInfo ,DeleteRole} from '@/api/system'



import HeadCut from '@/views/system/user/HeadCut'


const columns = [
  {
    title: '#',
    width: '70px',
    scopedSlots: { customRender: 'serial' },
    align: 'center',
  },
  {
    title: '角色名称',
    width: '100px',
    dataIndex: 'roleName',
    align: 'center',
  },

  {
    title: '角色唯一键',
    width: '100px',
    dataIndex: 'roleCode',
    align: 'center',
  },

  {
    title: '更新时间',
    width: '100px',
    dataIndex: 'updateDate',
    align: 'center',
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
  name: 'sysrole',
  components: {
    STable,
    Ellipsis,
    HeadCut,
  },
  data() {
    this.columns = columns
    return {
      isagent:false,
      preview: false,
      preview1: false,
      // 公司类型下拉
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
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      // 右键菜单显示/隐藏
      menuVisible: false,
      //新增修改状态
      state: false,
      idfalse: false,

      //用户表单
      userForm: {
        phone:"", //手机号
        role: "", //角色
        userName:"", //用户名称
        password:"", //密码
        img:"", //用户头像
      },

      ruleForm: {
            //表单数据
            id: '',
            roleName: '', //角色名称
            describe: '', //描述
            powerList: [], //权限id
            roleId: '', // 编码
            priority: '', //优先级

            rebateCard:"", //用户买卡返佣比例
            rebateInCard:"", //间接用户买卡返佣比例
            rebateInOil:"", //精油复购间接返佣比例
            rebateOil:"", // 精油复购返佣比例
            rebateUser:"", // 用户激活返佣比例
            rebateInUser:"",//用户激活间接返佣比例



      },

      roleType:[],  //角色列表吗

      companyForm: {
        companyName: '',
        companyType: 0,
        userId: '',
        icon: '',
        licenseUrl: '',
        describe: '',
        nickName: '',
        introduce: '',
        id: 0,
        oldImg: '',
      },
      oldImg: [],
      // 表单验证
      rules: {


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
      queryCondition: {
        //名称
        searchParam: '',

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
        return getSysRoleListPage(requestParameters, this.queryCondition)
          .then((res) => {
            if (res.code == 200) {

              res.data.records.map(item=>{
                item.updateDate = this.$renderTime(item.updateDate);
              })
              const pageData = {
                data: res.data.records,
                pageNo:Number(res.data.current) ,
                pageSize:Number(res.data.size) ,
                totalCount:Number(res.data.total) ,
                totalPage:Number(res.data.pages) ,
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
      treeData:[],


      // 点击修改时默认选中项
      oldPowerList:[],

      SHOW_PARENT,
      //表格选中行的所有数据
      selectedRows: [],
      // 公司类型
      typecompanya: [],

      companyType: '',

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

    onChangeTreeSelect(value, node, extra) {


         this.ruleForm.powerList = [...value]
    },
    onClose() {
      this.visible = false
    },
    onChange(e) {
      this.placement = e.target.value
    },



    setavatar(id, url) {
      this.companyForm.icon = url
      this.preview = true
    },
    setavatar1(id, url) {
      this.companyForm.licenseUrl = url
      this.preview1 = true
    },
    // 下拉树
    typeTreea(value) {
      this.companyForm.companyType = this.typecompanya[value].id
      this.companyType = this.typecompanya[value].companyType
    },
    // 上传图片
    handleCancel() {
      this.previewVisible = false
    },
    handleCancel2() {
      this.previewVisible = false
    },


    enlargeImg(record) {
      this.icooon = record.icon
      this.enlarge = true
    },
    en(e) {
      this.enlarge = false
    },
    //新增
    handleAdd() {
      this.state = false
      this.isagent =false;


      this.oldPowerList = []

      this.ruleForm.roleName = ''
      this.ruleForm.roleId = ''
      this.ruleForm.describe = ''
      this.ruleForm.powerList = []
      this.visible = true
      return getPower()
      .then((res) => {
            this.treeData = res.data
       })
    },



    // 修改
    async handleEdit(record) {


      this.isagent =false;


      //判断是否是城市代理商或者是服务商
      if(record.roleCode == 'd2fe397f-2d95-4532-a1eb-74efbe242659' || record.roleCode == '944f251d-2a9e-49d2-b416-7eaa6b68ee3f'){
        this.isagent =true;
      }


         this.state =true;
         this.fromFlag = true
         this.visible = true
         this.ruleForm.id = record.id
         this.ruleForm.roleName = record.roleName;
         this.ruleForm.rebateUser = record.rebateUser;
         this.ruleForm.rebateInUser = record.rebateInUser;

         this.ruleForm.rebateOil = record.rebateOil;
         this.ruleForm.rebateInOil = record.rebateInOil;

         this.ruleForm.rebateCard = record.rebateCard;
         this.ruleForm.rebateInCard = record.rebateInCard;


         this.ruleForm['dataVersion'] = record.dataVersion;
         this.ruleForm['roleCode'] = record.roleCode;
         this.oldPowerList = [];




         this.ruleForm.describe = record.describe
         await getPower().then((res) => {
            this.treeData = res.data
         })

        //  return

         if(record.powerList){

           if(record.powerList.indexOf(',') != -1){
               this.oldPowerList = record.powerList.split(',').map((item) => {
                return item - 0
               })

           }else{
             this.oldPowerList.push(record.powerList)

           }


         }

         // 把选中的权限列表转换为数组,并保存进回显数组里
        //  if (record.powerList.length > 0) {
        //     this.oldPowerList = record.powerList.split(',').map((item) => {
        //        return item - 0
        //     })
        //  }

        //  console.log(this.oldPowerList)


         // 保存this到that,在递归函数中使用
         let that = this
         // 创建转换递归函数,处理选中powerId,全部转换为对应的id
         function replaceId(tree) {
            tree.forEach((item) => {


               if (that.oldPowerList.indexOf(Number(item.powerId)) != -1) {
                //  console.log(item.id)

                  that.oldPowerList.splice(that.oldPowerList.indexOf(Number(item.powerId)), 1, Number(item.id))
                  replaceId(that.treeData)
               } else {
                  if (item.children && item.children.length > 0) {
                     replaceId(item.children)
                  }
               }
            })
         }



         // 启动转换id的递归函数
         replaceId(this.treeData)


        //  console.log(this.oldPowerList)

         // 创建递归函数,处理列表树数据,删除所有的父节点ID,提交的时候再添加
         function isPid(tree) {
            for (let i = 0; i < tree.length; i++) {
               // 判断选中的权限列表里有没有pid
                // console.log(that.oldPowerList.indexOf(tree[i].pid))
               if (that.oldPowerList.indexOf(Number(tree[i].pid)) != -1 ) {

                  // 如果有pid,删除这个pid,并重新走一遍循环
                  that.oldPowerList.splice(that.oldPowerList.indexOf(Number(tree[i].pid)), 1)
                  isPid(that.treeData)
               } else {
                  // 如果选中权限列表中没有当前数据的pid,就判断当前数据有没有子集
                  if (tree[i].children && tree[i].children.length > 0) {
                     // 如果有子集,调用递归函数
                     isPid(tree[i].children)
                  } else {
                     // 其他情况..跳出本次循环
                     continue
                  }
               }
            }
         }
         // 启动删除父id的递归函数
         isPid(this.treeData)



        //  console.log(this.oldPowerList)
        //  return

         this.ruleForm.powerList = this.oldPowerList


    },
    // 删除
    handleDel(record) {


      var imgLIst = []
      imgLIst.push(record.icon)
      imgLIst.push(record.authentication)
      return DeleteRole({
        dataVersion: record.dataVersion,
        roleCode:record.roleCode

      })
      .then((res) => {
        this.$refs.table.refresh(false)
        this.$notification.success({
          message: '提示',
          description: res.msg,
        })
      })
    },
    // 批量删除
    deleteAll(record) {

      var imgLIst = []
      imgLIst.push(record.icon)
      imgLIst.push(record.authentication)
      if (this.selectedRowKeys.length > 0) {
        var that = this
        this.$confirm({
          title: '警示',
          content: '确定要全部删除吗?',
          onOk() {

            return DeleteRole({
              idArr: that.selectedRowKeys.join(','),
              oldImg: imgLIst.join(',')
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
      this.$refs.ruleForm.validate((valid) => {

        // 校验未全部通过，结束当前提交 (验证失败)

         // 保存this,再递归函数中使用
            let that = this
            // 递归函数,用于添加选中权限的父级
            function pushParentId(tree) {
               for (let i = 0; i < tree.length; i++) {
                  // 对比选中列表,如果存在当前循环到的id,并且不存在它的父级Id,就把它的父级添加进去,并重新开启循环
                  if (
                     that.ruleForm.powerList.indexOf(tree[i].id) != -1 &&
                     that.ruleForm.powerList.indexOf(tree[i].pid) == -1 &&
                     tree[i].pid
                  ) {
                     that.ruleForm.powerList.push(tree[i].pid) //添加父级Id
                     pushParentId(that.treeData) //重新开启循环
                  } else if (
                     that.ruleForm.powerList.indexOf(tree[i].id) == -1 &&
                     tree[i].children &&
                     tree[i].children.length > 0
                  ) {
                     //如果选中列表不存在当前循环到的id,并且当前数据含有子集,使用递归函数,继续循环下一层
                     pushParentId(tree[i].children)
                  } else {
                     // 其他情况...不满足条件就跳出本次循环
                     continue
                  }
               }
            }
            // 启动添加父id的递归函数
            pushParentId(this.treeData)


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
                     if (item.children && item.children.length > 0) {
                        replacePowerId(item.children)
                     }
                  }
               })
            }
            // 启动替换id的递归函数
            replacePowerId(this.treeData)

        var data ={

            powerList:this.ruleForm.powerList.join(','),
            roleName: this.ruleForm.roleName,
            rebateUser:Number(this.ruleForm.rebateUser),
            rebateInUser:Number(this.ruleForm.rebateInUser),
            rebateOil:Number(this.ruleForm.rebateOil),
            rebateInOil:Number(this.ruleForm.rebateInOil),
            rebateCard:Number(this.ruleForm.rebateCard),
            rebateInCard:Number(this.ruleForm.rebateInCard),

        };



        if(this.state){

           data['roleCode'] = this.ruleForm.roleCode

           data['dataVersion'] =  this.ruleForm.dataVersion;

        }




        if (!valid) {
          return false
        } else {
          return editRoleInfo(this.state,data)
          .then((res) => {

            this.$refs.table.refresh(false)
            this.visible = false
            this.$notification.success({
              message: '提示',
              description: res.msg,
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


  },
  watch: {
    // 去掉表单验证信息二次打开残留
    visible(val, newVal) {
      //监听的是控制模态框显示或隐藏开关的布尔值
      // 监视dialog状态（打开、关闭）
      if (val) {
        try {
          this.$refs['ruleForm'].clearValidate() // 重置编辑表单,移出验证
        } catch (e) {}
      }
    },
  },
}
</script>