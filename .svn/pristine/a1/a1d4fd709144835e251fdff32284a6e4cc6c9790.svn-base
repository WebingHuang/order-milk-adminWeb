<template>
  <div>
    <!-- 搜索/筛选栏 查询/重置 -->
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="12">
              <a-form-item label="文章标题">
                <a-input v-model="queryCondition.articleTitle" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="(!advanced && 4) || 8" :sm="12">
              <a-select label-in-value :default-value="{ key: '1' }" style="width: 130px" @change="handleChange1">
                <a-select-option value="">
                  <a-badge status="default" text="全部文章" color="#2db7f5" />
                </a-select-option>
                <a-select-option value="1">
                  <a-badge status="processing" text="待审核文章" color="#d9d9d9" />
                </a-select-option>
                <a-select-option value="2">
                  <a-badge status="success" text="已审核文章" />
                </a-select-option>
                <a-select-option value="3">
                  <a-badge status="error" text="未通过审核" color="#f50" />
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :md="(!advanced && 4) || 8" :sm="12">
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
        showPagination="true"
        bordered
        :customRow="setRow"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- 审核 -->
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span> -->
        <!-- <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text + 123 }}</ellipsis>
        </span> -->
        <span slot="action" slot-scope="text, record">
          <template>
            <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
              <a>删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a
              @click="
                showModal(record)
                showArticle(articleForm.batchId)
              "
              >审核</a
            >
          </template>
        </span>
      </s-table>
    </a-card>

    <div></div>
    <!-- 审核弹窗 -->
    <template>
      <div>
        <a-modal v-model="visiblea" title="审核信息" height="500px" width="1000px">
          <template slot="footer">
            <a-button key="back" @click="handleCancel"> 取消 </a-button>
            <a-button key="error" type="danger" @click="submitChange(articleForm, 3)"> 未通过 </a-button>
            <a-button key="submit" type="primary" @click="submitChange(articleForm, 2)"> 通过 </a-button>
          </template>
          <div id="fixedRight">
            <label>预览方式：</label>

            <a-button type="dashed" @click="showPhone" style="margin-right: 15px">
              <a-icon type="mobile" />
            </a-button>
            <a-button type="dashed" @click="showDesktop">
              <a-icon type="desktop" />
            </a-button>
          </div>
          <div style="background-color: #eee; padding: 20px">
            <a-row :gutter="16">
              <a-col>
                <a-card :title="viewArticle.articleTitle" :bordered="false">
                  <div :style="{ width: modalWidth }" class="viewArticle" v-html="viewArticle.content"></div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-modal>
      </div>
    </template>
  </div>
</template>


<script>
import Vue from 'vue'
import moment from 'moment'
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法
import { deleteArticleList, updateArticleAdopt, getArticleList, getArticleByBatchId } from '@/api/article'
import { FormModel } from 'ant-design-vue'
import { login } from '@/api/login'
// import router from '@/router'
Vue.use(FormModel)

