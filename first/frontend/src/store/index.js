import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      permissionCode: '',
      accessToken: '',
    }
  },
  getters: {
  },
  mutations: {
    SET_PERMISSION_CODE (state, code) {
      state.permissionCode = code
    },
    SET_ACCESS_TOKEN (state, token) {
      state.accessToken = token
    }
  },
  actions: {
    setPermissonCode (context, code) {
      context.commit('SET_PERMISSION_CODE', code)
    },
    setAccessToken (context, token) {
      context.commit('SET_ACCESS_TOKEN', token)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
