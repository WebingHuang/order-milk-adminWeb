<template>
  <page-header-wrapper
  >
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search
        size="large"
        style="width: 80%; max-width: 522px;"
        v-if="state!='新增'"
        v-model="query"
        @focus="postQuery"
       >
          <template >
            <a-button type="primary" icon="search">
            </a-button>
          </template>
        </a-input-search>
      </div>
    </template>
    <router-view v-on:childByValue="childByValue"/>
  </page-header-wrapper>
</template>

<script>
import Bus from '@/utils/bus.js'
const getActiveKey = (path) => {
    switch (path) {
        //根据页面传进的url
        case '/article/articleTable':
            return '1'
        case '/article/editArticle':
            return '2'
        default:
            return '1'
    }
}
export default {
    name: 'ArticleLayout',
    data () {
        return{
           state: '',
           query: ''
        }
    },
    methods: {
      childByValue(value){
       this.state= value;
      },
      postQuery () {
        Bus.$emit('query',this.query);
      }

    },
    mounted () {

    }
}
</script>

<style lang="less" scoped>
.ant-pro-page-header-search{
    text-align: center;
    margin-bottom: 16px;
}
</style>