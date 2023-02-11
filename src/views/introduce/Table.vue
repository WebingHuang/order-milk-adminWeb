<template>
  <div id="swiper">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="标题">
                  <a-input v-model="queryCondition.title" placeholder="" />
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
          <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
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
            <img style="width: 50px; height: 50px" :src="record.imgUrl" />
          </span>

          <!-- 状态 -->
          <span slot="enable" slot-scope="text, record" type="primary" >

             <a-switch checked-children="开" un-checked-children="关" :checked='record.status==1' @click="editRow(record)" />

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
              <a @click="showArticle(record)">查看</a>
              <a-divider type="vertical" />
              <a @click="reviseArticle(record.id)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                <a>删除</a>
              </a-popconfirm>
            </template>
          </span>
        </s-table>
      </a-card>
      <!-- 模态框 -->
      <template>
        <div>
          <a-modal v-model="visible" title="详情预览" height="500px" width="1165px" okText="返回" :footer="null">
            <div id="fixedRight">
              <label>预览方式：</label>
              <a-button type="dashed" @click="showPhone" style="margin-right: 15px" id="mobile">
                <a-icon type="mobile" />
              </a-button>
              <a-button type="dashed" @click="showDesktop" id="desktop">
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

      <div>
        <!-- 图片预览 -->
        <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
          <img style="width: 200px; height: 200px" :src="icooon" class="preview" />
        </a-modal>
      </div>
    </page-header-wrapper>
  </div>
</template>

<style lang="less" scoped>
  .ant-upload.ant-upload-select-picture-card{
    width: 340px;
    height: 200px;
  }
</style>

<script>
// 引入表格组件 和
import { STable, Ellipsis } from '@/components'
// 引入调用接口方法


import { editSwiper ,updateStatus ,delSwiper ,getNoticeListPage,getNoticeInfoById,editNotice} from '@/api/system'


import { getCompanyIntroductionListPage,getCompanyIntroductionInfoById} from '@/api/company'





import HeadCut from '@/views/resource/swiper/HeadCut'

import Bus from '@/utils/bus.js'




