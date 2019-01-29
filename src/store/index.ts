import Vue from 'vue';
import Vuex, {ActionTree, MutationTree} from 'vuex';
import User from './modules/user.store';
import { cookiesService } from '@/module';
import {RootStateInterface} from '@/interfaces/root-state.interface';

Vue.use(Vuex);

const userCookieName: any = process.env.VUE_APP_TOKEN;

const actions: ActionTree<any, RootStateInterface> = {
    logUserOut({ commit }): Promise<{ success: boolean }> {
        return new Promise((resolve) => {
            commit('resetSession');
            commit('resetUserState');
            resolve({ success: true });
        });
    },
};

const mutations: MutationTree<RootStateInterface> = {
    resetSession(state: any) {
        cookiesService.deleteCookie(userCookieName);
    },
};

export default new Vuex.Store<RootStateInterface>({
    actions,
    mutations,
    modules: {
        User,
    },
});
