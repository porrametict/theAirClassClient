import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import core from "./core";
import ProfileSettings from "../views/account/ProfileSettings";
import MainTemplate from "../views/MainTemplate";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: "/home",
    //     name: "Home",
    //     component: () => import('../views/Home')
    // },
    {
        path: "/mainTemplate",
        name: "MainTemplate",
        component: MainTemplate
    },
    // {
    //     path: "/profileSettings",
    //     name: "ProfileSettings",
    //     component: ProfileSettings
    // },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },

    core
]

const router = new VueRouter({
    routes
})

export default router
