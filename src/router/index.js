import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import core from "./core";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    }, {
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
