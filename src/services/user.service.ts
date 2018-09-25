import {env} from '@/env.config';
import { UserInterface } from '@/interfaces/user.interface';
import CookieService from '@/services/cookies.service';

class UserService {
    /**
     * Checks if user is currently logged in.
     *
     * @deprecated this method will be replaced when dialogue_builder is merged
     * @param {UserInterface | null} user
     * @returns {boolean}
     */
    public isLoggedIn(user: UserInterface | null = null): boolean {
        if (user == null || !user.hasOwnProperty('token')) {
            const cookieService: CookieService = new CookieService();
            const cookie = cookieService.getCookie(env.cookie.name);

            if (cookie != null) {
                // @TODO:
                // delete this method
                // being replaced with the store's mutation
                return true;
            }

            return false;
        }

        return true;
    }

    /**
     * This grabs the form data and returns the proper user object
     *
     * @param formData
     * @returns {any}
     */
    public setUserDataFromForm(formData: any): any {
        const data: string[] = Object.keys(formData);
        const userData: any = {};

        for (const i of data) {
            if (typeof formData[i].value !== 'undefined') {
                userData[i] = formData[i].value;
            } else {
                userData[i] = formData[i];
            }
        }

        return userData;
    }
}

export default UserService;
