import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Routes from './router/index'
import axios from 'axios'
import store from './store'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const router = new VueRouter({
routes:Routes
})
Vue.config.productionTip = false
Vue.use(axios);

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
