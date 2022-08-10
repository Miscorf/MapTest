import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestMap from '@/components/Map'
import test from '@/components/test'
import moniter from "@/components/moniter";
import frequency from '@/components/map/frequency';
import equalLineMap from '@/components/map/equalLineMap'
import plotyContour from '@/components/map/plotlyContour'
import plotlyContourSetting from '@/components/map/plotlyContourSetting'
Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Map',
			component: TestMap
		},
		{
			path:'/moniter',
			name:'moniter',
			component: moniter
		},
		{
			path:'/equal',
			name:equalLineMap,
			component:equalLineMap
		},
		{
			path:'/test',
			name:'plotyContour',
			component: plotyContour
		},
		{
			path:'/plotlyContourSetting',
			name:'plotlyContourSetting',
			component:plotlyContourSetting
		}
	]
})