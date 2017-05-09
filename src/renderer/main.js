import Vue from 'vue'
// import axios from 'axios'
import Electron from 'vue-electron'
import Router from 'vue-router'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import routes from './routes'
// Vue.http = Vue.prototype.$http = axios
Vue.use(Electron)
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
