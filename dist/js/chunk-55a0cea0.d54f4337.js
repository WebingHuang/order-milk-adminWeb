(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55a0cea0"],{"004c":function(t,a,e){"use strict";e.r(a);e("a4d3"),e("e01a"),e("b0c0");var s=function(){var t=this,a=t._self._c;return a("page-header-wrapper",{scopedSlots:t._u([{key:"content",fn:function(){return[a("div",{staticClass:"page-header-content"},[a("div",{staticClass:"avatar"},[a("a-avatar",{attrs:{size:"large",src:t.user.userHeader}})],1),a("div",{staticClass:"content"},[a("div",{staticClass:"content-title"},[t._v(" "+t._s(t.timeFix)+"，"+t._s(t.user.openName)),a("span",{staticClass:"welcome-text"},[t._v("，"+t._s(t.welcome))])]),a("div",[t._v("臻香科技有限公司")])])])]},proxy:!0},{key:"extraContent",fn:function(){return[t.isAdmin?a("div",{staticClass:"extra-content"},[a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"月销售额",value:t.money}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"销售总额",value:t.sumMoney}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"用户数量",value:t.userCount}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"每日/订单数量",value:t.orderCount}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"订单数量",value:t.orderSum}})],1)]):t._e(),t.isAgent?a("div",{staticClass:"extra-content"},[a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"月销售额",value:t.agentInfo.month}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"销售总额",value:t.agentInfo.performance}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"用户数量",value:t.agentInfo.userCount}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"每日/订单数量",value:t.agentInfo.intraDayCount}})],1),a("div",{staticClass:"stat-item"},[a("a-statistic",{attrs:{title:"订单数量",value:t.agentInfo.performanceCount}})],1)]):t._e()]},proxy:!0}])},[a("div",[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{xl:16,lg:24,md:24,sm:24,xs:24}},[a("a-card",{staticClass:"project-list",staticStyle:{"margin-bottom":"24px"},attrs:{loading:t.loading,bordered:!1,title:"进行中的订单","body-style":{padding:0}}},[a("a",{attrs:{slot:"extra"},slot:"extra"},[t._v("全部项目")]),a("div",t._l(t.projects,(function(e,s){return a("a-card-grid",{key:s,staticClass:"project-card-grid"},[a("a-card",{attrs:{bordered:!1,"body-style":{padding:0}}},[a("a-card-meta",[a("div",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[a("a-avatar",{attrs:{size:"small",src:e.cover}}),a("a",[t._v(t._s(e.title))])],1),a("div",{staticClass:"card-description",attrs:{slot:"description"},slot:"description"},[t._v(" "+t._s(e.description)+" ")])]),a("div",{staticClass:"project-item"},[a("a",{attrs:{href:"/#/"}},[t._v("科学搬砖组")]),a("span",{staticClass:"datetime"},[t._v("9小时前")])])],1)],1)})),1)]),a("a-card",{attrs:{loading:t.loading,title:"动态",bordered:!1}},[a("a-list",t._l(t.activities,(function(e,s){return a("a-list-item",{key:s},[a("a-list-item-meta",[a("a-avatar",{attrs:{slot:"avatar",src:e.user.avatar},slot:"avatar"}),a("div",{attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(e.user.nickname))]),t._v("  在 "),a("a",{attrs:{href:"#"}},[t._v(t._s(e.project.name))]),t._v("  "),a("span",[t._v(t._s(e.project.action))]),t._v("  "),a("a",{attrs:{href:"#"}},[t._v(t._s(e.project.event))])]),a("div",{attrs:{slot:"description"},slot:"description"},[t._v(t._s(e.time))])],1)],1)})),1)],1)],1),a("a-col",{staticStyle:{padding:"0 12px"},attrs:{xl:8,lg:24,md:24,sm:24,xs:24}},[a("a-card",{staticStyle:{"margin-bottom":"24px"},attrs:{title:"XX 指数",loading:t.radarLoading,bordered:!1,"body-style":{padding:0}}},[a("div",{staticStyle:{"min-height":"400px"}},[a("radar",{attrs:{data:t.radarData}})],1)]),a("a-card",{attrs:{loading:t.loading,title:"团队",bordered:!1}},[a("div",{staticClass:"members"},[a("a-row",t._l(t.teams,(function(e,s){return a("a-col",{key:s,attrs:{span:12}},[a("a",[a("a-avatar",{attrs:{size:"small",src:e.avatar}}),a("span",{staticClass:"member"},[t._v(t._s(e.name))])],1)])})),1)],1)])],1)],1)],1)])},r=[],i=e("5530"),n=(e("ac1f"),e("1276"),e("ca00")),o=e("2f62"),c=e("c0d2"),d=e("2af9"),l=e("b775"),u={queryAgentOrOrder:"/statistics/queryAgentOrOrder",queryUserOrOrder:"/statistics/queryUserOrOrder",queryAgentPerformance:"/agentUp/queryAgentPerformance"};function m(){return Object(l["b"])({url:u.queryAgentOrOrder,method:"get"})}function f(){return Object(l["b"])({url:u.queryUserOrOrder,method:"get"})}var v=e("7104"),p={name:"Workplace",components:{PageHeaderWrapper:c["b"],Radar:d["i"]},data:function(){return{timeFix:Object(n["a"])(),avatar:"",user:{},userCount:0,orderCount:0,orderSum:0,sumMoney:0,money:0,isAgent:!1,isAdmin:!1,agentInfo:{intraDayCount:0,performance:0,month:0,userCount:0,performanceCount:0},projects:[],loading:!0,radarLoading:!0,activities:[],teams:[],axis1Opts:{dataKey:"item",line:null,tickLine:null,grid:{lineStyle:{lineDash:null},hideFirstLine:!1}},axis2Opts:{dataKey:"score",line:null,tickLine:null,grid:{type:"polygon",lineStyle:{lineDash:null}}},scale:[{dataKey:"score",min:0,max:80}],axisData:[{item:"引用",a:70,b:30,c:40},{item:"口碑",a:60,b:70,c:40},{item:"产量",a:50,b:60,c:40},{item:"贡献",a:40,b:50,c:40},{item:"热度",a:60,b:70,c:40},{item:"引用",a:70,b:50,c:40}],radarData:[]}},computed:Object(i["a"])(Object(i["a"])({},Object(o["c"])({nickname:function(t){return t.user.nickname},welcome:function(t){return t.user.welcome}})),{},{currentUser:function(){return{name:"",avatar:""}},userInfo:function(){return this.$store.getters.userInfo}}),created:function(){this.user=this.userInfo.userInfo},mounted:function(){for(var t=this.user.roleCode.split(","),a=0;a<t.length;a++)"408a4bb3-8d47-496d-80c3-ac5bbb506ab3"!=t[a]&&"4eea9e70-e90e-4062-a551-d6855c958208"!=t[a]&&"8491a899-c115-434a-b72a-df3a6da00a16"!=t[a]&&"55520d80-5f7b-437c-909f-7008ba801aa1"!=t[a]&&"e4661c9e-1573-4d0d-a078-e820dcc89465"!=t[a]&&"01f21b2c-ca9d-4496-860a-8b2689920732"!=t[a]&&"8270240a-3564-4b35-84dc-189c68a64ffb"!=t[a]&&"1833c3ea-d4e4-42ef-9f80-3f43bb17a0cb"!=t[a]||(this.isAdmin=!0),"944f251d-2a9e-49d2-b416-7eaa6b68ee3f"!=t[a]&&"d2fe397f-2d95-4532-a1eb-74efbe242659"!=t[a]||(this.isAgent=!0);this.isAdmin&&this.queryUserOrOrder(),this.isAgent&&this.queryAgentOrOrder()},methods:{queryUserOrOrder:function(){var t=this;return f().then((function(a){200==a.code&&(t.orderCount=a.data.orderCount,t.orderSum=a.data.orderSum,t.userCount=a.data.userCount,t.sumMoney=a.data.sumMoney,t.money=a.data.money)})).catch((function(t){alert(t)}))},queryAgentOrOrder:function(){var t=this;return m().then((function(a){200==a.code&&(t.isAgent=!0,t.agentInfo.intraDayCount=a.data.intraDayCount,t.agentInfo.month=a.data.month,t.agentInfo.performance=a.data.performance,t.agentInfo.performanceCount=a.data.performanceCount,t.agentInfo.userCount=a.data.userCount)})).catch((function(a){t.isAgent=!1}))},getProjects:function(){var t=this;this.$http.get("/list/search/projects").then((function(a){t.projects=a.result&&a.result.data,t.loading=!1}))},getActivity:function(){var t=this;this.$http.get("/workplace/activity").then((function(a){t.activities=a.result}))},getTeams:function(){var t=this;this.$http.get("/workplace/teams").then((function(a){t.teams=a.result}))},initRadar:function(){var t=this;this.radarLoading=!0,this.$http.get("/workplace/radar").then((function(a){var e=(new v.View).source(a.result);e.transform({type:"fold",fields:["个人","团队","部门"],key:"user",value:"score"}),t.radarData=e.rows,t.radarLoading=!1}))}}},g=p,h=(e("dc72"),e("2877")),b=Object(h["a"])(g,s,r,!1,null,"449b02d2",null);a["default"]=b.exports},"56e4":function(t,a,e){},dc72:function(t,a,e){"use strict";e("56e4")}}]);