import {UserInterface} from '@/interfaces/user.interface';

const user: UserInterface | {} = {};

const User = {
    state: {
        user,
    },
    getters: {
        user: (state: any) => state.user,
    },
    actions: {},
    mutations: {
        addUser(state: any, usr: UserInterface) {
            console.log(usr);
            state.user = usr;
        },
    },
};

export default User;
