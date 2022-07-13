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
import CommonDialog from '@/components/CommonDialog.vue'
window.commonComponent = { CommonDialog };

Vue.use(ElementUI);
import {
    registerMicroApps,
    start
} from 'qiankun';

Vue.config.productionTip = false;

registerMicroApps([
    {
        name: 'outpNurse',
        entry: '//localhost:8081',
        container: '#container',
        activeRule: '/outpNurse',
    },
    {
        name: 'app2',
        entry: '//localhost:8082',
        container: '#container',
        activeRule: '/app2',
    }
]);
// 启动 qiankun
start();
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");