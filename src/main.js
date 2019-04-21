import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'

Vue.config.productionTip = false

const vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

vue.$Message.config({
  // top: 100,
  duration: 2
})
