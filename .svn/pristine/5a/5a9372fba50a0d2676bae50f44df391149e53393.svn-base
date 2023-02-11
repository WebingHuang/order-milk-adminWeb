<template>
    <div>
        <a-row type="flex" justify="start">
          <a-col :span="16">
            <div class="article_f">
              <quill-editor
              :content="contents"
              class="editor"
              ref="myTextEditor"
              v-model="content"
              :options="editorOptions"
              >
              </quill-editor>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="article_s" ref="myTitleEditor">
              <div class="article_box">
                <label> 公告标题: </label>
                <a-input placeholder="请写一个标题吧"  v-model="articleTitle" />
              </div>

              <!-- <div class="article_box">
                <label> 描述: </label>
                <a-input placeholder="请写一个描述吧"  v-model="description" />
              </div> -->


            </div>

          </a-col>
        </a-row>
        <div class="save_btn">
             <a-button type="primary" @click="onEditorChange">提交</a-button>
        </div>

    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import { editorOptions } from '@/utils/vue-quill-editor-config'



import { editNotice } from '@/api/system'



Quill.register('modules/ImageExtend', ImageExtend)
import { TreeSelect } from 'ant-design-vue'
import Bus from '@/utils/bus.js'
import AvatarModal from './AvatarModal'

 // 选中所有子节点,只渲染父节点名称,如果取消,点哪个渲染哪个
const SHOW_PARENT = TreeSelect.SHOW_ALL

//图片预览需要调用
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  components: {
    quillEditor,
    AvatarModal
  },
  data () {
    return {
      cropper_show: true,      // 给AvatarModal传的值
      articleState: '0',    // 文章修改状态
      contents:'',
      state:"新增",
      visible: false,      // 文章预览
      loading: true,
      content: '',         // 文章内容
      articleTitle: '',    // 文章标题
      description: '',     // 文章描述
      articleTypeId: 0,    // 文章类型
      oldImg: [],          // 文章修改的图片
      userId: '',          // 用户信息
      visible: false,
      editorOptions: editorOptions,

      // 上传图片参数
      previewVisible: false,
      previewImage: '',
      fileList: [],             // 封面图片
      articleTypeData: [],     // 文章类型
      SHOW_PARENT,            // 权限树选择方式
      articleTypeValue: [],  // 文章类型id

      //接口参数
      articleForm : {
        articleTitle: '',
        articleTypeId: '',
        description: '',
        cover: '',
        img: [],
        oldImg: [],
        // batchId: '',
        adopt:'1',
        userId: '',
        articleTypeList: '',
        type: '4'
        // photoSrc: ''
      },

      // 裁剪的图片
      preview: '',
    }
  },

  methods: {
    //数组去重
     unique(allImg){
        for(var i = 0; i < allImg.length; i++ ){
          for( var j = i+1; j < allImg.length; j++) {
            if(allImg[i] == allImg[j]){
              allImg.splice(j,1);
              j--;
            }
          }
        }
        return allImg;
      },
    // 自定义数组合并并去重函数
    MergeArray(arr1,arr2) {
      var _arr = new Array();
      for (var i=0;i<arr1.length;i++) {
        _arr.push(arr1[i]);
      }
     for (var i=0;i<arr2.length;i++) {
      var flag = true;
        for (var j=0;j<arr1.length;j++) {
            if (arr2[i]==arr1[j]) {
              flag=false;
              break;
            }
        }
        if (flag)  {
          _arr.push(arr2[i]);
      }
    }
    return _arr;
    },

    //文章上传
    onEditorChange() {
      var docByClass = document.getElementsByClassName("ql-editor")[0];
      var index = docByClass.getElementsByTagName("img");
      var imgSrc = [];
      for(let i = 0; i < index.length; i++){
        imgSrc.push(index[i].src.slice(0));
      }
      var newArr =[];
      for(var i = 0; i < imgSrc.length; i++){
        if(newArr.indexOf(imgSrc[i]) == -1){
            newArr.push(imgSrc[i])
        }
       }
      imgSrc= newArr;
      // imgSrc.push(this.fileList[0].url);

      var duplicatedValues = [...new Set(this.oldImg[0])].filter( item => imgSrc.includes(item));
      this.img = this.MergeArray(imgSrc,duplicatedValues);

      this.img.push(this.preview);



      this.articleForm.articleTitle = this.articleTitle;

      // this.articleForm.description = this.description;

      /**
       * @articleState 状态 0是新增，1是修改
       */

      // console.log(this.articleState);

      // console.log(this.batchId)



      // return


      if(this.articleState ==1){

        this.articleForm.batchId = this.batchId;

      }






      var html = `<div id="content">` + this.content +  `</div>`;
      var htmls = {
        html: html
      }
      // to do
        if ( html.length > 6535 ) {
          this.$message.warning('文章长度过长，请修改一下！');
          return false;
        } else if ( this.articleTitle == '' || this.articleTitle == null) {
          this.$message.error('文章标题不能为空！');
          return false;
        } else if ( this.articleTitle.length >= 30 ) {
          this.$message.error('文章标题不能超过30字！');
          return false
        }
        // else if ( this.articleTypeValue == '' || this.articleTypeValue == null ) {
        //   this.$message.error('文章发布类型不能为空！');
        //   return false;
        // }
        else {


          // return
          return editNotice({
            	"content": htmls.html,
              // "createdDate": "",
              // "deleteFlag": "",
              "id": this.articleState ==1 ? this.articleForm.batchId:'',
              // "publishStatus": "",
              "title": this.articleForm.articleTitle,

          })
              .then(res =>{
                if( res.code == 200){
                  this.$message.info('文章发表成功！');
                  this.content = '';
                  this.articleTitle = '';
                  this.description = '';
                  this.preview = '';




                  window.location.reload();

                } else {
                  this.$message.warning('文章发表失败！');
                }
              })
        }

    },
    // 预览
    showModal() {
      this.visible = true;
    },

    handleCancel() {
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



    // 图片裁剪
    setavatar (url) {
      this.preview = url
    },

    editCropper () {
      this.cropper_show = true;
    }
  },
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted() {
    // this.articleForm.photoSrc = this.$store.getters.userInfo.userInfo.photoSrc;




    this.$emit('childByValue', this.state)

    Bus.$on('bid',(val) =>{


      // return
      this.contents = val[0].content;
      this.articleTitle =  val[0].title;


      this.batchId = val[0].id;
      this.articleState = val[1];
      this.oldImg.push(val[2]);


    })
  },
}
</script>

<style lang="less">
  .editor {
    line-height: normal !important;
    height: 500px;
}
  .soneditor{
    float: right;
    height: 500px;
    width: 500px;
    margin-top: -434px;
    text-align: justify;
    background-color: #eee;
}
  .save_btn{
    float: left;
    margin-top: 80px;
  }
.ql-bubble .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}

// 这样写，似乎可以解决页面样式相串的问题
.clearfix {
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container,
  .ant-upload-list-picture-card .ant-upload-list-item
  {
      // border: #ccc 1px solid;
      width: 400px;
      height: 300px;
      position:relative;
  }
}


.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.zbc_mask {
  position:absolute;
  width: 400px;
  height: 300px;
  left:50%;
  top:50%;
  margin-left:-200px;
  margin-top:-40px;
}



.article_s {
  margin-left: 20px;
  border: #ccc 1px solid;
  padding: 0 10px;
  padding-top: 10px;
  padding-bottom: 52.5px;
  position: absolute;
}
.article_f {
  position: relative;
}
.article_box {
  padding: 2px;
}
</style>