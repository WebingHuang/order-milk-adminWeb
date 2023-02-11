<template>
  <div id="companyagement">
    <page-header-wrapper>
      <!-- 这是需求审批 -->
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="需求名称">
                  <a-input v-model="queryCondition.demandName" placeholder="" />
                </a-form-item>
              </a-col>
              <a-col :md="(!advanced && 4) || 8" :sm="12">
                <a-select label-in-value :default-value="{ key: '1' }" style="width: 130px" @change="handleChangea">
                  <a-select-option value="">
                    <a-badge status="success" text="全部需求" color="#2db7f5" />
                  </a-select-option>
                  <a-select-option value="1">
                    <a-badge status="default" text="待审批" />
                  </a-select-option>
                  <a-select-option value="2">
                    <a-badge status="success" text="审批通过" />
                  </a-select-option>
                  <a-select-option value="3">
                    <a-badge status="error" text="审批未通过" />
                  </a-select-option>
                </a-select>
              </a-col>
              <template>
                <a-select
                  mode="multiple"
                  placeholder="请选择要查询的类型"
                  :value="selectedItems"
                  style="width: 15%; float: left; margin-right: 20px"
                  @change="handleChange"
                >
                  <a-select-option v-for="(item, index) in filteredOptions" :key="index">
                    {{ item.demandTypeName }}
                  </a-select-option>
                </a-select>
              </template>
              <a-col :md="(!advanced && 8) || 24" :sm="24">
                <span
                  class="table-page-search-submitButtons"
                  :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                >
                  <a-button type="primary" @click="loadData">查询</a-button>
                  <a-button style="margin-left: 8px" @click="resetData">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <a-table :columns="columns" :data-source="tableList" rowKey="batchId">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>

          <span slot="demandTypeName" slot-scope="text">
            {{ text | demandTypeFilter }}
          </span>

          <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span>

          <span slot="action" slot-scope="text, record">
            <a @click="showModal(record)">审批</a>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-card>
      <!-- 图片预览 -->
      <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
        <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
      </a-modal>
      <!-- 审核弹窗 -->
      <template>
        <div>
          <a-modal v-model="visiblea" title="审核信息" cancelText="未通过审核" okText="通过审核" :width="800">
            <a-form-model :model="demandInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="需求标题">
                {{ demandInfo.demandName }}
              </a-form-model-item>
              <a-form-model-item label="需求副标题">
                {{ demandInfo.text }}
              </a-form-model-item>

              <a-form-model-item label="首图">
                <div class="modal_box" v-if="demandInfo.cover">
                  <div >
                    <img :src="demandInfo.cover" style="width: 150px" />
                  </div>
                </div>
              </a-form-model-item>

              <a-form-model-item label="banner图">
                <div class="modal_box" v-if="demandInfo.banner">
                  <!-- 上一页的图标 -->
                  <!-- <a-icon type="left" style="font-size: 50px" @click="handlePrev" /> -->
                  <!-- 走马灯 -->
                  <!-- 一定要注意这里指定的 ref -->
                  <a-carousel autoplay ref="img">
                    <div v-for="(item, index) in demandInfo.banner" :key="index">
                      <img :src="item" style="width: 100%" />
                    </div>
                  </a-carousel>
                  <!-- 下一页图标 -->
                  <!-- <a-icon
                  type="right"
                  style="font-size: 50px"
                  @click="handleNext"
                  /> -->
                </div>
              </a-form-model-item>
              <a-form-model-item label="图文描述">
                  <div v-html="demandInfo.html" id="details"></div>
              </a-form-model-item>

              <a-form-model-item label="属性" v-if="demandInfo.attribute">
                {{demandInfo.attribute}}
              </a-form-model-item>
              <a-form-model-item label="其他属性" v-if="demandInfo.otherAttribute">
                {{demandInfo.otherAttribute}}

              </a-form-model-item>
              <a-form-model-item label="价格" v-if="demandInfo.price">
                <div v-for="(item,index) in demandInfo.price.servicePrice" :key="index" >
                  {{item}}
                </div>

              </a-form-model-item>


               <a-form-model-item label="联系方式">
                  {{ demandInfo.接触 }}
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
<script>
import storage from 'store'
import Vue from 'vue'
import { Carousel, Icon } from 'ant-design-vue'
import moment, { max } from 'moment'
// 引入表格组件 和
// import { STable, Ellipsis } from '@/components'
// 引入调用接口方法
import { getDemandByAdopt, updateAdoptCompanu, demandTypeCompanuy, demandInfoByBatchId } from '@/api/demand'
import router from '@/router'
Vue.use(Carousel)

