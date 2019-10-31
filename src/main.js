import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as request from './request'
import store from './store'
import {pay,config} from './pay/index'
import 'muse-ui/lib/styles/base.less';
import { Progress } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import 'wowjs/css/libs/animate.css'
import Helpers from 'muse-ui/lib/Helpers';


import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import { 
  Swipe,
  SwipeItem,
  Tab,Tabs,
  Popup,
  Toast,
  Row,Col,
  Search,
  Slider,
  RadioGroup,
  Radio,
  Lazyload,
  Cell,CellGroup,
  Sticky ,
  Dialog 
} from 'vant';
import 'vant/lib/index.css';
import $ from 'jquery';
Vue.config.productionTip = false
Vue.use(Progress);
Vue.use(Helpers);
Vue.use(Swipe).use(SwipeItem)
.use(Tab).use(Tabs)
.use(Popup)
.use(Toast)
.use(Row).use(Col)
.use(Search)
.use(Slider)
.use(RadioGroup).use(Radio)
.use(CellGroup).use(Cell)
.use(Sticky)
.use(Dialog);

Vue.use(Lazyload,{
  // loading:"/assets/index/lazy.png",
  // error:"/assets/index/lazy.png"
});
router.beforeEach((to, from, next) => {

  if(to.meta.title){
    // document.title=to.meta.title
  }
  

  if (to.path == '/author') {
    //进入授权页面

    if (!window.sessionStorage.openId  || !window.localStorage.uid ) {
      next();
    } else {
      next();
    }
  }else {
    if (
      !window.sessionStorage.openId  || !window.localStorage.uid 
      // false
      ) {
      window.localStorage.authBeforeFullPath = window.location.href;
      next({ path: '/author' });
    } else {
      next();
    }
  }

  next()
})
router.afterEach(() => {
  //
})

Vue.prototype.$get=request.get
Vue.prototype.$post=request.post
Vue.prototype.appId='wxa6acc23ca992289c';
Vue.prototype.$pay=pay;
Vue.prototype.$config=config;
Vue.prototype.$=$;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
