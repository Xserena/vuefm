// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import animated from 'animate.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import {store} from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(ElementUI)
// Vue.prototype.$axios = axios   //axios全局配置

// axios.defaults.baseURL='https://wd2568393879ybwalu.wilddogio.com/'    //axios配置借口
/* eslint-disable no-new */

//全局守卫
router.beforeEach((to,from,next)=>{
	if (to.path=='/' || to.path=='/login') {
		next()
	}else{
		let currentUser=sessionStorage.getItem("currentUser");
        let currentPass=sessionStorage.getItem("currentPass");
		if (currentUser && currentPass) {
			next()
		}else{
			alert('请先登录')
			next('/login')
		}		
	}
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
