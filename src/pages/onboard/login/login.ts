import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ResponseInterface } from '@/interfaces/response.interface';
import ResponseService from '@/services/response.service';
import {UserInterface} from '@/interfaces/user.interface';
import { responseService } from '@/module';
import {FormInterface} from '@/interfaces/form.interface';

@Component
class Login extends Vue {
    @State((state: any) => state.User.user) public userState: UserInterface;
    @Action public logUserIn: (obj: {}) => Promise<ResponseInterface>;
    public errorDisplay: boolean = false;
    public errorMsg: string = '';
    public loginValid: boolean = false;
    public form: FormInterface = {
        email: {
            value: '',
            rules: [
                (v: any) => !!v || 'Email is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        },
        password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => v.length >= 8 || '',
            ],
        },
    };
    private responseService: ResponseService = responseService;

    public submit() {
        this.logUserIn(this.form)
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
                const response: ResponseInterface = this.responseService.getFailedResponse();
                this.errorDisplay = true;
                this.errorMsg = response.msg;
            });
    }
}

export default Login;
