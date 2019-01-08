export interface FormInterface {
    [key: string]: {
        value: string | boolean | number;
        rules: Array<( (v: string | boolean | number) => string | boolean | number)>;
    };
}
