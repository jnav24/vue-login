import axios, {AxiosResponse} from 'axios';
import {UrlInterface} from '@/interfaces/url.interface';
import CookieService from '@/services/cookies.service';
import {ResponseDataInterface} from '@/interfaces/response-data.interface';

const userCookieName: any = process.env.VUE_APP_TOKEN;
const domain: any = process.env.VUE_APP_API_DOMAIN;

class HttpService {
    constructor(private cookieService: CookieService) {
        // ...
    }

    public async get(data: UrlInterface): Promise<AxiosResponse> {
        return await axios.get(domain + data.url, data.params || {});
    }

    public async post(data: UrlInterface): Promise<AxiosResponse> {
        return await axios.post(domain + data.url, data.params || {});
    }

    public async authGet(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'GET',
            url: domain + data.url,
            params: data.params || {},
            headers: {
                Authorization: `Bearer ${this.cookieService.getCookie(userCookieName)}`,
            },
        });
    }

    public async authPost(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'POST',
            url: domain + data.url,
            data: data.params || {},
            headers: {
                Authorization: `Bearer ${this.cookieService.getCookie(userCookieName)}`,
            },
        });
    }

    public async authGetCallOrGetLocal(
        store: string, state: string, data: UrlInterface,
    ): Promise<AxiosResponse | ResponseDataInterface> {
        const storedData = this.cookieService.checkStorage(store, state);

        if (storedData) {
            return await new Promise<ResponseDataInterface>((resolve: any) => {
                resolve({
                    status: 200,
                    data: {
                        data: {
                            stored: storedData,
                        },
                    },
                });
            });
        }

        return await this.authGet(data);
    }
}

export default HttpService;
