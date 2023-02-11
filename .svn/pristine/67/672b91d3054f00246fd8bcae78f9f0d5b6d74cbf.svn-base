<template>
  <div id="business">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="6" :sm="12">
                <a-form-item label="手机号">
                  <a-input v-model="queryCondition.phone" placeholder />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="12">
                <a-form-item label="邮箱">
                  <a-input v-model="queryCondition.mail" placeholder />
                </a-form-item>
              </a-col>

              <a-col :md="(!advanced && 4) || 12" :sm="24">
                <a-select
                  label-in-value
                  :default-value="{ key: '1' }"
                  style="width: 130px"
                  @change="handleChangea"
                >
                  <a-select-option value>
                    <a-badge status="success" text="全部" color="#2db7f5" />
                  </a-select-option>
                  <a-select-option value="1">
                    <a-badge status="default" text="待认证" />
                  </a-select-option>
                  <a-select-option value="2">
                    <a-badge status="success" text="已认证" />
                  </a-select-option>
                  <a-select-option value="3">
                    <a-badge status="error" text="未通过" />
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :md="(!advanced && 6) || 24" :sm="24">
                <span
                  class="table-page-search-submitButtons"
                  :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                >
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button
                    style="margin-left: 8px"
                    @click="() => ((this.queryCondition = {}), $refs.table.refresh(true))"
                  >重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
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
          showPagination="auto"
          bordered
        >
          <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
          <!-- Logo  -->
          <span slot="pic" slot-scope="text, record" type="primary" @click="enlargeImg(record)">
            <img style="width: 50px; height: 50px" :src="record.icon" />
          </span>
          <!-- 营业执照  -->
          <span slot="pic2" slot-scope="text, record" type="primary" @click="enlargeImga(record)">
            <img style="width: 50px; height: 50px" :src="record.licenseUrl" />
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
              <a @click="showModal(record)">审核</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <!-- 图片预览 -->
      <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
        <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
      </a-modal>
      <a-modal v-model="enlargea" title="预览" @ok="en" okText="完成" width="550px" cancelText="关闭">
        <img style="width: 500px; height: 300px" :src="icooona" />
      </a-modal>
      <!-- 审核弹窗 -->
      <template>
        <div>
          <a-modal v-model="visiblea" title="审核信息" cancelText="未通过审核" okText="通过审核" width="800px">
            <a-form-model :model="mechanismInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="其它平台入驻名称">{{mechanismInfo.name}}</a-form-model-item>
              <a-form-model-item label="联系人">{{mechanismInfo.接触s}}</a-form-model-item>

              <a-form-model-item label="电话">{{mechanismInfo.phone}}</a-form-model-item>
              <a-form-model-item label="邮箱">{{mechanismInfo.mail}}</a-form-model-item>
              <a-form-model-item label="其他官方平台后台截图凭证">
                <img
                  v-for="(item,index) in mechanismInfo.voucherList"
                  :key="index"
                  :src="item"
                  style="width:100px; height: 100px; margin-right: 10px;"
                  @click="lookimg(item)"
                />
              </a-form-model-item>
              <a-form-model-item label="官方机构或平台授予奖项或荣誉的凭证">
                <img
                  v-for="(item,index) in mechanismInfo.honorList"
                  :key="index"
                  :src="item"
                  style="width:100px; height: 100px; margin-right: 10px;"
                  @click="lookimg(item)"
                />
              </a-form-model-item>

              <a-form-model-item label="描述" v-show="!ismessage">
                <a-input placeholder="未通过请填写描述" v-model="message" pressEnter />
              </a-form-model-item>
            </a-form-model>
            <template slot="footer">
              <a-button @click="cancel">取消</a-button>
              <a-button type="danger" @click="Save(3)">未通过审核</a-button>
              <a-button type="primary" @click="Save(2)">通过审核</a-button>
            </template>
          </a-modal>
        </div>
      </template>
    </page-header-wrapper>
  </div>
