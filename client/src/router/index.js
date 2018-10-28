import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/Login/login.vue'
import register from '../views/Register/register.vue'

Vue.use(Router)

export const constantRouterMap = [
    { path: '', name: 'login', component: login },
    { path: '/register', name: 'register', component: register }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})