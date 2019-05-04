// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import _ from 'lodash';
import echarts from 'echarts'

window._ = _;
Vue.use(VueResource);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
