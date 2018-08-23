import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/login',
            name: 'onboard',
            component: () => import('@/pages/Onboard.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import('@/pages/Login.vue'),
                },
            ],
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/pages/Dashboard.vue'),
            beforeEnter: (to, from, next) => {
                next();
            },
        },
    ],
});