</template>
<style scoped>
.preview {
  margin-left: 25%;
}
</style>
<script>
import Vue from 'vue'
import moment, { max } from 'moment'
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法
import { getMechanismList, getMechanismById, mechanismAdopt } from '@/api/seniority'
// import { FormModel } from 'ant-design-vue'
import router from '@/router'

// Vue.use(FormModel)
// import StepByStepModal from '@/views/list/modules/StepByStepModal'
// 引入操作/配置/弹出框组件
// import CreateForm from '@/views/list/modules/CreateForm'
const columns = [
  {
    title: '编号',
    width: '70px',
    scopedSlots: { customRender: 'serial' },
    align: 'center',
  },
  {
    title: '名称',
    width: '100px',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '联系人',
    width: '100px',
    dataIndex: '接触s',
    align: 'center',
  },
  {
    title: '创建时间',
    width: '100px',
    dataIndex: 'editTime',
    align: 'center',
  },
  {
    title: '审核状态',
    width: '100px',
    dataIndex: 'adopt',
    scopedSlots: { customRender: 'status' },
    align: 'center',
  },
  {
    title: '描述',
    width: '100px',
    dataIndex: 'message',
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
  name: 'business',
  components: {
    STable,
    Ellipsis,
  },
  data() {
    this.columns = columns
    return {
      // 审核按钮弹窗状态
      visiblea: false,
      idfalse: false,

      state: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      mechanismInfo: {},
      //  图片弹窗
      icooon: '',
      icooona: '',

      enlarge: false,
      enlargea: false,

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
        phone: '',
        mail: '',
        adopt: 1,
      },
      ismessage: false,
      message: '',
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
        return getMechanismList(requestParameters, this.queryCondition)
          .then((res) => {
            if (res.state == 2000) {
              let pageData = {
                data: res.data.content,
                pageNo: res.data.pageNum,
                pageSize: res.data.pageSize,
                totalCount: res.data.totalSize,
                totalPage: res.data.totalPages,
              }

              pageData.data.forEach((element) => {
                if (element.editTime != '' && element.editTime != null) {
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
      //表格选中行的ID
      selectedRowKeys: [],
      //表格选中行的所有数据
      selectedRows: [],
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
    //点击审核按钮后弹出的页面图片预览
    lookimg(str) {
      var newwin = window.open()
      newwin.document.write('<img src=' + str + " class='lookimg'/>")
    },
    //审核状态
    handleChangea(value) {
      this.queryCondition.adopt = value.key
      this.$refs.table.refresh(false)
    },
    // 审核按钮弹窗状态
    showModal(record) {
      return getMechanismById({ id: record.id }).then((res) => {
        if (res.state == 2000) {
          this.visiblea = true
          this.mechanismInfo = res.data
          if (res.data.message) {
            this.message = res.data.message
          }
          if (this.mechanismInfo.honorList) {
            this.mechanismInfo.honorList = this.mechanismInfo.honorList.split(',')

            console.log(this.mechanismInfo.honorList)
          }
          if (this.mechanismInfo.voucherList) {
            this.mechanismInfo.voucherList = this.mechanismInfo.voucherList.split(',')
          }
        }
      })
    },

    // 复选框选中触发事件
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 图片弹窗
    enlargeImg(record) {
      this.icooon = record.icon
      this.enlarge = true
    },
    enlargeImga(record) {
      this.icooona = record.licenseUrl
      this.enlargea = true
    },
    en(e) {
      this.enlarge = false
      this.enlargea = false
    },
    // 取消按钮
    cancel() {
      this.visiblea = false
    },
    // 审核
    Save(val) {
      if (val == 3) {
        if (this.message == '') {
          this.$message.warning(' 描述不能为空')
          return
        }
      }

      return mechanismAdopt({
        id: this.mechanismInfo.id,
        adopt: val,
        message: val == 3 ? this.message : '',
      }).then((res) => {
        this.visiblea = false
        this.message = ''
        this.$refs.table.refresh(false)
        this.$notification.success({
          message: '提示',
          description: '审核完成',
        })
      })
    },
  },
}
</script>