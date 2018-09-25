export interface UserRegisterInterface {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    confirm_password?: string;
    company_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postal_code: string;
}
