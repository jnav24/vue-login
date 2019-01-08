import { Vue, Component } from 'vue-property-decorator';
import {ResponseInterface} from '@/interfaces/response.interface';
import {AlertInterface} from '@/interfaces/alert.interface';
import { validateService, userService } from '@/module';

@Component
class AccountReset extends Vue {
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
    public formValid: boolean = false;
    public form: any = {
        new_password: {
            value: '',
            rule: [
                (v: string) => !!v || 'Password is required',
                (v: string) => validateService.isValidLength(v) || 'Password is not long enough',
                (v: string) => validateService.isUppercasePresent(v) || 'Password must contain uppercase letters',
                (v: string) => validateService.isLowercasePresent(v) || 'Password must contain lowercase letters',
                (v: string) => validateService.isNumberPresent(v) || 'Password must contain numbers',
                (v: string) => this.checkPassword() || 'Passwords has to match',
            ],
        },
        confirm_password: {
            value: '',
            rule: [
                (v: string) => !!v || 'Confirm password is required',
                (v: string) => this.checkPassword() || 'Passwords has to match',
                (v: string) => validateService.isValidLength(v) || '',
            ],
        },
    };

    public submit() {
        if (this.formValid) {
            userService
                .resetPassword(this.form.new_password.value, this.$route.params.token)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.alert.display = false;
                        this.$router.push({ name: 'login' });
                    } else {
                        this.alert.display = true;
                        this.alert.msg = res.msg;
                    }
                })
                .catch(() => {
                    this.alert.display = true;
                    this.alert.msg = 'Something unexpected occurred. Please try again.';
                });
        }
    }

    public validateAll() {
        const refs: any = this.$refs.resetForm;
        refs.validate();
    }

    private checkPassword(): boolean {
        return validateService.doesPasswordsMatch(this.form.new_password.value, this.form.confirm_password.value);
    }
}

export default AccountReset;
