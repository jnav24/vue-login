import axios, {AxiosResponse} from 'axios';
import {env} from '@/env.config';
import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user.store';
import CookieService from '@/services/cookies.service';
import {UrlInterface} from '@/interfaces/url.interface';

Vue.use(Vuex);

const userCookieName: string = env.cookie.name;
const cookieService: CookieService = new CookieService();

export default new Vuex.Store({
    actions: {
        async authGet({ commit }: any, data: UrlInterface ): Promise<AxiosResponse> {
            const cookie = cookieService.getCookie(userCookieName);
            return await axios({
                method: 'GET',
                url: env.api.domain + data.url,
                data: {
                    params: {},
                },
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
        },
    },
    mutations: {
        logUserOut(state: any) {
            const excludeDefault: string[] = ['BusinessTypes'];

            for (const st of Object.keys(state)) {
                if (excludeDefault.indexOf(st) < 0) {
                    state[st] = {};
                }
            }

            cookieService.deleteCookie(userCookieName);
        },
    },
    modules: {
        User,
    },
});
