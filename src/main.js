// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import api from './api/api'
import './api/fetch'
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

axios.defaults.baseURL = '/hr'
import './assets/css/reset.css'
import './assets/css/pulic.css'

// const setHtmlFontSize = () => {
//   const htmlDom = document.getElementsByTagName('html')[0];
//   let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//   // console.log('htmlWidth',htmlWidth) 这里设置的比例是 100px = 1rem，例如：元素宽度为 100px 时,可以直接写成 1rem
//   if (htmlWidth >= 750) {
//     htmlWidth = 750;
//   }
//   if (htmlWidth <= 320) {
//     htmlWidth = 320;
//   }
//   htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
//   };
//   window.onresize = setHtmlFontSize;
//   setHtmlFontSize();

// 引入echarts


import 'vant/lib/index.css';
import { Collapse,CollapseItem,Popup,Tabbar,TabbarItem,RadioGroup,Radio,Picker,Progress,Search,ActionSheet,Tab,Tabs,Dialog,Field,PullRefresh,List,Loading,Toast,Step, Steps,Cell, CellGroup,DatetimePicker,Checkbox, CheckboxGroup,Divider,Icon,Uploader,Overlay,Swipe, SwipeItem,NavBar,Grid,GridItem    } from 'vant';
  Vue.use(Collapse).use(CollapseItem).use(Tabbar).use(TabbarItem).use(Popup).use(RadioGroup).use(Radio).use(Picker).use(Progress).use(Search).use(ActionSheet).use(Tab).use(Tabs).use(Dialog).use(Field).use(PullRefresh).use(List).use(Loading).use(Grid).use(GridItem)
  .use(Toast).use(Step).use(Steps).use(Cell).use(CellGroup).use(DatetimePicker).use(Checkbox).use(CheckboxGroup).use(Divider).use(Icon).use(Uploader).use(Overlay).use(Swipe).use(SwipeItem).use(NavBar);  
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
