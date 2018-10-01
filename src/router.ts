import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import Home from './views/Home.vue';
import Dashboard from './pages/dashboard/Dashboard.vue';
import DashboardHome from './pages/dashboard/home/Home.vue';
import {ResponseInterface} from '@/interfaces/response.interface';

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
            component: () => import('@/pages/onboard/Onboard.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import('@/pages/onboard/login/Login.vue'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/pages/onboard/register/Register.vue'),
                },
            ],
        },
        {
            path: '/dashboard',
            component: Dashboard,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardHome,
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/pages/dashboard/profile/Profile.vue'),
                },
            ],
            beforeEnter: (to, from, next) => {
                store.dispatch('isLoggedIn')
                    .then((res: ResponseInterface) => {
                        if (!res.success) {
                            next('/login');
                        } else {
                            next();
                        }
                    })
                    .catch((error: any) => {
                        next('/login');
                    });
            },
        },
    ],
});

export default router;
