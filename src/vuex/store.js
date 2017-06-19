import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user:'',
  homeUser:''
}

const mutations = {
  isLogin(state,user){
    localStorage.user = user
    state.user = user
  },
  isHomeLogin(state,user){
    localStorage.homeUser = user
    state.homeUser = user
  }
}
export default new Vuex.Store({
  state,
  mutations
})
