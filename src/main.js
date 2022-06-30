 /* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import {
    registerMicroApps,
    start
} from 'qiankun';

Vue.config.productionTip = false;

registerMicroApps([
    {
        name: 'app1',
        entry: '//localhost:8081',
        container: '#container',
        activeRule: '/main',
    },
    {
        name: 'app2',
        entry: '//localhost:8082',
        container: '#container',
        activeRule: '/main',
    }
]);
// 启动 qiankun
start();
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");