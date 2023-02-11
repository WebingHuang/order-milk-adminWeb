<template>
  <div id="sysschool">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="学校名称">
                  <a-input v-model="queryCondition.schoolName" placeholder="" />
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
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="showClass(record)">查看班级</a>
              <a-divider type="vertical" />
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
            :title="state ? '修改学校' : '新增学校'"
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
              <a-form-model-item v-for="(item, key) in ruleForm.schoolEntities" :key="key" :label="(!state ? (key+1 + '-') :'') +'学校名称'" :required="true">
                <a-input :name="(!state ? (key+1 + '-') :'') +'学校名称'" v-model="item.schoolName" >
                  <template #addonAfter v-if="key===0 && !state">
                    <a-button type="primary" icon="plus" shape="circle" @click="addSchool()">
                    </a-button>
                  </template>
                </a-input>
              </a-form-model-item>

              <a-button type="primary" @click="handleOk" style="margin-left: 17%"> 确定 </a-button>
            </a-form-model>
          </a-drawer>
        </div>
      </template>


      <!-- 抽屉 -->
      <template>
        <div>
          <a-drawer
            title="班级设置"
            :placement="placement"
            :closable="false"
            :visible="visibleC"
            @close="onCloseC"
            width="1200px"
          >
            <class-table @change:table_list="refreshList"></class-table>
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



import {  getSchoolPage ,getPower, editSchool, deteleSchool} from '@/api/system'



import HeadCut from '@/views/system/user/HeadCut'
import ClassTable from '@/views/system/class/Table'


const columns = [
  {
    title: '#',
    width: '70px',
    scopedSlots: { customRender: 'serial' },
    align: 'center',
  },
  {
    title: '学校名称',
    width: '100px',
    dataIndex: 'schoolName',
    align: 'center',
  },

  {
    title: '创建时间',
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
  name: 'sysschool',
  components: {
    STable,
    Ellipsis,
    HeadCut,
    ClassTable,
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
        schoolEntities: [{
          schoolName: ''
        }]

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
      visibleC: false,
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

      // confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      queryCondition: {
        //名称
        schoolName: '',

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
        return getSchoolPage(requestParameters, this.queryCondition)
          .then((res) => {
            if (res.code == 200) {

              res.data.records.map(item=>{
                item.updateDate = this.$renderTime(item.updateDate);
              })
              let idd = this.$store.getters.schoolId;
              if (idd) {
                let gg = res.data.records.find(e => e.id === idd)
                this.$store.dispatch('setSchoolClassList', gg.schoolClassList)
              }

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

    refreshList() {
      this.$refs.table.refresh(true)
    },

    addSchool() {
      this.ruleForm.schoolEntities.push({
        schoolName: ''
      })
    },

    onChangeTreeSelect(value, node, extra) {


         this.ruleForm.powerList = [...value]
    },
    onClose() {
      this.visible = false
    },
    onCloseC() {
      this.visibleC = false
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

      this.ruleForm.schoolEntities = [{schoolName:''}]
      this.visible = true
      return getPower()
      .then((res) => {
            this.treeData = res.data
       })
    },


    showClass(record) {
      this.visibleC = true;
      this.$store.dispatch('setSchoolId', record.id);
      this.$store.dispatch('setSchoolClassList', record.schoolClassList);
    },

    // 修改
    async handleEdit(record) {

         this.state =true;
         this.fromFlag = true
         this.visible = true
         this.ruleForm.id = record.id
         this.ruleForm.schoolEntities = [{schoolName: record.schoolName}];
      
    },
    // 删除
    handleDel(record) {


      this.$refs.table.refresh(true)
      return deteleSchool({
        schoolId: record.id,
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

      if (this.selectedRowKeys.length > 0) {
        this.$refs.table.refresh(true)
        var that = this
        this.$confirm({
          title: '警示',
          content: '确定要全部删除吗?',
          onOk() {
            Promise.all(
              that.selectedRowKeys.map(e => deteleSchool({
                schoolId: e
              }))
            ).then(() => {
              that.$refs.table.refresh(false)
              that.selectedRowKeys = []
              that.$notification.success({
                message: '提示',
                description: '删除成功',
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

        let data = {
          schoolEntities: this.ruleForm.schoolEntities
        };

        if(this.state){
          data['schoolId'] = this.ruleForm.id

          data['schoolName'] =  this.ruleForm.schoolEntities[0]?.schoolName;
          
          delete data.schoolEntities;

        }

        if (!valid) {
          return false
        } else {
          return editSchool(this.state,data)
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

<style lang="less">
.ant-input-group-addon {
  border: none !important;
}
</style>