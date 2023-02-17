<template>
  <div id="card">
    <page-header-wrapper>
      <!-- 搜索/筛选栏 查询/重置 -->
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="5" :sm="24">
                <a-form-item label="会员卡号">
                  <a-input v-model="queryCondition.Encode" placeholder="" />
                </a-form-item>
              </a-col>
              <a-col :md="5" :sm="24">

                 <a-form-model-item label="会员卡批次号">
                 <a-select mode="combobox" style="width: 100%"  @change="cardHolderChange"  v-model="queryCondition.BatchNo" @blur="cardHolderBlur" @select="cardHolderBlur">
                  <a-select-option v-for="(item) in cardBatchList" :key="item">
                    {{item}}
                  </a-select-option>
                </a-select>
               </a-form-model-item>
              </a-col>
              <a-col :md="5" :sm="24">
                <a-form-model-item label="代理商手机号">
                 <a-select mode="combobox" style="width: 100%"  @change="holderChange"  v-model="queryCondition.holderCode" @blur="holderCodeBlur" @select="holderCodeBlur">
                  <a-select-option v-for="(item) in userArrayByRloe.userPhone" :key="item">
                    {{item}}
                  </a-select-option>
                </a-select>
               </a-form-model-item>
              </a-col>
              <a-col :md="5" :sm="24">
                <a-form-model-item label="激活人手机号">
                 <a-select mode="combobox" style="width: 100%"  @change="holderChange"  v-model="queryCondition.activateUserCode" @blur="userRolderCodeBlur" @select="userRolderCodeBlur">
                  <a-select-option v-for="(item) in userArray.userPhone" :key="item">
                    {{item}}
                  </a-select-option>
                </a-select>
               </a-form-model-item>
              </a-col>
              <a-col :md="(!advanced && 4) || 24" :sm="24">
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

        <!-- 新建 -->
        <div class="table-operator" >
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
            <div @click="getCrodList">
               <download-excel
                    class="btn btn-default"
                    :data="json_data"
                    :fields="json_fields"
                    worksheet="会员卡"
                    :name="exclName"
                  >
                  <a-button type="primary" icon="download" >
                    Excel导出
                  </a-button>
                </download-excel>
            </div>
            <a-button  @click="getUserArray(1,true)">获取代理商最新数据</a-button>

             <a-upload
                :file-list="dataGrid.fileList"

                :before-upload="beforeUpload"
                accept=".xlsx,.xls">
                    <a-button  type="primary"> <a-icon type="upload" />Excel批量指派代理商</a-button>
            </a-upload>

            <a href="https://image.xianghuikejiapp.com/template/臻香卡分配代理商模板.xls">
                <a-button  icon="download" >
                  下载批量指派代理商Excel模板
                </a-button>
            </a>

        </div>
        <!-- 表格 -->
        <s-table
          ref="table"
          size="small"
          rowKey="encode"
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

          <span slot="action" slot-scope="text, record">
						
            <template>
              <a @click="handleEdit(record)">配置</a>
            </template>
						
          </span>
        </s-table>
				
      </a-card>
      <!-- 抽屉 -->
      <template>
        <div>
          <a-drawer
            :title="state ? '修改臻香卡' : '新增臻香卡'"
            :placement="placement"
            :closable="false"
            :visible="visible"
            @close="onClose"
            width="800px"
          >
            <a-form-model
              :model="cardForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
              ref="cardForm"
            >
              <a-form-model-item label="臻香卡标题" prop="cardName" >
                <a-input v-model="cardForm.cardName" placeholder="请输入卡名称" />
              </a-form-model-item>

               <a-form-model-item label="代理商手机号">
                 <a-select mode="combobox" style="width: 100%"  @change="holderCodeChange"  v-model="userPhone" @blur="holderBlur" placeholder="请选择代理商手机号">
                  <a-select-option v-for="(item) in userArrayByRloe2.userPhone" :key="item">
                    {{item}}
                  </a-select-option>
                </a-select>
               </a-form-model-item>

               <a-form-model-item label="商品类别" :required="true">
                 <a-select mode="combobox" style="width: 100%"  v-model="cardForm.type" placeholder="请选择商品类别">
                  <a-select-option v-for="(item) in commodityTypeList" :key="item">
                    {{item}}
                  </a-select-option>
                </a-select>
               </a-form-model-item>

                <a-form-model-item label="商品名称" v-if="!state">
                  <a-select mode="combobox" style="width: 100%"    v-model="cardForm.spuName" @blur="holderCodeBlur2" @select="holderCodeBlur2">
                    <a-select-option v-for="(item) in commodityData.spuName" :key="item">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>


               <a-form-model-item label="臻香卡二维码" v-if="state" >
                 <img :src="cardForm.qrimg" alt="" style="width:150px;height:150px;">
               </a-form-model-item>


              <a-form-model-item label="提货卡数量" v-if="!state" :required="true">
                <a-input v-model="cardForm.quantity" prop="quantity" placeholder="最小为1 最大为5000"/>
              </a-form-model-item>


              <a-form-model-item label="生成进度" v-if="progressNum!=0">
                <div>
                  <a-progress :percent="progressNum"  :status="progressNum==100? '': 'active'"/>
                </div>
              </a-form-model-item>



              <a-button type="primary" @click="handleOk" style="margin-left: 17%" :loading="iconLoading" > 确定 </a-button>
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


