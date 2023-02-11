<template>
  <div id="orderList">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="银行卡号">
                  <a-input v-model="queryCondition.bankCard" placeholder="" />
                </a-form-item>
              </a-col>


              <a-col :md="(!advanced && 4) || 8" :sm="12">
                <a-select label-in-value :default-value="{ key: '0' }" style="width: 130px" @change="handleChangea">
                  <a-select-option value="">
                    <a-badge status="default" text="全部" />
                  </a-select-option>
                  <a-select-option value="0">
                    <a-badge status="default" text="待审批" />
                  </a-select-option>
                  <a-select-option value="1">
                    <a-badge status="success" text="已完成" />
                  </a-select-option>
                  <a-select-option value="2">
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
        <!-- 右键菜单 -->
        <a-menu class="menustyle" :style="menuStyle" v-if="menuVisible">
          <a-menu-item>
            <a @click="deleteAll">批量删除</a>
          </a-menu-item>
        </a-menu>
        <!-- 新建 -->
        <div class="table-operator" :title="state ? '修改信息' : '新增信息'">
          <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
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

          <!-- 审核 -->

          <span slot="statusType" slot-scope="text">
            <a-badge :status="text | statusTypeFilter2" :text="text | statusFilter2" />
          </span>
          <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span>

          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="getItemInfo(record)" >审核</a>

              <!-- <a-divider type="vertical" />
              <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                <a>删除</a>
              </a-popconfirm> -->
            </template>
          </span>
        </s-table>
      </a-card>
      <!-- 抽屉 -->
      <template>
        <div>
          <a-drawer
            :title="state ? '修改订单' : '新增订单'"
            :placement="placement"
            :closable="false"
            :visible="visible"
            @close="onClose"
            width="800px"
          >
            <a-form-model
              :model="orderFrom"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
              ref="orderFrom"
            >
              <a-form-model-item label="订单编号" >
                <a-input v-model="orderFrom.orderSn" :disabled="true"/>
              </a-form-model-item>
              <a-form-model-item label="订单状态">
                <!-- <a-input v-model="companyForm.companyType" /> -->
                <!-- 公司类型下拉 -->
                <a-select  :value="orderFrom.orderStatus" style="width: 130px" @change="handleChangeb">
                  <a-select-option value="0">
                    <a-badge status="default" text="待付款" />
                  </a-select-option>
                  <a-select-option value="1">
                    <a-badge status="default" text="未送完" />
                  </a-select-option>
                  <a-select-option value="2">
                    <a-badge status="default" text="已送完" />
                  </a-select-option>
                  <a-select-option value="3">
                    <a-badge status="success" text="退款中" />
                  </a-select-option>
                  <a-select-option value="4">
                    <a-badge status="default" text="已退款" />
                  </a-select-option>
                  <!-- <a-select-option value="5">
                    <a-badge status="default" text="退款中" />
                  </a-select-option>
                  <a-select-option value="6">
                    <a-badge status="error" text="已退款" />
                  </a-select-option> -->
                </a-select>
              </a-form-model-item>

              <!-- <a-form-model-item label="物流单号" >
                <a-input v-model="orderFrom.deliverySn" />
              </a-form-model-item> -->



              <a-button type="primary" @click="handleOk" style="margin-left: 17%"  > 确定 </a-button>
            </a-form-model>
          </a-drawer>
        </div>
      </template>

      <div>
        <!-- 图片预览 -->
        <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
          <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
        </a-modal>

        <!-- 模态框 -->
         <a-modal
          title="提现详情"
          :visible="isShow"
          :width="900"
          :footer="null"
          @cancel="isShow=false"

        >

         <a-form :form="rowInfo" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }" >
           <div style="display: flex;justify-content: space-between;">
             <div style="width:400px;">
                <a-form-item label="提现编号">
                      {{rowInfo.id}}
                 </a-form-item>

                  <a-form-item label="实际提现额度">
                     {{rowInfo.sumCharge}}元
                 </a-form-item>

                 <a-form-item label="实际拨款额度">
                     {{rowInfo.quantity}}元
                 </a-form-item>

                 <a-form-item label="服务费" >
                    {{rowInfo.serviceCharge}}元
                 </a-form-item>
             </div>
             <div style="width:400px;">
              <a-form-item label="提现人">
                {{rowInfo.userName}}
              </a-form-item>
              <a-form-item label="提现人银行卡号">
                {{rowInfo.bankCard}}
              </a-form-item>
              <a-form-item label="提现人手机号">
                {{rowInfo.userAccount}}
              </a-form-item>
              <a-form-item label="提现时间">
                {{rowInfo.createdDate}}
              </a-form-item>

             </div>
           </div>

          </a-form>
            <div style="width: 160px;display: flex;justify-content: space-between;margin-left: auto;">
            <a-button @click="editOserState(false)">
              不通过
            </a-button>
            <a-button type="primary" @click="editOserState(true)">
              通过
            </a-button>
          </div>
        </a-modal>


      </div>


    </page-header-wrapper>
  </div>
</template>

<script>
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法



import {updateOrderStatus ,getMoneyListPage ,WithdrawalAdopt} from '@/api/system'


// import { FormModel } from 'ant-design-vue'
import router from '@/router'
import HeadCut from '@/views/admin/company/HeadCut'
import HeadCut1 from '@/views/admin/company/HeadCut'

