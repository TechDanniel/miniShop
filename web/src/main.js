import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
import TypeNav from './components/TypeNav'
import store from './store'
import './mock/mockServer'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import atm from '@/assets/1.gif';
//引入插件
import VueLazyload from 'vue-lazyload';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
});

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Antd);
Vue.component(TypeNav.name,TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
