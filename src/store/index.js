import Vue from 'vue'
import Vuex from 'vuex'

import global from '@/store/global'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
  }
})

export default store
