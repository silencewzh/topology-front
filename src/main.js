import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import './plugins/element.js'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
