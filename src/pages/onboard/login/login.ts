import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ResponseInterface } from '@/interfaces/response.interface';
import {UserInterface} from '@/interfaces/user.interface';
import {responseService, validateService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';
import {AlertInterface} from '@/interfaces/alert.interface';

@Component
class Login extends Vue {
    @State((state: any) => state.User.user) public userState: UserInterface;
    @Action public logUserIn: (obj: {}) => Promise<ResponseInterface>;
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
    public loginValid: boolean = false;
    public form: FormInterface = {
        username: {
            value: '',
            rules: [
                (v: any) => !!v || 'Username is required',
                (v: any) => validateService.isEmail(v) || 'Username must be valid',
            ],
        },
        password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => validateService.isValidLength(v, 8) || '',
            ],
        },
    };

    public submit() {
        this.logUserIn(this.form)
            .then((res: ResponseInterface) => {
                if (res.success) {
                    this.alert.display = false;
                    this.$router.push({ name: 'dashboard' });
                    return true;
                }

                this.alert.display = true;
                this.alert.msg = res.msg;
                return false;
            })
            .catch((error: any) => {
                const response: ResponseInterface = responseService.getFailedResponse();
                this.alert.display = true;
                this.alert.msg = response.msg;
            });
    }
}

export default Login;
