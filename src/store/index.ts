import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user.store';
import { cookiesService } from '@/module';

Vue.use(Vuex);

const userCookieName: any = process.env.VUE_APP_TOKEN;

export default new Vuex.Store({
    actions: {},
    mutations: {
        logUserOut(state: any) {
            const excludeDefault: string[] = ['BusinessTypes'];

            for (const st of Object.keys(state)) {
                if (excludeDefault.indexOf(st) < 0) {
                    state[st] = {};
                }
            }

            cookiesService.deleteCookie(userCookieName);
        },
    },
    modules: {
        User,
    },
});
