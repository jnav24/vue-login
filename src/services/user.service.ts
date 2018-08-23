import Vue from 'vue';
import {UserInterface} from '@/interfaces/user.interface';
import CookieService from './cookies.service';

const userCookie = 'user';

class UserService extends Vue {
    private cookieService: CookieService = new CookieService();

    public getUser(): UserInterface | null {
        this.cookieService.setCookie(userCookie, 'aksjdhfkasdf');
        setTimeout(() => {
            this.cookieService.deleteCookie(userCookie);
        }, 5000);
        return {
            email: 'pparker@test.com',
        };
    }

    public isLoggedIn(user: UserInterface | null = null): boolean {
        console.log(this.cookieService.getCookie(userCookie));
        if (user == null || !user.hasOwnProperty('email')) {
            const cookie = this.cookieService.getCookie(userCookie);
            console.log(cookie != null && this.validateCookie(cookie));
            console.log('=============================');
            return cookie != null && this.validateCookie(cookie);
        }

        return true;
    }

    private validateCookie(cookie: string): boolean {
        return true;
    }
}

export default UserService;
