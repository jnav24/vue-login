import {UserInterface} from '@/interfaces/user.interface';
import {UserLoginInterface} from '@/interfaces/user-login.interface';
import {UserRegisterInterface} from '@/interfaces/user-register.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import { AxiosResponse } from 'axios';
import {ActionContext, Module} from 'vuex';
import { cookiesService, responseService, httpService, userService } from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';

const user: UserInterface = {} as UserInterface;
const userCookieName: any = process.env.VUE_APP_TOKEN;

const User: Module<UserInterface | {}, any> = {
    state: {
        user,
    },
    getters: {},
    actions: {
        async isLoggedIn({ commit }: ActionContext<UserInterface | {}, any>): Promise<ResponseInterface> {
            try {
                const cookie = cookiesService.getCookie(userCookieName);

                if (cookie !== null) {
                    const response = await httpService.authGet({ url: 'auth/user' });

                    if (responseService.isSuccessResponse(response.status)) {
                        commit('addUser', response.data.data.user);
                        return responseService.getSuccessResponse();
                    }
                }

                commit('logUserOut');
                return responseService.getFailedResponse();
            } catch (error) {
                commit('logUserOut');
                return responseService.getFailedResponse();
            }
        },
        async logUserIn({ commit }: ActionContext<UserInterface | {}, any>, userData: {}): Promise<ResponseInterface> {
            try {
                const loginData: UserLoginInterface = userService.setUserDataFromForm(userData);
                const data: UrlInterface = {
                    url: 'auth/login',
                    params: loginData,
                };
                const res: AxiosResponse = await httpService.post(data);

                if (responseService.isSuccessResponse(res.status)) {
                    commit('addUser', res.data.data.user);
                    cookiesService.setCookie(userCookieName, res.data.data.token);
                    return responseService.getSuccessResponse();
                }

                commit('logUserOut');
                return responseService.getFailedResponse();
            } catch (error) {
                const err = error.response;

                if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                    let message: string = '';

                    if (typeof err.data.data.email !== 'undefined') {
                        message = 'Please enter your email';
                    } else if (typeof err.data.data.password !== 'undefined') {
                        message = 'Please enter your password';
                    } else if (typeof err.data.message !== 'undefined') {
                        message = err.data.message;
                    }

                    return responseService.getFailedResponse(message);
                } else {
                    return responseService.getFailedResponse();
                }
            }
        },
        async registerUser(
            { commit, dispatch }: ActionContext<UserInterface | {}, any>,
            userData: {},
        ): Promise<ResponseInterface> {
            try {
                const registerData: UserRegisterInterface = userService.setUserDataFromForm(userData);
                const data: UrlInterface = {
                    url: 'register',
                    params: registerData,
                };
                const response: AxiosResponse = await httpService.post(data);

                if (responseService.isSuccessResponse(response.status)) {
                    return await dispatch('logUserIn', { email: registerData.email, password: registerData.password });
                }

                return responseService.getFailedResponse();
            } catch (error) {
                const err = error.response;

                if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                    let message: string = '';

                    if (typeof err.data.data.email !== 'undefined') {
                        message = 'That email is already taken.';
                    } else if (typeof err.data.data.name !== 'undefined') {
                        message = 'That company account already exists.';
                    } else if (typeof err.data.message !== 'undefined') {
                        message = err.data.message;
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
    },
};

export default User;
