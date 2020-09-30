import Vue from 'vue'
import VueRouter from 'vue-router'

import core from "./core/core";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    core,
]

const router = new VueRouter({
    routes
})

export default router