import { editCard ,getCardListPage , getfindByCardList,getUserArray,getBatchNoList ,updateCrodFlag,updateByCode,getQrImg,getCommodityList} from '@/api/system'

import { getTypeList } from '@/api/commodity'



import Vue from "vue";

import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);



import HeadCut from '@/views/system/user/HeadCut'

import XLSX from 'xlsx'




const columns = [
  {
    title: '编号',
    // scopedSlots: { customRender: 'serial' },

    dataIndex: 'encode',

    align: 'center',
  },
  {
    title: '会员卡名称',
    dataIndex: 'cardName',
    align: 'center',
  },
  {
    title: '商品类别',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '代理商',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdDate',
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
  0: {
    status: 'default',
    text: '未使用',
  },
  1: {
    status: 'success',
    text: '已使用',
  },

}

export default {
  name: 'card',
  components: {
    STable,
    Ellipsis,
    HeadCut,
    XLSX
  },
  data() {
    this.columns = columns
    return {
      dataGrid:{
        dataList:[],
        columns:[],//table头
        tableData:[],//table内容
      },
      iconLoading:false, //按钮状态
      progressNum:0,
      exclName:"",
      json_fields: {
            '臻香卡编号': 'encode',
            '代理商手机号': 'holderPhone',
            '批次号': 'batchNo',
            '提货卡名称': 'cardName',
            '提货卡卷码': 'cdkey',
            '代理商ID': 'holderCode',
            '激活者ID': 'activateUserCode',
            '激活时间': 'activateDate',
            '激活状态': 'stauts',
            '创建时间': 'createdDate',
            '更新时间': 'updateDate',
            '打印状态': 'flag',
            '二维码地址': 'ewmContent',

      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      commodityData:{
        spuId:[], //商品id
        spuName:[], //商品名称
        spuImg:[], //商品图片
      },

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



      //提货卡表单
      cardForm:{

        cardName:"", // 提货卡名称
        amount:"", // 提货卡金额
        holderCode:"", //持有者Id
        quantity:"", //生成数量
        startDate:"", // 开始时间
        overdueDate:"", // 过期时间
        type:"",
        spuName:"", //商品名称
        spuId:"", //商品id


      },


      // 表单验证
      rules: {
        cardName:[
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
      queryParam: {

      },
      queryCondition: {

        Encode: '', //提货卡ID
        holderCode:"",//代理商ID·
        BatchNo:"", //批次号
        activateUserCode:"",

      },
      holderCode:"",//代理商ID·
      activateUserCode:"", //激活者ID
      // 分页参数
      pageFrom: {
        // pageNum: 1, //第几次请求
        // pageSize: 10, //每页显示几条
        // totalPages: 0, //请求总次数
        // totalSize: 0, //所有数据数量
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {

        var datatime  = this.getCurrentTime();

        this.exclName = "臻香卡-"+datatime+".xls";


        const requestParameters = Object.assign({}, parameter, this.pageFrom)
        // console.log(this.queryCondition)

        return getCardListPage(requestParameters, {
          encode:this.queryCondition.Encode, //
          holderCode:this.holderCode, //
          batchNo:this.queryCondition.BatchNo, //
          activateUserCode:this.activateUserCode,

        })
          .then((res) => {
            if (res.code == 200) {
              this.exportExcl();
              //查询需要导出的数据


              res.result.items.map(item=>{
                if(item.loginTime){
                  // item.loginTime = this.$renderTime(item.loginTime);
                }
              })

              const pageData = {
                data: res.result.items,
                pageNo:Number(res.result.pageNum),
                pageSize:Number(res.result.pageSize),
                totalCount:Number(res.result.totalSize),
                totalPage: Number(res.result.totalPages),
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

      //用户数据
      userArray: {
        userName:[],
        userCode:[],
        userPhone:[]
      },
      //代理商数据
      userArrayByRloe: {
        userName:[],
        userCode:[],
        userPhone:[]
      },
      userArrayByRloe2:{
         userName:[],
        userCode:[],
        userPhone:[]
      },
      //商品类别
      commodityTypeList:[],

      //会员卡批次号数组
      cardBatchList:[],
      userPhone:"", // 手机号

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

     //查询商品数组
    getCommodityList(){

       return getCommodityList()
       .then((res) => {
            if(res.code == 200){
               this.commodityList = res.data;
               for(var i = 0; i < this.commodityList.length; i++){
                 this.commodityData.spuId[i] = this.commodityList[i].id;
                 this.commodityData.spuName[i] = this.commodityList[i].spuName;
                 this.commodityData.spuImg[i] = this.commodityList[i].imgUrl;

               }

            }

      })

    },

    unique(arr){
      var arr1 = [];       // 新建一个数组来存放arr中的值
      for(var i=0,len=arr.length;i<len;i++){
         if(arr1.indexOf(arr[i]) === -1){
            arr1.push(arr[i]);
         }
        }
      return arr1;
    },

    handleReadExcel (file) {
      const that = this
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        // console.log(ev)
        try {
          const fileData = ev.target.result
          const workbook = XLSX.read(fileData, {
            type: 'binary'
          })
          // console.log(workbook)
          const wsname = workbook.SheetNames[0] // 取第一张表

          // console.log(workbook.Sheets[wsname])

          let snArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          // console.log(snArr) // 读取到的SN列表
          // 遍历SN放入Set集合 snSet
          that.dataGrid.dataList = [];  // 清空一下之前的数据
          // that.dataGrid.dataList.clear();
          var phoneList = []; //存放所有的手机号

          snArr.forEach(item => {
            // console.log(item)
            phoneList.push(item['代理商手机号'])
            that.dataGrid.dataList.push(item)
          })


          for(var j = 0 ; j < that.dataGrid.dataList.length; j++){
            for(var i = 0; i < that.userArrayByRloe.userPhone.length; i++){
              if( that.dataGrid.dataList[j]['代理商手机号'] ==  that.userArrayByRloe.userPhone[i]){
                that.dataGrid.dataList[j]['holderCode']= that.userArrayByRloe.userCode[i];
                that.dataGrid.dataList[j]['holderPhone']= that.userArrayByRloe.userPhone[i];
                that.dataGrid.dataList[j]['encode'] = that.dataGrid.dataList[j]['臻香卡编号'];
                continue;
              }
            }
          }


          var data = [];

          that.dataGrid.dataList.map(item=>{
            data.push({
              encode:item.encode.toString(),
              holderCode:item.holderCode,//
              holderPhone:item.holderPhone,
            })
          })

          return updateByCode(data)
          .then((res) => {
              that.$refs.table.refresh(false)
            console.log(res)
          })

          // console.log(that.dataGrid)
          // 处理完SN列表之后可以开放OK按钮
          this.enableSubmit = false
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    },



     beforeUpload(file,fileList){//上传之前回调，判断上传类型

        this.handleReadExcel(file);
        return false;                //阻止上传
    },


    getCrodList(){
      console.log(this.json_data)

       return updateCrodFlag(this.json_data)
       .then((res) => {
        console.log(res)
       })
    },
     zeroFill(i){
      if (i >= 0 && i <= 9) {
       return "0" + i;
      } else {
        return i;
      }
    },

    getCurrentTime(){

      var date = new Date();//当前时间
      var month = this.zeroFill(date.getMonth() + 1);//月
      var day = this.zeroFill(date.getDate());//日
      var hour = this.zeroFill(date.getHours());//时
      var minute = this.zeroFill(date.getMinutes());//分
      var second = this.zeroFill(date.getSeconds());//秒

      //当前时间
      var curTime = date.getFullYear() + "-" + month + "-" + day
      + " " + hour + ':' + minute + ':' + second;

      return curTime;
    },


    //查询商品类型
    getTypeList(){

       return getTypeList()
       .then((res) => {
         console.log(res.data)
         this.commodityTypeList = [];

         res.data.map((item)=>{
           this.commodityTypeList.push(item.spuType);
         })

       })

    },

    // 查询会员卡批次号
    getBatchNoList(){
       return getBatchNoList()
       .then((res) => {
        if(res.code == 200){

          this.cardBatchList = res.data;

        }

       })

    },

    //查询所有代理商
    getUserArray(flag,state){

      var _this = this;



      _this.userArray.userName=[];
      _this.userArray.userCode=[];
      _this.userArray.userPhone=[];

      return getUserArray({
        flag:flag
      })
       .then((res) => {
        if(res.code == 200){

          if(flag ==1){
            //代理商

             _this.userArrayByRloe.userName = [];
             _this.userArrayByRloe.userCode = [];
             _this.userArrayByRloe.userPhone = [];


            res.data.forEach(item=>{
              _this.userArrayByRloe.userName.push(item.userName)
              _this.userArrayByRloe.userCode.push(item.userCode)
              _this.userArrayByRloe.userPhone.push(item.userPhone)

            })

            //为了防止控制台报错，同一个数组用在两个地方所以多创建一个数据+
            _this.userArrayByRloe2 =  _this.userArrayByRloe;

            // console.log( _this.userArrayByRloe2)


            if(_this.cardForm.holderCode){
              for(var i=0; i < _this.userArrayByRloe.userCode.length; i++){
                if(_this.cardForm.holderCode ==  _this.userArrayByRloe.userCode[i]){
                    _this.userPhone =   _this.userArray.userPhone[i];
                    break;
                }
              }
            }

          }else{

            // console.log("-----------")

             _this.userArray.userName = [];
             _this.userArray.userCode = [];
             _this.userArray.userPhone = [];

             res.data.forEach(item=>{
              _this.userArray.userName.push(item.userName)
              _this.userArray.userCode.push(item.userCode)
              _this.userArray.userPhone.push(item.userPhone)

            })


            if(_this.cardForm.holderCode){
              for(var i=0; i < _this.userArray.userCode.length; i++){
                if(_this.cardForm.holderCode ==  _this.userArray.userCode[i]){
                    _this.userPhone =   _this.userArray.userPhone[i];
                    break;
                }
              }
            }

          }

          if(state){
              _this.$notification.success({
                message: '提示',
                description: "获取成功",
              })
          }

        }

       })

    },

    //导出excl
    exportExcl(){

       return getfindByCardList({
         batchNo:this.queryCondition.BatchNo,
         encode:this.queryCondition.Encode,
         holderCode:this.holderCode,
         activateUserCode:this.activateUserCode,
       })
       .then((res) => {
        // console.log(res)
        this.json_data = res.data.body;
       })

    },

    //获取商品Id
    holderCodeBlur2(){
      var _this = this;
      if(_this.cardForm.spuName){
        for(var i = 0; i <_this.commodityData.spuName.length; i++){
          if(_this.cardForm.spuName == _this.commodityData.spuName[i]){
            _this.cardForm.spuId =  _this.commodityData.spuId[i];
            _this.cardForm.spuImg =  _this.commodityData.spuImg[i];
            break;
          }
        }
      }else{
          _this.cardForm.spuId = '';
      }
    },

    //获取代理商id
    holderCodeBlur(){
      var _this = this;
      _this.holderCode = '';
      if(_this.queryCondition.holderCode.length != 11){
        _this.queryCondition.holderCode = '';
      }else{

        for(var i = 0; i < _this.userArrayByRloe.userPhone.length; i++){
          if( _this.queryCondition.holderCode ==  _this.userArrayByRloe.userPhone[i] ){
            _this.holderCode =  _this.userArrayByRloe.userCode[i];
            break;
          }
        }
      }

    },
    //激活者id
    userRolderCodeBlur(){
      var _this = this;
       _this.activateUserCode = '';
      if(_this.queryCondition.activateUserCode.length != 11){
        _this.queryCondition.activateUserCode = '';
      }else{
        for(var i = 0; i < _this.userArray.userPhone.length; i++){
          if( _this.queryCondition.activateUserCode ==  _this.userArray.userPhone[i] ){

            _this.activateUserCode =  _this.userArray.userCode[i];
            break;
          }
        }
      }
    },

    holderBlur(){

    },

    //批次号移出事件
    cardHolderBlur(){

      var isok = false;
      for(var i=0; i < this.cardBatchList.length; i++){
        if(this.queryCondition.BatchNo == this.cardBatchList[i]){
          isok =true;
          break;
        }
      }

      if(!isok){
        this.queryCondition.BatchNo = '';
      }

    },

    //会员卡批次号监听
    cardHolderChange(value){

    },
    holderCodeChange(value){
       if(value.length==11){
         for(var i = 0; i < this.userArrayByRloe2.userPhone.length; i++){
          if(this.userArrayByRloe2.userPhone[i] == value){

             this.cardForm.holderCode = this.userArrayByRloe2.userCode[i];
             break;
          }
        }
      }

    },

    //持有人监听
    holderChange(value){

    },

    userholderChange(value){

    },
    onClose() {
      this.visible = false
    },
    onChange(e) {
      this.placement = e.target.value
    },


    en(e) {
      this.enlarge = false
    },

    //新增
    handleAdd() {
      this.state = false
      this.preview = false
      this.preview1 = false
      this.cardForm.cardName ="";
      this.cardForm.spuId = '';
      this.cardForm.spuName = '';
      this.cardForm.amount ="";
      this.cardForm.holderCode ="";
      this.cardForm.quantity ="";
      this.cardForm.type ="";
      this.userPhone = '';
      this.cardForm.startDate ="";
      this.cardForm.overdueDate ="";
      this.visible = true;
      this.progressNum = 0;

      this.getUserArray(1);

      this.getUserArray();

      this.getTypeList();

    },
    // 修改
    handleEdit(record) {

      var _this = this;

      // console.log(record)


       return getQrImg({
        encode: record.encode
       }).then((res) => {

        _this.cardForm['encode'] = record.encode;
        _this.cardForm['qrimg'] = res.data;
        _this.cardForm.cardName = record.cardName;
        _this.cardForm.holderCode = record.holderCode;
        _this.userPhone = record.holderPhone;
        _this.cardForm.type = record.type;
        _this.progressNum = 0;
        _this.visible = true
        _this.state = true;



       })








    },
    // 删除
    handleDel(record) {

      return removeUser({
        dataVersion:record.dataVersion, //
        userCode:record.userCode, //
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
      alert()

        var that = this
        this.$confirm({
          title: '警示',
          content: '确定要全部删除吗?',
          onOk() {
            alert()
            return removeUser({
              dataVersion:record.dataVersion, //
              userCode:record.userCode, //
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

    },
    // 提交
    handleOk(e) {




      this.$refs.cardForm.validate((valid) => {

        // 校验未全部通过，结束当前提交 (验证失败)
        // this.companyForm.oldImg = this.oldImg.join(',')
        if (!valid) {
          return false

        } else {


          if(this.cardForm.type==''){
             this.$message.warning('商品类别不能为空');
             return
          }else if(this.cardForm.quantity=='' && !this.state){
             this.$message.warning('生成数量不能为空');
             return
          }




          this.iconLoading = true;
          if(!this.state){
            this.progressNum = 50;
          }




          return editCard(this.state,this.state?
          {
            encode:this.cardForm.encode, // 卡片id
            holderCode:this.cardForm.holderCode, // 持有者id
            holderPhone:this.userPhone, //代理商手机号
          }:{
            //新增参数
            amount:this.cardForm.amount, //金额
            cardName:this.cardForm.cardName, // 提货卡名称
            holderCode:this.cardForm.holderCode, // 持有者id
            holderPhone:this.userPhone, //代理商手机号
            quantity:this.cardForm.quantity, //生成数量
            activateUserCode:"", //
            type:this.cardForm.type, //商品类别
            donorCode:"",
            spuId:this.cardForm.spuId

          }).then((res) => {
            if(res.code == 200){
              this.$refs.table.refresh(false)
               this.exportExcl();
              // 查询所有服务商
              this.getUserArray(1);
              this.getUserArray();
              this.getBatchNoList();
              this.$notification.success({
                message: '提示',
                description: "操作成功",
              })
              this.iconLoading = false;
               if(!this.state){
                this.progressNum = 100;
              }

              setTimeout(() =>{
               this.visible = false
              },1000)

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

    this.exportExcl();

    // 查询所有服务商
    this.getUserArray(1);

    this.getUserArray();

    this.getBatchNoList();
    this.getCommodityList();

  },
  watch: {
    // 去掉表单验证信息二次打开残留
    visible(val, newVal) {
      //监听的是控制模态框显示或隐藏开关的布尔值
      // 监视dialog状态（打开、关闭）
      if (val) {
        try {
          this.$refs['cardForm'].clearValidate() // 重置编辑表单,移出验证
        } catch (e) {}
      }
    },
  },
}
</script>

<style lang="less" scope>
  #card{
    .table-operator{
       display: flex;
       align-items: center;
      button{
        display: flex;
        align-items: center;
        .anticon-download{
          font-size: 18px;
        }
      }

    }
  }

</style>