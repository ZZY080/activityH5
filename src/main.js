import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import  Fragment  from 'vue-fragment'
import "swiper/css/swiper.min.css"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'element-ui/lib/theme-chalk/index.css';
import {Button,Message,Loading} from 'element-ui';
import "./util/rem.js"
import "./util/ios.js"
import {utcTimeProcess} from "./util/utils.js"
Vue.config.productionTip = false
//配置共同的端口号和域名,后期代码中直接写接口就行,例如/user,/books
//在vue实例对象的原型上添加这个属性
//今后，在每个.vue组件中要发起请求，直接调用this.$http.x××
axios.defaults.baseURL="http://192.168.0.104:8081"
// 配置请求拦截器
axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  // 为当前请求配置token认证字段
  if(token){
    config.headers.Authorization=token;
  }
  return config;
})
// 响应拦截器
axios.interceptors.response.use((response)=>{
  if(response.data.message==="token已过期请重新登录"){
    localStorage.removeItem("token");
  }
  return response;
})
Vue.use(Fragment.Plugin)
Vue.component('Swiper', Swiper);
Vue.component('SwiperSlide', SwiperSlide);
Vue.use(Button);
Vue.prototype.$http=axios
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;
Vue.filter("utcprocess",function(datetime){
   return utcTimeProcess(datetime);
})
// Swiper 代表最外侧容器
// SwiperSlide 代表每一张轮播图

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