const columns = [
  {
    title: '#',
    width: '70px',
    scopedSlots: { customRender: 'serial' },
    align: 'center',
  },
  {
    title: '通知标题',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '发布时间',
    dataIndex: 'createdDate',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate',
    align: 'center',
  },

  // {
  //   title: '状态',

  //   dataIndex: 'publishStatus',
  //   scopedSlots: { customRender: 'enable' },
  //   align: 'center',
  // },


  {
    title: '操作',
    dataIndex: 'action',

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
  name: 'swiper',
  components: {
    STable,
    Ellipsis,
    HeadCut,
  },
  data() {
    this.columns = columns
    return {
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // 右键菜单显示/隐藏
      menuVisible: false,
      //新增修改状态
      state: false,
      idfalse: false,




      //swiper图片表单
      swiperForm:{
        imgDesc:"", //
        imgType:1, //
        imgUrl:"", //
        skipUrl:"", //
        status:true, // 是否启用


      },


      // 表单验证
      rules: {
        imgDesc:[
          { required: true, message: '不能为空' },
        ],

        amount:[
           { required: true, message: '不能为空' },
        ],

        quantity:[
           { required: true, message: '不能为空' },
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

        title: '', //标题


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
        return getCompanyIntroductionListPage(requestParameters, this.queryCondition)
          .then((res) => {
            if (res.code == 200) {

              res.data.records.map(item=>{
                if(item.createdDate){
                  item.createdDate = this.$renderTime(item.createdDate);
                }
              })

              const pageData = {
                data: res.data.records,
                pageNo: Number(res.data.current),
                pageSize:Number(res.data.size),
                totalCount:Number(res.data.total),
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
      roleTypeList:[], //角色类型
      roleType:'',
      companyType: '',
      modalWidth: '375px',   // 文章电脑/手机预览功能参数
      viewArticle: {    // 查看文章
        articleTitle: '',
        content: '',
      },


      typeId: '',
      articleState: 1, // 文章修改状态

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

    editRow(item) {
      if(item.status == 1){
        item.status = 2;
      }else{
        item.status = 1;

      }
      return updateStatus({
          id:item.id,
          status: item.status
      }).then((res) => {
            if(res.code == 200){
              this.$notification.success({
                message: '提示',
                description: "操作成功",
              })
            }

      })

      console.log(item)
    },
    onClose() {
      this.visible = false
    },
    showPhone() {
      this.modalWidth = '375px'
    },
     //文章电脑/手机预览功能
    showDesktop() {
      this.modalWidth = '960px'
    },
    onChange(e) {
      this.placement = e.target.value
    },
    //编辑文章
    reviseArticle(batchId) {
      const that = this
      this.$router.push('/introduce/edit')

      getCompanyIntroductionInfoById({ id: batchId }).then((res) => {
        if (res.code === 200) {
          that.articleContent = res
          console.log()

        }
        var data = []
        var artContent = that.articleContent.data.content
        //使用正则表达式过滤出html片段中的img标签
        var artContents = artContent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (capture) {
          data.push(capture)
        })

        var imgSrc = []
        //使用正则表达式过滤出img元素中的src属性
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i


        for (let i = 0; i < data.length; i++) {
          var src = data[i].match(srcReg)

          imgSrc.push(src[1])
        }

        Bus.$emit('bid', [that.articleContent.data,  that.articleState, imgSrc])
      })
    },



    setavatar( url) {
      // console.log(url)
      this.swiperForm.imgUrl = url;
      this.preview = true
    },

    // 下拉树
    typeTreea(value) {
      console.log(value)

      this.userForm.roleCode = this.roleTypeList[value].roleCode;
      this.roleType = this.roleTypeList[value].roleName
    },

     //预览文章
    showArticle(batchId) {
      const that = this

        that.visible = true
        that.viewArticle.articleTitle = batchId.title
        that.viewArticle.content =batchId.content


    },






    examine(e) {
      this.visiblea = false
    },
    enlargeImg(record) {
      this.icooon = record.imgUrl
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

      this.swiperForm.imgDesc ='';

      this.swiperForm.imgUrl ='';

      this.swiperForm.skipUrl ='';

      this.swiperForm.status =true;

      this.visible = true;

    },
    // 修改
    handleEdit(record) {


      this.swiperForm.imgType = record.imgType;
      this.swiperForm.imgUrl = record.imgUrl;
      this.swiperForm.imgDesc = record.imgDesc;
      this.swiperForm.skipUrl = record.skipUrl;

      this.swiperForm.status = record.status==1? true: false;

      this.swiperForm['id'] = record.id;




      if(record.imgUrl){
        this.preview = true;
      }

      this.visible = true
      this.state = true




    },
    // 删除
    handleDel(record) {



      return editNotice({
        id:record.id.toString(),
        deleteFlag:0,
       }).then((res) => {
        this.$refs.table.refresh(false)
        this.$notification.success({
          message: '提示',
          description: '删除成功',
        })
      })
    },
    // 批量删除
    deleteAll(record) {


        var that = this
        this.$confirm({
          title: '警示',
          content: '确定要全部删除吗?',
          onOk() {

            return delSwiper({
              id:that.selectedRowKeys.join(',')
             }).then((res) => {
              that.$refs.table.refresh(false)
              that.$notification.success({
                message: '提示',
                description:'删除成功',
              })
            })
          },
          onCancel() {},
        })

    },
    // 提交
    handleOk(e) {
      this.$refs.swiperForm.validate((valid) => {

        // return
        // 校验未全部通过，结束当前提交 (验证失败)
        // this.companyForm.oldImg = this.oldImg.join(',')
        if (!valid) {
          return false

        } else {
          return editSwiper(this.state,this.state?
          {
            //修改参数
            imgDesc:this.swiperForm.imgDesc, //
            imgType:this.swiperForm.imgType,
            imgUrl:this.swiperForm.imgUrl, //
            skipUrl:this.swiperForm.skipUrl, //
            status:this.swiperForm.status ? 1 :0,
            id:this.swiperForm.id

          }:[{
            //新增参数
            imgDesc:this.swiperForm.imgDesc, //
            imgType:this.swiperForm.imgType,
            imgUrl:this.swiperForm.imgUrl, //
            // skipUrl:this.swiperForm.skipUrl, //
            status:this.swiperForm.status ? 1 : 0,


          }]

          ).then((res) => {
            if(res.code == 200){
              this.$refs.table.refresh(false)
              this.visible = false
              this.$notification.success({
                message: '提示',
                description: "操作成功",
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

    Bus.$on('query', (val) => {
      this.queryCondition.articleTitle = val
      // this.getList()
    })


  },
  watch: {
    // 去掉表单验证信息二次打开残留
    visible(val, newVal) {
      //监听的是控制模态框显示或隐藏开关的布尔值
      // 监视dialog状态（打开、关闭）
      if (val) {
        try {
          this.$refs['swiperForm'].clearValidate() // 重置编辑表单,移出验证
        } catch (e) {}
      }
    },
  },
}
</script>


<style lang="less" scoped>

#fixedRight {
  margin-left: 935px;
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
  .viewArticle::-webkit-scrollbar{
    width: 0 !important
  }
  .viewArticle {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
</style>