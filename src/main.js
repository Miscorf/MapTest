import Vue from 'vue'
import App from './App.vue'

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
// import VueAMap from 'vue-amap';


// Vue.use(VueAMap);

// VueAMap.initAMapApiLoader({
// 	key: '69a644b5850292aff404a4fc7dd5e4ba',
// 	  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
// 	  // 默认高德 sdk 版本为 1.4.4
// 	  v: '1.4.4'
// });


Vue.config.productionTip = false
new Vue({
	
  render: h => h(App),
  router
}).$mount('#app')
