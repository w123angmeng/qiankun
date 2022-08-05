 /* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios'
// import VueAxios from 'vue-axios'

Vue.prototype.$axios = axios;
// import CommonDialog from '@/components/CommonDialog.vue'
// window.commonComponent = { CommonDialog };

Vue.use(ElementUI);
import {
    registerMicroApps,
    start,
    initGlobalState
} from 'qiankun';

Vue.config.productionTip = false;

let globalShow = false
Vue.prototype.$global = initGlobalState(globalShow)
Vue.prototype.$global.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('父组件',state, prev);
  });
let msg = {
    store: store,
    state: globalShow
}
registerMicroApps([
    {
        name: 'outpNurse',
        entry: '//localhost:8081',
        container: '#container',
        activeRule: '/outpNurse',
        props: msg
    },
    {
        name: 'app2',
        entry: '//localhost:8082',
        container: '#container',
        activeRule: '/app2',
        props: msg
    }
]);
// 启动 qiankun
// start();
new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");