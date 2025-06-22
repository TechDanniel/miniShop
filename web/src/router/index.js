import VueRouter from "vue-router";
import routes from './routes.js'
import Vue from 'vue'
import { getToken } from "@/utils/token.js";
import { webSocketClient } from '@/utils/webSocket';

//使用插件
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    //路由跳转，滚动条自动回到顶部
    scrollBehavior(to,from,savePosition){
        return{y:0}
    }
})

//重写push方法
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

VueRouter.prototype.push=function(location,resolve,reject){
  if(resolve&&reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

VueRouter.prototype.replace=function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

//全局守卫使用:全局守卫它router【VueRouter类的一个实例】的一个方法
//全局守卫【前置守卫:在路由跳转之前会执行一次】
let client=null//websocket连接
router.beforeEach(async (to, from, next) => {
    const token=getToken()
    if (token) {
      //如果用户登录就建立websocket连接
      if(!client){
        client=new webSocketClient(token)
        client.connect();
      }
      //用户登陆了，且想去登录页的分支
      if (to.path == "/login") {
          next("/home");
          //用户登录了，且想去的不是login的分支  
      } else {
          next()
      }
    } else {
         //未登录的判断
         //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
         //用户未登录应该去登录页
         //获取用户未登录想去的路由的路径
         let toPath = to.path;
         //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
         if (toPath.indexOf('trade') != -1 || 
         toPath.indexOf('pay') != -1 || 
         toPath.indexOf('center') != -1||
         toPath.indexOf('addCartSuccess')!==-1||
         toPath.indexOf('shopcart')!==-1
        ) {
              //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
              //跳转到登录页
              next('/login?redirect='+toPath);
         } else {
              //去的并非上面这些路由,放行
              next();
         }
    }
});

export default router
export{
  client
}