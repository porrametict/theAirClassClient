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
    {
        path: '/sc101',
        name: 'SC101',
        component: () => import('../views/ShareComponentUsage')
    },
    {
        path: '/ts101',
        name: 'TS101',
        component: () => import('../views/testSpace')
    },
    core,
]

const router = new VueRouter({
    routes
})

export default router
