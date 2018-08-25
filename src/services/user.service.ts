import store from '@/store/index';
import {UserInterface} from '@/interfaces/user.interface';
import CookieService from './cookies.service';

const userCookie = 'user';

class UserService {
    private cookieService: CookieService = new CookieService();

    public getUser(): UserInterface | null {
        this.cookieService.setCookie(userCookie, 'aksjdhfkasdf');

        return {
            email: 'pparker@test.com',
        };
    }

    // Since this service has access to the store, maybe delete the param here
    public isLoggedIn(user: UserInterface | null = null): boolean {
        if (user == null || !user.hasOwnProperty('email')) {
            const cookie = this.cookieService.getCookie(userCookie);

            if (cookie != null && this.validateCookie(cookie)) {
                store.commit('addUser', {
                    email: 'page@reload.com',
                });

                return true;
            }

            return false;
        }

        return true;
    }

    public logUserOut(): void {
        this.cookieService.deleteCookie(userCookie);
        store.commit('addUser', {});
    }

    private validateCookie(cookie: string): boolean {
        return true;
    }
}

export default UserService;
