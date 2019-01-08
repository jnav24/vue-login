export interface ResponseDataInterface {
    status: number;
    data: {
        data: {
            [key: string]: any;
        };
    };
}
