<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="所属类目" block style="padding-bottom: 11px; border-bottom: none">
          <div>
            <span v-for="item in articleTypeList" :key="item.id" @mousemove="TabClick(item.childrens)">
              <a-button class="button" style="vertical-align: middle">
                <span>
                  {{ item.articleType }}
                </span>
              </a-button>
            </span>
            <br />
            <div class="dropdown-s">
              <span v-for="i in articleTypeList2" :key="i.id">
                <a-button @click="onQuery(i.id)">
                  {{ i.articleType }}
                </a-button>
              </span>
            </div>
          </div>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">

      <a-list
        :data-source="content"
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1, column: 4  }"
        :showSizeChanger="true"
        :pagination="{ ...paginationProps }"
        rowKey="id"
      >
        <a-list-item slot="renderItem" slot-scope="item,index">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>
            <img slot="cover" :src="item.cover" class="zbc_img" />
            <a-card-meta :title="item.articleTitle" :description="item.description">
              <a-avatar slot="avatar" :src="item.photoSrc" />
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.releaseTime | fromNow }}</span>
              <div class="avatarList">
                <avatar-list size="small" :max-length="2">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>
              </div>
            </div>
            <template slot="actions" class="ant-card-actions">
              <a-tooltip title="查看文章">
                <a-icon key="eye" type="eye" @click="showArticle(item.batchId)" />
              </a-tooltip>
              <a-tooltip title="编辑文章">
                <a-icon key="edit" type="edit" @click="reviseArticle(item.batchId)" />
              </a-tooltip>
              <a-tooltip title="删除文章">
                <a-icon key="delete" type="delete" @click="deleteArticle(item.id, index)" />
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </a-list>
      <a-modal v-model="visible" title="文章预览" height="500px" width="1165px" okText="返回" :footer="null">
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
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import { getArticleList, getArticleType, deleteArticleList, getArticleByBatchId } from '@/api/article'
import Bus from '@/utils/bus.js'


const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
  },
  data() {
    return {

      modalWidth: '375px',   // 文章电脑/手机预览功能参数
      viewArticle: {    // 查看文章
        articleTitle: '',
        content: '',
      }, 
      articleState: 1, // 文章修改状态
      articleContent: '', // 兄弟组件传值
      state: '列表',
      // 查询参数
      queryCondition: {
        articleTitle: '',
        adopt: 2,
        articleTypeId: '',
        userId: '',
      },
      // 分页参数
      pageFrom: {
        pageNum: 1, // 第几次请求
        pageSize: 8, // 每页显示几条
        // totalPages: 0, // 请求总次数
        // totalSize: 0, // 所有数据数量
      },
      content: [], //文章列表
      articleTypeList: [], //文章类型列表
      articleTypeList2: [],
      artTyLChildren: [], //文章类型列表--二级
      data: {
        pageNum: 0,
        pageSize: 8,
        totalPages: 0,
        totalSize: 0,
      },
      form: this.$form.createForm(this),
      loading: true, //  文章列表
      visible: false, // 查看文章
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).utc().format('lll')
    },
    // fromNow (date) {
    //   return moment(date).fromNow()
    // }
  },
  computed: {
    // 分页
    paginationProps() {
      const _this = this
      return {
        hideOnSinglePage: true,
        defaultCurrent: 1,
        pageSize: this.data.pageSize,
        total: this.data.totalSize,
        onChange(page, pageSize) {
          var pageNo = page
          const query = { page, pageNo, pageSize }
          return getArticleList( query, _this.queryCondition).then((res) => {
            _this.content = res.data.content
            _this.defaultCurrent = res.data.pageNum
          })
        },
      }
    },
  },
  methods: {
    // to do
    TabClick(item) {
      this.articleTypeList2 = item
    },
    onQuery(i) {
      return getArticleType(i).then((res) => {
      })
    },
    //获取列表信息
    getList() {
      return getArticleList(this.pageFrom, this.queryCondition)
        .then((res) => {
          if (res.state === 2000) {
            this.data.pageSize = res.data.pageSize
            this.data.pageNum = res.data.pageNum
            this.data.totalPages = res.data.totalPages
            this.data.totalSize = res.data.totalSize
            this.content = res.data.content
            
            this.loading = false
          }
        })
        .catch((err) => {
          //  console.error(err);
        })
    },
    onChange(value) {
    },

    //查询文章类型
    getArticleType() {
      return getArticleType(this.queryCondition).then((res) => {
        this.articleTypeList = res.data
      })
    },
    //删除文章
    deleteArticle(id, index) {
      return deleteArticleList({ idArr: id , type: '4' }).then((res) => {
        this.content.splice(index, 1)
      })
    },
    //编辑文章
    reviseArticle(batchId) {
      const that = this
      this.$router.push('/article/editArticle')
      getArticleByBatchId({ batchId: batchId }).then((res) => {
        if (res.state === 2000) {
          that.articleContent = res
        }
        var data = []
        var artContent = JSON.parse(that.articleContent.data.html).html
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
        // imgSrc.push(that.articleContent.data.cover)
        Bus.$emit('bid', [that.articleContent.data, that.articleState, imgSrc])
      })
    },
    //预览文章
    showArticle(batchId) {
      const that = this
      getArticleByBatchId({ batchId: batchId }).then((res) => {
        that.visible = true
        that.viewArticle.articleTitle = res.data.articleTitle
        that.viewArticle.content = JSON.parse(res.data.html).html
      })
    },

    //文章电脑/手机预览功能
    showDesktop() {
      this.modalWidth = '960px'
    },

    showPhone() {
      this.modalWidth = '375px'
    },

    // 获取用户本地的localstorage
    getLocalStorage () {
      this.queryCondition.userId = JSON.parse(localStorage.getItem('cf01'));
    },
  },
  mounted() {
    this.getList()
    this.getArticleType()
    this.getLocalStorage()
    this.$emit('childByValue', this.state)
    Bus.$on('query', (val) => {
      this.queryCondition.articleTitle = val
      this.getList()
    })
  },
}
</script>

<style lang="less" scoped>
#fixedRight {
  margin-left: 935px;
  margin-bottom: 10px;
}
// /deep/ #mobile:focus {
//   color: aqua;
//   border-color:aqua
// }
.ant-btn:focus:not(.ant-btn-primary):not(.ant-btn-danger),
.ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
  color: white;
  border-color: white;
}
.ant-form {
  height: 60px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
}
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  padding: 5px 15px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  justify-content: center;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button:hover {
  color: #595959 !important;
  border-color: #000000 !important;
}
button:focus {
  color: #000000 !important;
  border-color: #000000 !important;
}

.button span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.3s;
}

.button:hover span {
  padding-right: 15px;
}

.button:focus span {
  outline: none;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
.dropdown-s button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  margin-right: 20px;
  padding: 5px 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  justify-content: center;
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

/deep/ .dropdown-s {
  word-wrap: break-word; //设置文本自动换行
  word-break: normal;
}

// /deep/ .ant-row {
//   width: 100%;
//   overflow-x: hidden;
//   overflow-y: scroll;
//   max-height: 600px !important;
// }
/deep/ .ant-row::-webkit-scrollbar {
  display: none !important;
}
/deep/ .ant-card-head-title {
  text-align: center;
}
.zbc_img {
  height: 250px;
}
</style>