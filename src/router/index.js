import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/mainView.vue";

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

export default router;