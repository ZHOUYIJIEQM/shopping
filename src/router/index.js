import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router.js'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

// 切换页面修改标题 (路由即将改变前触发)
router.beforeEach((to, from, next)=>{
  window.document.title = to.meta.title;
  next();
});

// 路由改变后触发
router.afterEach((to, from, next)=>{
  window.scrollTo(0, 0);
});

export default router