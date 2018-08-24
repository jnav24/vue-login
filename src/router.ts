import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import UserService from '@/services/user.service';

Vue.use(Router);

const router = new Router({
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
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                const userService = new UserService();

                if (!userService.isLoggedIn()) {
                    next('/login');
                }

                next();
            },
        },
    ],
});

export default router;
