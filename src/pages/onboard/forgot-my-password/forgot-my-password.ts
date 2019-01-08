import { Vue, Component } from 'vue-property-decorator';
import { userService } from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {AlertInterface} from '@/interfaces/alert.interface';

@Component
class ForgotMyPassword extends Vue {
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
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
                        this.alert.display = false;
                        this.successSubmission = true;
                        this.form.email.value = '';

                        setTimeout(() => {
                            this.successSubmission = false;
                        }, 10000);
                    } else {
                        this.alert.display = true;
                        this.alert.msg = res.msg;
                    }
                })
                .catch(() => {
                    this.alert.display = true;
                    this.alert.msg = 'Something unexpected occur. Please try again.';
                });
        }
    }
}

export default ForgotMyPassword;
