(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d7f238a"],{2423:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var a=i("b775"),o={getArticleByBatchId:"/article/getArticleByBatchId",addArticle:"/article/addArticle",articleList:"/article/articleFindPage",deleteArticleList:"/article/deleteArticle",uploadFiles:"/gallery/upload",getArticleType:"/article/getArticleType",updateAdopt:"/article/updateAdopt",updateInfo:"/article/updateInfo"};function n(t){return Object(a["b"])({url:o.uploadFiles,method:"post",params:{},data:t})}},2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var a=i("6b75");function o(t){if(Array.isArray(t))return Object(a["a"])(t)}i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("a630");function n(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var r=i("06c5");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return o(t)||n(t)||Object(r["a"])(t)||c()}},"640c":function(t,e,i){"use strict";i("9d48")},"9d48":function(t,e,i){},bd1b:function(t,e,i){},f8e1:function(t,e,i){"use strict";i("bd1b")},fac3:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",[e("a-row",{attrs:{type:"flex",justify:"start"}},[e("a-col",{attrs:{span:16}},[e("div",{staticClass:"article_f"},[e("quill-editor",{ref:"myTextEditor",staticClass:"editor",attrs:{content:t.contents,options:t.editorOptions},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)]),e("a-col",{attrs:{span:8}},[e("div",{ref:"myTitleEditor",staticClass:"article_s"},[e("div",{staticClass:"article_box"},[e("label",[t._v(" 公司名称: ")]),e("a-input",{attrs:{placeholder:"请写一个标题吧"},model:{value:t.articleTitle,callback:function(e){t.articleTitle=e},expression:"articleTitle"}})],1)])])],1),e("div",{staticClass:"save_btn"},[e("a-button",{attrs:{type:"primary"},on:{click:t.onEditorChange}},[t._v("提交")])],1)],1)},o=[],n=i("c7eb"),r=i("1da1"),c=i("2909"),s=i("ade3"),l=(i("98a7"),i("7bec")),d=(i("a434"),i("fb6a"),i("4de4"),i("d3b7"),i("6062"),i("3ca3"),i("ddb0"),i("caad"),i("2532"),i("a4d3"),i("e01a"),i("a753"),i("8096"),i("14e1"),i("953d")),p=i("5dde"),u=i("5a9d"),f=i("fcac"),m=i("d8ad"),h=(i("c7cd"),function(){var t=this,e=t._self._c;return e("a-modal",{attrs:{title:"上传封面",visible:t.visible,maskClosable:!1,confirmLoading:t.confirmLoading,width:1e3,footer:null},on:{cancel:t.cancelHandel}},[e("a-row",[e("a-col",{style:{width:"450px",height:"350px"},attrs:{xs:24,md:12}},[e("vue-cropper",{directives:[{name:"show",rawName:"v-show",value:t.cropper_show,expression:"cropper_show"}],ref:"cropper",attrs:{img:t.options.img,info:!0,autoCrop:t.options.autoCrop,autoCropWidth:t.options.autoCropWidth,autoCropHeight:t.options.autoCropHeight,fixedBox:t.options.fixedBox,canScale:t.options.canScale,fixed:t.options.fixed,fixedNumber:t.options.fixedNumber,centerBox:t.options.centerBox,canMoveBox:t.options.canMoveBox,canMove:t.options.canMove,full:t.options.full},on:{realTime:t.realTime}})],1),e("a-col",{style:{height:"400px"},attrs:{xs:24,md:12}},[e("div",{staticClass:"avatar-upload-preview"},[e("img",{style:t.previews.img,attrs:{src:t.previews.url},on:{click:t.editCropper}})])])],1),e("br"),e("a-row",[e("a-col",{attrs:{lg:2,md:2}},[e("a-upload",{attrs:{name:"file",beforeUpload:t.beforeUpload,showUploadList:!1,data:{type:4}}},[e("a-button",{attrs:{icon:"upload"}},[t._v("选择图片")])],1)],1),e("a-col",{attrs:{lg:{span:1,offset:2},md:2}},[e("a-button",{attrs:{icon:"plus"},on:{click:function(e){return t.changeScale(1)}}})],1),e("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[e("a-button",{attrs:{icon:"minus"},on:{click:function(e){return t.changeScale(-1)}}})],1),e("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[e("a-button",{attrs:{icon:"undo"},on:{click:t.rotateLeft}})],1),e("a-col",{attrs:{lg:{span:1,offset:1},md:2}},[e("a-button",{attrs:{icon:"redo"},on:{click:t.rotateRight}})],1),e("a-col",{attrs:{lg:{span:2,offset:6},md:2}},[e("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.finish("blob")}}},[t._v("保存")])],1)],1)],1)}),b=[],g=(i("2b3d"),i("9861"),i("2423")),v={data:function(){return{cropper_show:!1,visible:!1,id:null,confirmLoading:!1,uploading:!1,options:{img:"",autoCrop:!0,autoCropWidth:400,autoCropHeight:300,fixedBox:!1,fixed:!0,fixedNumber:[4,3],canScale:!0,centerBox:!0,canMoveBox:!1,canMove:!0,full:!0},previews:{},previewVisible:!1,cover:""}},props:["msg"],methods:{edit:function(t){this.visible=!0,this.id=t},close:function(){this.id=null,this.visible=!1},cancelHandel:function(){this.close()},changeScale:function(t){t=t||1,this.$refs.cropper.changeScale(t)},rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},beforeUpload:function(t){this.cropper_show=!0;var e=new FileReader,i=this;return e.readAsDataURL(t),e.onload=function(){i.options.img=e.result},i.options.img&&(i.options.img=""),!1},finish:function(t){var e=this,i=this,a=new FormData;"blob"===t&&this.$refs.cropper.getCropBlob((function(t){var o=window.URL.createObjectURL(t);e.model=!0,e.modelSrc=o;var n=new File([t],"image.jpeg");return a.append("files",n),a.append("type",4),Object(g["a"])(a).then((function(t){i.$message.success("上传成功"),i.$emit("ok",t.data[0]),i.visible=!1,e.cropper_show=!1}))}))},realTime:function(t){this.previews=t},editCropper:function(){this.cropper_show=!0}},beforeUpdate:function(){this.cropper_show=this.msg}},y=v,w=(i("640c"),i("2877")),C=Object(w["a"])(y,h,b,!1,null,"a69c29a2",null),I=C.exports;d["Quill"].register("modules/ImageExtend",p["a"]);var x=l["a"].SHOW_ALL;function O(t,e){var i=new FileReader;i.addEventListener("load",(function(){return e(i.result)})),i.readAsDataURL(t)}var j={components:{quillEditor:d["quillEditor"],AvatarModal:I},data:function(){var t;return t={cropper_show:!0,articleState:"0",contents:"",state:"新增",visible:!1,loading:!0,content:"",articleTitle:"",description:"",articleTypeId:0,oldImg:[],userId:""},Object(s["a"])(t,"visible",!1),Object(s["a"])(t,"editorOptions",u["a"]),Object(s["a"])(t,"previewVisible",!1),Object(s["a"])(t,"previewImage",""),Object(s["a"])(t,"fileList",[]),Object(s["a"])(t,"articleTypeData",[]),Object(s["a"])(t,"SHOW_PARENT",x),Object(s["a"])(t,"articleTypeValue",[]),Object(s["a"])(t,"articleForm",{articleTitle:"",articleTypeId:"",description:"",cover:"",img:[],oldImg:[],adopt:"1",userId:"",articleTypeList:"",type:"4"}),Object(s["a"])(t,"preview",""),t},methods:{unique:function(t){for(var e=0;e<t.length;e++)for(var i=e+1;i<t.length;i++)t[e]==t[i]&&(t.splice(i,1),i--);return t},MergeArray:function(t,e){for(var i=new Array,a=0;a<t.length;a++)i.push(t[a]);for(a=0;a<e.length;a++){for(var o=!0,n=0;n<t.length;n++)if(e[a]==t[n]){o=!1;break}o&&i.push(e[a])}return i},onEditorChange:function(){for(var t=this,e=document.getElementsByClassName("ql-editor")[0],i=e.getElementsByTagName("img"),a=[],o=0;o<i.length;o++)a.push(i[o].src.slice(0));for(var n=[],r=0;r<a.length;r++)-1==n.indexOf(a[r])&&n.push(a[r]);a=n;var s=Object(c["a"])(new Set(this.oldImg[0])).filter((function(t){return a.includes(t)}));this.img=this.MergeArray(a,s),this.img.push(this.preview),this.articleForm.articleTitle=this.articleTitle,1==this.articleState&&(this.articleForm.batchId=this.batchId);var l='<div id="content">'+this.content+"</div>",d={html:l};return l.length>6535?(this.$message.warning("文章长度过长，请修改一下！"),!1):""==this.articleTitle||null==this.articleTitle?(this.$message.error("文章标题不能为空！"),!1):this.articleTitle.length>=30?(this.$message.error("文章标题不能超过30字！"),!1):Object(f["b"])({content:d.html,id:1==this.articleState?this.articleForm.batchId:"",title:this.articleForm.articleTitle}).then((function(e){200==e.code?(t.$message.info("文章发表成功！"),t.content="",t.articleTitle="",t.description="",t.preview="",window.location.reload()):t.$message.warning("文章发表失败！")}))},showModal:function(){this.visible=!0},handleCancel:function(){this.previewVisible=!1},handlePreview:function(t){var e=this;return Object(r["a"])(Object(n["a"])().mark((function i(){return Object(n["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(t.url||t.preview){i.next=4;break}return i.next=3,O(t.originFileObj);case 3:t.preview=i.sent;case 4:e.previewImage=t.url||t.preview,e.previewVisible=!0;case 6:case"end":return i.stop()}}),i)})))()},setavatar:function(t){this.preview=t},editCropper:function(){this.cropper_show=!0}},computed:{editor:function(){return this.$refs.myTextEditor.quillEditor}},mounted:function(){var t=this;this.$emit("childByValue",this.state),m["a"].$on("bid",(function(e){t.contents=e[0].content,t.articleTitle=e[0].title,t.batchId=e[0].id,t.articleState=e[1],t.oldImg.push(e[2])}))}},T=j,B=(i("f8e1"),Object(w["a"])(T,a,o,!1,null,null,null));e["default"]=B.exports},fcac:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"d",(function(){return r})),i.d(e,"e",(function(){return c})),i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return l}));var a=i("b775"),o={addCompany:"/company/addCompany",companyFindPage:"/company/companyFindPage",getCompanyListByUserId:"/company/getCompanyListByUserId",upDateCompany:"/company/updateCompany",deleteCompany:"/company/deleteCompany",filesCompany:"/gallery/upload",stateCompany:"/company/updateAdopt",typeCompany:"/company/getCompanyType",getCompanyIntroductionListPage:"/sys/CompanyIntroduction/findByCompanyIntroduction",editCompanyIntroduction:"/sys/CompanyIntroduction/SaveOrUpdateCompanyIntroduction",getCompanyIntroductionInfoById:"/sys/CompanyIntroduction/findOneById"};function n(t){return Object(a["b"])({url:o.editCompanyIntroduction,method:"post",data:t})}function r(t){return Object(a["b"])({url:o.getCompanyIntroductionInfoById,method:"get",params:t})}function c(t,e){return Object(a["b"])({url:o.getCompanyIntroductionListPage,method:"post",params:e,data:{pageNum:t.pageNo,pageSize:t.pageSize}})}function s(t){return Object(a["b"])({url:o.deleteCompany,method:"post",params:t})}function l(t){return Object(a["b"])({url:o.filesCompany,method:"post",params:{},data:t})}}}]);