<template>
  <div id="swiper">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <!-- <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="标题">
                  <a-input v-model="queryCondition.status" placeholder="" />
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
        </div> -->
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
            <video style="width: 50px; height: 50px" :src="record.imgUrl" />
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
            :title="state ? '修改' : '新增'"
            :placement="placement"
            :closable="false"
            :visible="visible"
            @close="onClose"
            width="800px"
          >
            <a-form-model
              :model="swiperForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
              ref="swiperForm"
            >
              <a-form-model-item label="视频标题" >
                <a-input v-model="swiperForm.imgDesc" />
              </a-form-model-item>


              <a-form-model-item label="上传文件" >
                <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false" :data="{ type: 4 }">
                  <a-button icon="upload">选择视频</a-button>
                </a-upload>
              </a-form-model-item>







              <a-form-model-item label="是否启用">
                <a-switch v-model="swiperForm.status" />
              </a-form-model-item>



              <a-button type="primary" @click="handleOk" style="margin-left: 17%"> 确定 </a-button>
            </a-form-model>
          </a-drawer>
        </div>
      </template>

      <div>
        <!-- 图片预览 -->
        <a-modal v-model="enlarge" title="预览" @ok="en" okText="完成" width="500px" cancelText="关闭">
          <video style="width: 200px; height: 200px" :src="icooon" class="preview" ></video>
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


import {  getSwperListPage ,editSwiper ,updateStatus ,delSwiper} from '@/api/system'

import {  uploadFiles } from '@/api/system'




import HeadCut from '@/views/resource/swiper/HeadCut'

// Vue.use(FormModel)
// import StepByStepModal from '@/views/list/modules/StepByStepModal'
// 引入操作/配置/弹出框组件
// import CreateForm from '@/views/list/modules/CreateForm'

const columns = [
  {
    title: '#',
    width: '70px',
    scopedSlots: { customRender: 'serial' },
    align: 'center',
  },
  {
    title: '文件名称',
    width: '100px',
    dataIndex: 'imgDesc',
    align: 'center',
  },
  {
    title: '视频',
    width: '50px',
    dataIndex: 'imgUrl',
    scopedSlots: { customRender: 'pic' },
    align: 'center',
  },
  {
    title: '状态',
    width: '100px',
    dataIndex: 'status',
    scopedSlots: { customRender: 'enable' },
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
        imgType:2, //
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
        //手机号
        status: '', //状态
        type:2, //轮播图

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
        return getSwperListPage(requestParameters, this.queryCondition)
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

    beforeUpload(file) {
      const formData = new FormData()

      formData.append('files', file)


       return uploadFiles(formData)
        .then((res) => {
            console.log(res)
            if(res.code == 200){
              this.$message.success('上传成功')
              this.swiperForm.imgUrl =res.imgesList[0];
              return false
            }
        })

    },

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
    onChange(e) {
      this.placement = e.target.value
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
    // 上传图片的回调函数,上传完成后请求后台处理图片接口
    handleChange({ file, fileList }) {
      if (file.status == 'removed') {
        this.oldImg.push(this.fileList[0].url)
        this.fileList = fileList
      }
      if (file.status == 'uploading') {
        //此处上传中的回调
        const myform = new FormData()
        myform.append('files', fileList[0].originFileObj)
        myform.append('type', 5)
        // // 上传图片接口
        return filesCompany(myform).then((res) => {
          // 返回图片链接
          this.companyForm.icon = res.data[0]
          this.fileList.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: res.data[0],
          })
        })
      }
    },
    // 上传图片的回调函数,上传完成后请求后台处理图片接口
    handleChange2({ file, fileList }) {
      if (file.status == 'removed') {
        this.oldImg.push(this.fileList2[0].url)
        this.fileList2 = fileList
      }
      if (file.status == 'uploading') {
        //此处上传中的回调
        const myform = new FormData()
        myform.append('files', fileList[0].originFileObj)
        myform.append('type', 5)
        // // 上传图片接口
        return filesCompany(myform).then((res) => {
          // 返回图片链接
          this.companyForm.licenseUrl = res.data[0]
          this.fileList2.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: res.data[0],
          })
        })
      }
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




      this.fileList.push({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: record.imgUrl,
      })

      if(record.imgUrl){
        this.preview = true;
      }

      this.visible = true
      this.state = true




    },
    // 删除
    handleDel(record) {

      console.log(record)

      return delSwiper({
        id:record.id.toString(),
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