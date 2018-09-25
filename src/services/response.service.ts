import {ResponseInterface} from '@/interfaces/response.interface';

class ResponseService {
    private msg: string = 'Something unexpected happened. Please try again later.';

    public getSuccessResponse(msg: string = ''): ResponseInterface {
        return { success: true, msg};
    }

    public getFailedResponse(msg: string = this.msg): ResponseInterface {
        return { success: false, msg };
    }

    public isSuccessResponse(code: number): boolean {
        return code >= 200 && code <= 299;
    }

    public isFailedResponse(code: number): boolean {
        return code >= 400 && code <= 499;
    }
}

export default ResponseService;