const OPTIONS = [
  {
    id: 1,
    demandTypeName: '直播招商',
  },
  {
    id: 2,
    demandTypeName: '直播商品',
  },
  {
    id: 15,
    demandTypeName: '扶贫助农招商',
  },
  {
    id: 16,
    demandTypeName: '扶贫助农商品',
  },
  {
    id: 5,
    demandTypeName: '营销推广',
  },
  {
    id: 11,
    demandTypeName: '短视频/图文-策划/代运营',
  },
  {
    id: 12,
    demandTypeName: '直播策划代运营',
  },
  {
    id: 13,
    demandTypeName: '网店策划代运营',
  },
  {
    id: 14,
    demandTypeName: '网红直播培训',
  }

]

const columns = [
  {
    title: '序号',
    width: '20px',
    scopedSlots: { customRender: 'serial' },
  },
  {
    title: '需求标题',
    width: '100px',
    dataIndex: 'demandName',
  },
  {
    title: '需求类型',
    width: '100px',
    dataIndex: 'demandTypeId',
    scopedSlots: { customRender: 'demandTypeName' },
  },
  {
    title: '发布时间',
    width: '100px',
    dataIndex: 'releaseTime',
  },
  {
    title: '审核状态',
    width: '100px',
    dataIndex: 'adopt',
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

const demandTypeMap = {
  1: '直播招商',
  2: '直播商品',
  15: '扶贫助农招商',
  16: '扶贫助农商品',
  5: '营销推广',
  8: '设备出售',
  9: '场地出租',
  11: '短视频/图文策划代运营',
  12: '直播策划代运营',
  13: '网店策划代运营',
  14: '网红直播培训'
}
export default {
  name: 'RequirementsReview',

  data() {
    this.columns = columns
    return {
      //显示table的数组
      tableList: [],
      selectedItems: [],
      // 审核按钮弹窗状态
      visiblea: false,
      idfalse: false,
      state: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      companyForm: {
        demandName: '',
        demandTypeName: '',
        batchId: '',
        adopt: '',
        icon: '',
        licenseUrl: '',
        describe: '',
        nickName: '',
        introduce: '',
        id: 0,
        oldImg: '',
      },
      //  图片弹窗
      icooon: '',
      enlarge: false,
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
        demandName: '',
        demandTypeId: 1,
        adopt: 1,
      },
      // 分页参数
      pageFrom: {
        // pageNum: 1, //第几次请求
        // pageSize: 10, //每页显示几条
        // totalPages: 0, //请求总次数
        // totalSize: 0, //所有数据数量
      },

      //表格选中行的ID
      selectedRowKeys: [],
      //表格选中行的所有数据
      selectedRows: [],
      demandInfo: {},
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },

    demandTypeFilter(type) {
      return demandTypeMap[type]
    },
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
    filteredOptions() {
      return OPTIONS.filter((o) => !this.selectedItems.includes(o))
    },
  },
  methods: {
    handlePrev() {
      // 通过上边指定的ref 来操作
      this.$refs.img.prev()
    },
    handleNext() {
      this.$refs.img.next()
    },

    //查询表格接口
    getTableList(qurey) {
      return getDemandByAdopt(qurey).then((res) => {
        if (res.state == 2000) {
          res.data.map((item) => {
            this.tableList.push(item)
          })
        }
      })
    },
    loadData() {
      this.tableList = []
      if (this.selectedItems.length > 0) {
        for (var i = 0; i < this.selectedItems.length; i++) {
          this.getTableList({
            demandName: this.queryCondition.demandName,
            demandTypeId: OPTIONS[this.selectedItems[i]].id,
            adopt: this.queryCondition.adopt,
          })
        }
      } else {
        // 页面加载获取待审批的列表
        for (var i = 0; i < OPTIONS.length; i++) {
          this.getTableList({
            demandName: this.queryCondition.demandName,
            demandTypeId: OPTIONS[i].id,
            adopt: this.queryCondition.adopt,
          })
        }
      }
    },
    resetData() {
      //重置
      this.selectedItems = []
    },

    // 查询类型
    handleChange(selectedItems) {
      this.selectedItems = selectedItems
    },
    //审核状态
    handleChangea(value) {
      this.queryCondition.adopt = value.key
      this.loadData()
      // this.$refs.table.refresh(false)
    },
    // 审核按钮弹窗状态
    showModal(record) {
      // console.log(record.batchId) //批次号
      // console.log(record.demandTypeId)//需求类型
      // console.log(record.adopt)//审核状态

      return demandInfoByBatchId({ batchId: record.batchId, demandTypeId: record.demandTypeId }).then((res) => {
        if (res.state == 2000) {
          this.demandInfo = res.data
          if (this.demandInfo.attribute) {
            this.demandInfo.attribute = JSON.parse(this.demandInfo.attribute)
          }
          if (this.demandInfo.banner) {
            this.demandInfo.banner = this.demandInfo.banner.split(',')
          }
          if (this.demandInfo.otherAttribute) {
            this.demandInfo.otherAttribute = JSON.parse(this.demandInfo.otherAttribute)
            if (this.demandInfo.otherAttribute.livetime) {
              this.demandInfo.otherAttribute.livetime = this.demandInfo.otherAttribute.livetime.split('-')
            }
            if (this.demandInfo.otherAttribute.productmonthnumber) {
              this.demandInfo.otherAttribute.productmonthnumber = this.demandInfo.otherAttribute.productmonthnumber.split(',')
            }
          }
          if (this.demandInfo.price) {
            this.demandInfo.price = JSON.parse(this.demandInfo.price)
            if (this.demandInfo.price.competition) {
              this.demandInfo.price.competition = this.demandInfo.price.competition.split(',')
            }
            if (this.demandInfo.price.setmeal) {
              this.demandInfo.price.setmeal = this.demandInfo.price.setmeal.split(',')
            }
            if (this.demandInfo.price.specialshow) {
              this.demandInfo.price.specialshow = this.demandInfo.price.specialshow.split(',')
            }

            if(this.demandInfo.price.servicePrice){
               this.demandInfo.price.servicePrice =this.demandInfo.price.servicePrice.split(',');
            }
          }
          if(this.demandInfo.labelList){
            this.demandInfo.labelList = JSON.parse(this.demandInfo.labelList);
          }


          console.log(this.demandInfo);

        }
        this.visiblea = true
        this.state = true
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
    en(e) {
      this.enlarge = false
    },
    // 取消按钮
    cancel() {
      this.visiblea = false
    },
    // 审核
    Save(val) {
      return updateAdoptCompanu({ adopt: val, batchId: this.demandInfo.batchId, demandTypeId:this.demandInfo.demandTypeId}).then((res) => {
        if(res.state ==2000){
          this.$notification.success({
            message: '提示',
            description: '审核完成',
          })
          this.visiblea = false
          this.loadData()
        }
      })
    },
  },
  mounted() {
    this.loadData()
  },
}
</script>
<style >
.modal_box {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.ant-carousel {
  width: 75%;
}

  #details{
    width: 320px;

  }

  #details p {
    margin-bottom : 0;
  }


   #details img {
    width: 100% ;
  }

</style>