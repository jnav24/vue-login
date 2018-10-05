import {env} from '@/env.config';
import { UserInterface } from '@/interfaces/user.interface';
import CookieService from '@/services/cookies.service';

class UserService {
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
