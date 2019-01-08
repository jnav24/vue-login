import { Vue, Component } from 'vue-property-decorator';
import { userService } from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';

@Component
class ForgotMyPassword extends Vue {
    public errorDisplay: boolean = false;
    public errorMsg: string = '';
    public form = {
        email: {
            value: '',
            rule: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
            ],
        },
    };
    public formValid: boolean = false;
    public successSubmission: boolean = false;

    public submit() {
        if (this.formValid) {
            userService
                .forgetPassword(this.form.email.value)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.errorDisplay = false;
                        this.successSubmission = true;
                        this.form.email.value = '';

                        setTimeout(() => {
                            this.successSubmission = false;
                        }, 10000);
                    } else {
                        this.errorDisplay = true;
                        this.errorMsg = res.msg;
                    }
                })
                .catch(() => {
                    this.errorDisplay = true;
                    this.errorMsg = 'Something unexpected occur. Please try again.';
                });
        }
    }
}

export default ForgotMyPassword;
