import {ResponseInterface} from '@/interfaces/response.interface';
import {AxiosResponse} from 'axios';
import {UrlInterface} from '@/interfaces/url.interface';
import HttpService from '@/services/http.service';
import ResponseService from '@/services/response.service';

class UserService {
    constructor(private httpService: HttpService, private responseService: ResponseService) {
        // ...
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

    public async forgetPassword(email: string): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'auth/forgetpassword',
                params: {
                    email,
                },
            };

            const response: AxiosResponse = await this.httpService.post(data);

            if (this.responseService.isSuccessResponse(response.status)) {
                return this.responseService.getSuccessResponse();
            }

            return this.responseService.getFailedResponse();
        } catch (error) {
            return this.responseService.getFailedResponse(error.response.data.message);
        }
    }

    public async validateToken(token: string): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'auth/validatepasswordresettoken',
                params: {
                    token,
                },
            };

            const response: AxiosResponse = await this.httpService.post(data);

            if (this.responseService.isSuccessResponse(response.status)) {
                return this.responseService.getSuccessResponse();
            }

            return this.responseService.getFailedResponse();
        } catch (error) {
            return this.responseService.getFailedResponse();
        }
    }

    public async resetPassword(password: string, token: string): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'auth/resetpassword',
                params: {
                    token,
                    password,
                },
            };

            const response: AxiosResponse = await this.httpService.post(data);

            if (this.responseService.isSuccessResponse(response.status)) {
                return this.responseService.getSuccessResponse();
            }

            return this.responseService.getFailedResponse();
        } catch (error) {
            return this.responseService.getFailedResponse();
        }
    }
}

export default UserService;