const columns = [
  {
    title: '序号',
    width: '20px',
    scopedSlots: { customRender: 'serial' },
  },
  {
    title: '文章标题',
    width: '100px',
    dataIndex: 'articleTitle',
  },
  {
    title: '文章类型',
    width: '20px',
    dataIndex: 'articleTypeId',
  },
  {
    title: '发布时间',
    width: '100px',
    dataIndex: 'releaseTime',
  },
  {
    title: '发布人',
    width: '100px',
    dataIndex: 'nickName',
  },
  {
    title: '审核信息',
    dataIndex: 'adopt',
    width: '100px',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '100px',
    scopedSlots: { customRender: 'action' },
  },
]
const statusMap = {
  1: {
    status: 'default',
    text: '待审核',
  },
  2: {
    status: 'success',
    text: '已审核',
  },
  3: {
    status: 'error',
    text: '审核异常',
  },
}
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
  },
  data() {
    this.columns = columns
    return {
      modalWidth: '375px', // 文章电脑/手机预览功能参数
      viewArticle: {
        // 查看文章
        articleTitle: '',
        content: '',
      },
      // previewVisible: false,

      // previewVisible2: false,
      // previewImage: '',
      // previewImage2: '',
      // 审核按钮弹窗状态
      loading: false,
      visiblea: false,
      // 上传图片要用到的数组
      //   fileList: [],
      //   fileList2: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // 右键菜单显示/隐藏
      menuVisible: false,
      //新增修改状态
      state: false,
      idfalse: false,
      articleForm: {
        // content: '',
        articleTitle: '',
        articleTypeId: '',
        nickName: '',
        releaseTime: '',
        batchId: '',
      },
      //  图片弹窗
      //   icooon: '',
      //   enlarge: false,
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
      queryCondition: {
        //文章名称
        articleTitle: '',
        adopt: 1,
        userId: JSON.parse(localStorage.getItem('cf01')),
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
        return getArticleList(requestParameters, this.queryCondition)
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
                element.releaseTime = this.$renderTime(element.releaseTime)
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
      // console.log(type)

      return statusMap[type].text
    },
    statusTypeFilter(type) {
      // console.log(type)

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
    //文章电脑/手机预览功能
    showDesktop() {
      this.modalWidth = '875px'
    },

    showPhone() {
      this.modalWidth = '375px'
    },
    // 获取登录用户的userid
    // getUserId () {
    //   return login(this.queryCondition)
    //     .then( res => {
    //       // localStorage.setItem('cf01',res.cf01.value);
    //     })
    // },
    // 审核状态
    handleChange1(value) {
      this.queryCondition.adopt = value.key
      this.$refs.table.refresh(false)
    },
    // 审核按钮弹窗状态
    showModal(record) {
      this.visiblea = true
      this.state = true
      this.articleForm.articleTitle = record.articleTitle
      this.articleForm.articleTypeId = record.articleTypeId
      this.articleForm.releaseTime = record.releaseTime
      this.articleForm.nickName = record.nickName
      this.articleForm.batchId = record.batchId
    },

    // 审批框
    submitChange(item, value) {
      return updateArticleAdopt({ batchId: item.batchId, adopt: value }).then((res) => {
        this.visiblea = false
        this.$refs.table.refresh(false)
        this.$notification.success({
          message: '提示',
          description: '审核修改完成',
        })
      })
    },
    handleCancel(e) {
      this.visiblea = false
    },

    en(e) {
      this.enlarge = false
    },
    // 删除
    handleDel(record) {
      return deleteArticleList({ idArr: record.id }).then((res) => {
        this.$refs.table.refresh(false)
        this.$notification.success({
          message: '提示',
          description: res.message,
        })
      })
    },
    // 批量删除
    deleteAll(record) {
      // var imgLIst =[];
      // imgLIst.push(record.icon);
      // imgLIst.push(record.authentication);
      if (this.selectedRowKeys.length > 0) {
        var that = this
        this.$confirm({
          title: '警示',
          content: '确定要全部删除吗?',
          onOk() {
            return deleteArticleList({ idArr: that.selectedRowKeys.join(','), oldImg: imgLIst.join(',') }).then(
              (res) => {
                that.$refs.table.refresh(false)
                that.$notification.success({
                  message: '提示',
                  description: res.message,
                })
              }
            )
          },
          onCancel() {},
        })
      }
    },

    // 审核预览
    showArticle(batchId) {
      const that = this
      getArticleByBatchId({ batchId: batchId }).then((res) => {
        that.visible = true
        that.viewArticle.articleTitle = res.data.articleTitle
        that.viewArticle.content = JSON.parse(res.data.html).html
      })
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
  created() {
    // this.getUserId()
  },
}
</script>

<style lang="less" scoped>
#fixedRight {
  margin-left: 765px;
  margin-bottom: 10px;
}
.viewArticle {
  height: 500px;
  overflow: auto;
  margin: 0 auto;
  /deep/ img {
    text-align: center;
    vertical-align: middle;
    border-style: none;
    width: 100%;
  }
}
.viewArticle::-webkit-scrollbar {
  width: 0 !important;
}
.viewArticle {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
/deep/ .ant-row {
  // width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 600px !important;
}
/deep/ .ant-row::-webkit-scrollbar {
  display: none !important;
}
/deep/ .ant-card-head-title {
  text-align: center;
}
</style>
