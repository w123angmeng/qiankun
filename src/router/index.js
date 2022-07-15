import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "parent",
        component: () =>
        import( /* webpackChunkName: "about" */ "../views/welcome.vue"),
        children:[
            {
                path: "/welcome",
                name: "welcome",
                redirect: "/welcome", 
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
        import("../views/login.vue")
    },
    {
        path: "/outpNurse",
        name: "outpNurse",
        component: () =>
        import("../views/mainView.vue"),
        children:[]
    },
    {
        path: "/outpNurse/*",
        name: "outpNurse",
        component: () =>
        import("../views/mainView.vue"),
        children:[]
    },
    {
        path: "/app2",
        name: "app2",
        component: () =>
        import( "../views/mainView.vue"),
        children:[]
    },
    {
        path: "/app2/*",
        name: "app2",
        component: () =>
        import("../views/mainView.vue"),
        children:[]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
console.log("token:", store.state.user.token)
// 判断是否需要登陆权限 以及是否登录
router.beforeEach((to, from, next) => {
    // if(to.matched.some(res => res.meta.requireAuth)) {
        let token = store.state.user.token
        if(to.path !== '/login' && !token) {
            console.log("token不存在",to,from)
            next('/login')
        }else {
            console.log("token存在1", to)
            // next({
            //     path: '/login',
            //     // query: {
            //     //     redirect: to.fullPath
            //     // }
            // })
            next()
            // next('/login')

        }
    // } else {
    //     next()
    // }
})
export default router;