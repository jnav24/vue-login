import {UserInterface} from '@/interfaces/user.interface';
import {UserLoginInterface} from '@/interfaces/user-login.interface';
import {UserRegisterInterface} from '@/interfaces/user-register.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import CookieService from '@/services/cookies.service';
import ResponseService from '@/services/response.service';
import UserService from '@/services/user.service';
import axios, { AxiosResponse } from 'axios';
import {env} from '@/env.config';
import {ActionContext, Module} from 'vuex';

const user: UserInterface | {} = {};
const userCookieName: string = env.cookie.name;
const cookieService: CookieService = new CookieService();
const responseService: ResponseService = new ResponseService();
const userService: UserService = new UserService();

const User = {
    state: {
        user,
    },
    getters: {
        user: (state: any) => state.user,
    },
    actions: {
        async isLoggedIn({ commit, getters }: ActionContext<UserInterface | {}, any>): Promise<ResponseInterface> {
            try {
                const userState = getters.user;

                if (userState == null || !userState.hasOwnProperty('token')) {
                    const cookie = cookieService.getCookie(userCookieName);

                    if (cookie != null) {
                        const data = {
                            params: {
                                token: cookie,
                            },
                        };
                        const response = await axios.get(`${env.api.domain}auth/user`, data);

                        if (typeof response.data.data.user !== 'undefined') {
                            commit('addUser', response.data.data.user);
                            return responseService.getSuccessResponse();
                        }

                        commit('logUserOut');
                        return responseService.getFailedResponse();
                    }
                }

                return responseService.getSuccessResponse();
            } catch (error) {
                commit('logUserOut');
                return responseService.getFailedResponse();
            }
        },
        async logUserIn({ commit }: ActionContext<UserInterface | {}, any>, userData: any): Promise<ResponseInterface> {
            try {
                const data: UserLoginInterface = userService.setUserDataFromForm(userData);
                const res: AxiosResponse = await axios.post(`${env.api.domain}auth/login`, data);
                commit('addUser', res.data.data);
                cookieService.setCookie(userCookieName, res.data.data.token);
                return responseService.getSuccessResponse();
            } catch (error) {
                const err = error.response;

                if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                    const errMsgs: string[] = Object.keys(err.data);
                    let message: string = '';

                    if (typeof err.data.message !== 'undefined') {
                        message = err.data.message;
                    } else {
                        message = err.data[errMsgs[0]][0];
                    }

                    return responseService.getFailedResponse(message);
                } else {
                    return responseService.getFailedResponse();
                }
            }
        },
        async registerUser(
            { commit, dispatch }: ActionContext<UserInterface | {}, any>,
            userData: any,
        ): Promise<ResponseInterface> {
            try {
                const data: UserRegisterInterface = userService.setUserDataFromForm(userData);
                const response: AxiosResponse = await axios.post(`${env.api.domain}register`, data);

                if (responseService.isSuccessResponse(response.status)) {
                    return await dispatch('logUserIn', { email: data.email, password: data.password });
                }

                return responseService.getFailedResponse();
            } catch (error) {
                const err = error.response;

                if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                    const errMsgs: string[] = Object.keys(err.data);
                    let message: string = '';

                    if (typeof err.data.message !== 'undefined') {
                        message = err.data.message;
                    } else {
                        message = err.data[errMsgs[0]][0];
                    }

                    return responseService.getFailedResponse(message);
                } else {
                    return responseService.getFailedResponse();
                }
            }
        },
    },
    mutations: {
        addUser(state: any, usr: UserInterface) {
            state.user = usr;
        },
        logUserOut(state: any) {
            state.user = {};
            cookieService.deleteCookie(userCookieName);
        },
    },
};

export default User;
