<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="user.userHeader"/>
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.openName }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <div>臻香科技有限公司</div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content" v-if="isAdmin">
        <div class="stat-item">
          <a-statistic title="月销售额" :value="money" />
        </div>
        <div class="stat-item">
          <a-statistic title="销售总额" :value="sumMoney" />
        </div>
        <div class="stat-item">
          <a-statistic title="用户数量" :value="userCount" />
        </div>
        <div class="stat-item">
          <a-statistic title="每日/订单数量" :value="orderCount"  />
        </div>
        <div class="stat-item">
          <a-statistic title="订单数量" :value="orderSum" />
        </div>
      </div>

       <div class="extra-content" v-if="isAgent">
        <div class="stat-item">
          <a-statistic title="月销售额" :value="agentInfo.month" />
        </div>
        <div class="stat-item">
          <a-statistic title="销售总额" :value="agentInfo.performance" />
        </div>
        <div class="stat-item">
          <a-statistic title="用户数量" :value="agentInfo.userCount" />
        </div>
        <div class="stat-item">
          <a-statistic title="每日/订单数量" :value="agentInfo.intraDayCount"  />
        </div>
        <div class="stat-item">
          <a-statistic title="订单数量" :value="agentInfo.performanceCount" />
        </div>
      </div>


    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的订单"
            :body-style="{ padding: 0 }">
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover"/>
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar"/>
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <!-- <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card> -->
          <a-card
            title="XX 指数"
            style="margin-bottom: 24px"
            :loading="radarLoading"
            :bordered="false"
            :body-style="{ padding: 0 }">
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData"/>
            </div>
          </a-card>
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar"/>
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'



import { queryUserOrOrder,queryAgentPerformance,queryAgentOrOrder } from '@/api/workplace'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},


      userCount:0,
      orderCount:0,
      orderSum:0,
      sumMoney:0,
      money:0,
      isAgent:false,
      isAdmin : false,

      agentInfo:{
        intraDayCount: 0,
        performance: 0,
        month: 0,
        userCount: 0,
        performanceCount: 0
      },

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [{
        dataKey: 'score',
        min: 0,
        max: 80
      }],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    currentUser () {
      return {
        name: '',
        avatar: ''
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {

    this.user =  this.userInfo.userInfo;




    // getRoleList().then(res => {
    //   // console.log('workplace -> call getRoleList()', res)
    // })

    // getServiceList().then(res => {
    //   // console.log('workplace -> call getServiceList()', res)
    // })
  },
  mounted () {


    let user_roleList = this.user.roleCode.split(",");

    for (let i = 0; i < user_roleList.length;i++){
      if(user_roleList[i] == '408a4bb3-8d47-496d-80c3-ac5bbb506ab3' ||
         user_roleList[i] == '4eea9e70-e90e-4062-a551-d6855c958208' ||
         user_roleList[i] == '8491a899-c115-434a-b72a-df3a6da00a16' ||
         user_roleList[i] == '55520d80-5f7b-437c-909f-7008ba801aa1' ||
         user_roleList[i] == 'e4661c9e-1573-4d0d-a078-e820dcc89465' ||
         user_roleList[i] == '01f21b2c-ca9d-4496-860a-8b2689920732' ||
         user_roleList[i] == '8270240a-3564-4b35-84dc-189c68a64ffb' ||
         user_roleList[i] == '1833c3ea-d4e4-42ef-9f80-3f43bb17a0cb'
      ){
        this.isAdmin = true;
      }

      if( user_roleList[i] == '944f251d-2a9e-49d2-b416-7eaa6b68ee3f'||  user_roleList[i] == 'd2fe397f-2d95-4532-a1eb-74efbe242659'){

        this.isAgent = true;
      }
    }


    if(this.isAdmin){
      this.queryUserOrOrder();
    }

    if(this.isAgent){
     this.queryAgentOrOrder();
    }


  },
  methods: {


    queryUserOrOrder(){

      return queryUserOrOrder()
       .then((res) => {

         if(res.code == 200){
           this.orderCount  = res.data.orderCount;
           this.orderSum  = res.data.orderSum;
           this.userCount  = res.data.userCount;
           this.sumMoney = res.data.sumMoney;
           this.money = res.data.money;


         }

        })

        .catch((err) => {
              alert(err)
        })

    },

    queryAgentOrOrder(){

      return queryAgentOrOrder()
       .then((res) => {

         if(res.code == 200){
           this.isAgent = true;
           this.agentInfo.intraDayCount = res.data.intraDayCount;
           this.agentInfo.month = res.data.month;
           this.agentInfo.performance = res.data.performance;
           this.agentInfo.performanceCount = res.data.performanceCount;
           this.agentInfo.userCount = res.data.userCount;

         }
        })
        .catch((err) => {
             console.log(err)
           this.isAgent = false;

        })

    },

    getProjects () {
      this.$http.get('/list/search/projects')
        .then(res => {
          this.projects = res.result && res.result.data
          this.loading = false
        })
    },
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.result
        })
    },
    getTeams () {
      this.$http.get('/workplace/teams')
        .then(res => {
          this.teams = res.result
        })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar')
        .then(res => {
          const dv = new DataSet.View().source(res.result)
          dv.transform({
            type: 'fold',
            fields: ['个人', '团队', '部门'],
            key: 'user',
            value: 'score'
          })

          this.radarData = dv.rows
          this.radarLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./Workplace.less";

  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }

    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;

      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }

      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }

    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;

      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }

      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
