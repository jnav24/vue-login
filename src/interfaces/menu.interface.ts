export interface MenuInterface {
    name: string;
    link: {
        name?: string;
        query?: any;
        params?: any;
        path?: string;
    };
    submenu?: MenuInterface[];
}
