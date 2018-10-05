import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import {ResponseInterface} from '@/interfaces/response.interface';
import ResponseService from '@/services/response.service';

@Component
class Register extends Vue {
    @Action public registerUser: (obj: any) => Promise<ResponseInterface>;
    public errorDisplay: boolean = false;
    public errorMsg: string = '';
    public registerValid: boolean = false;
    public form: any = {
        first_name: {
            value: '',
            rule: [
                (v: string) => !!v || 'First name is required',
                (v: string) => v.length >= 3 || '',
            ],
        },
        last_name: {
            value: '',
            rule: [
                (v: string) => !!v || 'Last name is required',
                (v: string) => v.length >= 3 || '',
            ],
        },
        phone_number: {
            value: '',
            rule: [
                (v: string) => !!v || 'Phone number is required',
                (v: string) => this.validatePhoneNumber() || 'Phone number should be in proper format',
            ],
        },
        email: {
            value: '',
            rule: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        },
        password: {
            value: '',
            rule: [
                (v: string) => !!v || 'Password is required',
                (v: string) => v.length >= 8 || '',
            ],
        },
        confirm_password: {
            value: '',
            rule: [
                (v: string) => !!v || 'Confirm password is required',
                (v: string) => this.checkPassword() || 'Passwords has to match',
                (v: string) => v.length >= 8 || '',
            ],
        },
        company_name: {
            value: '',
            rule: [
                (v: string) => !!v || 'Company name is required',
            ],
        },
        address_1: {
            value: '',
            rule: [
                (v: string) => !!v || 'Address is required',
            ],
        },
        address_2: {
            value: '',
            rule: [],
        },
        city: {
            value: '',
            rule: [
                (v: string) => !!v || 'City is required',
            ],
        },
        state: {
            value: '',
            rule: [
                (v: string) => !!v || 'State is required',
            ],
        },
        postal_code: {
            value: '',
            rule: [
                (v: string) => !!v || 'Postal code is required',
            ],
        },
    };
    public states = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    ];

    public get phoneNumberFormat(): string {
        return this.form.phone_number.value
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    public set phoneNumberFormat(phone: string) {
        this.form.phone_number.value = phone;
    }

    public submit() {
        this.registerUser(this.form)
            .then((res: ResponseInterface) => {
                if (res.success) {
                    this.errorDisplay = false;
                    this.$router.push({ name: 'dashboard' });
                    return true;
                }

                this.errorDisplay = true;
                this.errorMsg = res.msg;
                return false;
            })
            .catch((error: any) => {
                const responseService: ResponseService = new ResponseService();
                const response: ResponseInterface = responseService.getFailedResponse();
                this.errorDisplay = true;
                this.errorMsg = response.msg;
            });
    }

    private checkPassword(): boolean {
        return this.form.confirm_password.value === this.form.password.value;
    }

    /**
     * @TODO
     * May support foreign numbers in the future
     */
    private validatePhoneNumber(): boolean | number {
        const phone = this.phoneNumberFormat.replace(/\s+-()/, '');
        return /^\((\d{3})\)\s(\d{3})-(\d{4})$/.test(phone);
    }
}

export default Register;
