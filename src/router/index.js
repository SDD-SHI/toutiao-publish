import Vue from "vue"
import VueRouter from "vue-router"
import LoginIndex from "@/views/LoginIndex"
import HomeIndex from "@/views/HomeIndex"

Vue.use(VueRouter)

const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginIndex,
    },
    {
        path: "/",
        name: "home",
        component: HomeIndex,
    },
]

const router = new VueRouter({
    routes,
})

export default router