// Vue.use(FormModel)
// import StepByStepModal from '@/views/list/modules/StepByStepModal'
// 引入操作/配置/弹出框组件
// import CreateForm from '@/views/list/modules/CreateForm'

const columnsOrder =[
   {
    title: '图片',
    width: '100px',
    dataIndex: 'skuPic',
    scopedSlots: { customRender: 'pics' },
    align: 'center',
  },

  {
    title: '商品名称',
    dataIndex: 'spuName',
    align: 'center',
  },
  {
    title: '规格名称',
    dataIndex: 'skuName',
    align: 'center',
  },
  {
    title: '商品类型',
    dataIndex: 'spuType',
    align: 'center',
  },

  {
    title: '实际支付金额',
    dataIndex: 'realAmount',
    align: 'center',
  },
{
    title: '返佣金额',
    dataIndex: 'actualSum',
    align: 'center',
  },


  {
    title: '数量',
    dataIndex: 'skuQuantity',
    align: 'center',
  },

];

const columns = [

  {
    title: '银行卡号',
    dataIndex: 'bankCard',
    align: 'center',
  },
  {
    title: '发起提现人',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '提现金额',
    dataIndex: 'quantity',
    align: 'center', //列内容居中
  },
  {
    title: '提现时间',
    dataIndex: 'createdDate',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate',
    align: 'center',
  },

   {
    title: '提现方式',
    dataIndex: 'status',
    scopedSlots: { customRender: 'statusType' },
    align: 'center',
  },

  {
    title: '状态',
    width: '100px',
    dataIndex: 'checkStatus',
    scopedSlots: { customRender: 'status' },
    align: 'center',
  },

  {
    title: '描述',
    dataIndex: 'note',
    ellipsis: true, //文字多会以省略号的形式展示
    align: 'center', //列内容居中
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
]
const statusMap = {
  0:{
    status: 'default',
    text: '待审核',
  },
  1: {
    status: 'success',
    text: '已完成',
  },
  2: {
    status: 'error',
    text: '未通过',
  },
}


const statusTypeMap = {

  1: {
    status: 'success',
    text: '银行卡',
  },
  2:{
    status: 'success',
    text: '微信零钱',
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
  name: 'orderList',
  components: {
    STable,
    Ellipsis,
    HeadCut,
    HeadCut1,
  },
  data() {
    this.columns = columns

    this.columnsOrder = columnsOrder

    return {
      isShow:false, //
      rowInfo:{},  //详情数据
      iconLoading:true, //按钮状态
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // 右键菜单显示/隐藏
      menuVisible: false,
      //新增修改状态
      state: false,
      idfalse: false,

      //订单表单
      orderFrom:{
        orderSn:"", //订单编号
        orderStatus:"", //订单状态
        // deliverySn:"" //物流单号


      },


      pagination:{
        total:0, //总条数
        defaultPageSize:2, //一页显示几条数据
      },

      form:{

      },

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
        companyName: [
          { required: true, message: '请输入公司名称' },
          { whitespace: true, message: '不能添加空格' },
          { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入有误' },
          { max: 10, message: '最大10个字符' },
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
      queryCondition: {
        //银行卡号

        bankCard: '',
        checkStatus:0, //默认

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
        return getMoneyListPage(requestParameters, this.queryCondition)
          .then((res) => {
            console.log(res)

            if (res.code == 200) {
              const pageData = {
                data: res.data.records,
                pageNo: Number(res.data.current) ,
                pageSize: Number(res.data.size),
                totalCount: Number(res.data.total),
                totalPage: Number(res.data.pages),
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


    statusFilter2(type) {
      return statusTypeMap[type].text
    },

     statusTypeFilter2(type) {
      return statusTypeMap[type].status
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

    editOserState(val){

        return WithdrawalAdopt(val,{
          id:this.rowInfo.id,
        }).then((res) => {
          if(res.code == 200){
            this.$notification.success({
                  message: '提示',
                  description: res.msg,
            })
            this.$refs.table.refresh(false);
            this.isShow = false;
          }
        })

    },

    //行
    getItemInfo(item){
      console.log(item)
      this.rowInfo = item;
       this.isShow = true;

    },

    handleChangea(value){

      this.queryCondition.checkStatus = value.key;


    },

    handleChangeb(value){

      this.orderFrom.orderStatus = value;

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
      this.icooon = record.skuPic
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
      this.companyForm = {}
      this.companyForm.userId = JSON.parse(localStorage.getItem('cf01'))
      this.visible = true
      this.fileList = []
      this.fileList2 = []
      this.companyType = ''
    },
    // 修改
    handleEdit(record) {
      this.visible = true
      this.state = true
      this.orderFrom.orderSn = record.orderSn;
      this.orderFrom.orderStatus = record.orderStatus;
      // this.orderFrom.deliverySn = record.deliverySn;

    },

    // 提交
    handleOk(e) {
      this.$refs.orderFrom.validate((valid) => {
        // 校验未全部通过，结束当前提交 (验证失败)

        if (!valid) {
          return false
        } else {

          return updateOrderStatus(this.orderFrom).then((res) => {

            if(res.code == 200){
              this.$refs.table.refresh(false)
              this.visible = false
              this.$notification.success({
                message: '提示',
                description: res.msg,
              })
            }

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
          this.$refs['orderFrom'].clearValidate() // 重置编辑表单,移出验证
        } catch (e) {}
      }
    },
  },
}
</script>