/*
 * @Description: 
 * @version: 
 * @Author: Miracle_Sir
 * @Date: 2022-08-13 16:20:21
 * @LastEditors: Miracle_Sir
 * @LastEditTime: 2022-08-13 22:27:05
 */
import storage from 'store'
import { login, getInfo} from '@/api/login'
import { logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const schoolClass = {
  state: {
    schoolClassList: [],
    schoolList: {},
    schoolId: null,
  },

  mutations: {
    SET_SCHOOL_CLASS_LIST: (state, data) => {
      state.schoolClassList = data
    },
    SET_SCHOOL_LIST: (state, data) => {
      state.schoolList = data
    },
    SET_SCHOOL_ID: (state, data) => {
      state.schoolId = data
    },
  },

  actions: {
    // 设置学校班级的数据缓存
    setSchoolClassList({ commit }, data) {
      commit('SET_SCHOOL_CLASS_LIST', data)
    },
    // 设置学校的数据缓存
    setSchoolList({ commit }, data) {
      commit('SET_SCHOOL_LIST', data)
    },
    setSchoolId({ commit }, data) {
      commit('SET_SCHOOL_ID', data)
    },

  }
}

export default schoolClass
