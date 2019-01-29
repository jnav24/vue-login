import Vue from 'vue';
import Router, {Route} from 'vue-router';
import store from '@/store/index';
import Home from './views/Home.vue';
import Dashboard from './pages/dashboard/Dashboard.vue';
import DashboardHome from './pages/dashboard/home/Home.vue';
import {ResponseInterface} from '@/interfaces/response.interface';
import { userService } from '@/module';

Vue.use(Router);

async function autoLogIn({ next }: any): Promise<void> {
    try {
        const response: ResponseInterface = await store.dispatch('isLoggedIn');

        if (response.success) {
            next({ name: 'dashboard' });
        }

        next();
    } catch (error) {
        next('/login');
    }
}

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
                    meta: {
                        middleware: [autoLogIn],
                    },
                    component: () => import('@/pages/onboard/login/Login.vue'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/pages/onboard/register/Register.vue'),
                },
                {
                    path: '/forgot-password',
                    name: 'forgot-password',
                    component: () => import('@/pages/onboard/forgot-my-password/ForgotMyPassword.vue'),
                },
                {
                    path: '/account-reset/:token',
                    name: 'account-reset',
                    beforeEnter: (to: Route, from: Route, next: any) => {
                        userService
                            .validateToken(to.params.token)
                            .then((res: ResponseInterface) => {
                                if (res.success) {
                                    next();
                                } else {
                                    next({ name: 'login' });
                                }
                            })
                            .catch(() => {
                                next({ name: 'login' });
                            });
                    },
                    component: () => import('@/pages/onboard/account-reset/AccountReset.vue'),
                },
                {
                    path: '/account-reset/**',
                    redirect: {
                        name: 'login',
                    },
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
