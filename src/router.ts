import Vue from 'vue';
import Router, {Route} from 'vue-router';
import store from '@/store/index';
import Home from './views/Home.vue';
import Dashboard from './pages/dashboard/Dashboard.vue';
import DashboardHome from './pages/dashboard/home/Home.vue';
import {ResponseInterface} from '@/interfaces/response.interface';

Vue.use(Router);

async function auth({ next }: any): Promise<void> {
    try {
        const response: ResponseInterface = await store.dispatch('isLoggedIn');

        if (response.success) {
            next();
        } else {
            next('/login');
        }
    } catch (error) {
        next('/login');
    }
}

function initStore() {
    if (!Object.keys(store.state.User.user).length) {
        store.dispatch('isLoggedIn');
    }
}

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
            meta: {
                middleware: [auth],
            },
            beforeEnter: (to: Route, from: Route, next: any) => {
                initStore();
                next();
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardHome,
                    meta: {
                        middleware: [auth],
                    },
                },
                {
                    path: 'profile',
                    name: 'profile',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/profile/Profile.vue'),
                },
            ],
        },
    ],
});

router.beforeEach((to: Route, from: Route, next: any) => {
    if (to.meta.hasOwnProperty('middleware')) {
        const context = {next, to, from};
        to.meta.middleware.map((mw: any, index: number) => {
            if (typeof mw === 'function') {
                mw(context);
            }
        });
    } else {
        next();
    }
});

export default router;
