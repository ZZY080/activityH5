import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Youth from '../views/Youth.vue'
import YouthDetail from '../views/YouthDetail.vue'
import Search from "../views/Search.vue"
import Activity from '../views/Activity.vue'
import ActivityDetail from '../views/ActivityDetail.vue'
import Qrcode from "../views/Qrcode.vue"
import Neighborhood from '../views/Neighborhood.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: "/login" },
  { path: '/login', component: Login, meta: { title: "我的" } },
  { path: '/home', component: Home, meta: { title: "主页" } },
  { path: '/youth', component: Youth, meta: { title: "青春不迷茫" } },
  { path: '/youthdetail', component: YouthDetail, meta: { title: "青春不迷茫详情页" } },
  { path: '/search', component: Search, meta: { title: "搜索页" } },
  { path: '/activity', component: Activity, meta: { title: "活动首页" } },
  { path: '/activitydetail', component: ActivityDetail, meta: { title: "活动详情页" } },
  { path: '/neighborhood', component: Neighborhood, meta: { title: "锦川佳苑" } },
  { path: '/qrcode', component: Qrcode, meta: { title: "二维码扫描" } },

]

const router = new VueRouter({
  mode: "history",
  routes,
})
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置每个页面的标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 判断用户是否登录
  const token = localStorage.getItem("token");
  if(token){
    if(to.path=="/login"){
      next("/home")
    }else {
      next();
    }
  }else{
    if(to.path!="/login"){
      next("/login");
    }else{
      next();
    }
  }
})

export default router
