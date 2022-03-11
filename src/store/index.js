import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    //主要是为了保存当前得用户状态token
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state,data) {
      state.user = data

      //为了防止数据得丢失，我们需要将数据放在本地得存储中
      // window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY,state.user)
    },
  },
  actions: {
  },
  modules: {
  }
})