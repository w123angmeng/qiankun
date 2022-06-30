import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/mainView.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "welcome",
        component: () =>
        import( /* webpackChunkName: "about" */ "../views/welcome.vue")
    },
    {
        path: "/main",
        name: "main",
        component: () =>
        import( /* webpackChunkName: "about" */ "../views/mainView.vue"),
        children:[
            // {
            //     path: "app",
            //     name: "app",
            //     component: () =>
            //         import( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
            // },
            // {
            //     path: "otherApp",
            //     name: "otherApp",
            //     component: () =>
            //         import( /* webpackChunkName: "about" */ "../views/OtherView.vue"),
            // },
        ]
    }
    
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;