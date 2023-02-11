/*
 * @Description: 
 * @version: 
 * @Author: Miracle_Sir
 * @Date: 2020-10-21 15:33:46
 * @LastEditors: Miracle_Sir
 * @LastEditTime: 2022-08-13 22:27:31
 */
const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  schoolClassList: state => state.schoolClass.schoolClassList,
  schoolId: state => state.schoolClass.schoolId,
}

export default getters
