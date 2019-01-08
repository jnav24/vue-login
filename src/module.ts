import CookiesService from '@/services/cookies.service';
import ResponseService from '@/services/response.service';
import HttpService from '@/services/http.service';
import UserService from '@/services/user.service';

export const cookiesService = new CookiesService();
export const responseService = new ResponseService();

export const httpService = new HttpService(cookiesService);
export const userService = new UserService(httpService, responseService);
