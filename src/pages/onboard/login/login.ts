import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ResponseInterface } from '@/interfaces/response.interface';
import ResponseService from '@/services/response.service';
import {UserInterface} from '@/interfaces/user.interface';

@Component
class Login extends Vue {
    @State((state: any) => state.User.user) public userState: UserInterface;
    @Action public logUserIn: any;
    public errorDisplay: boolean = false;
    public errorMsg: string = '';
    public loginValid: boolean = false;
    public form = {
        email: {
            value: 'alan@test.com',
            rule: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        },
        password: {
            value: 'password',
            rule: [
                (v: string) => !!v || 'Password is required',
                (v: string) => v.length >= 8 || '',
            ],
        },
    };

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
                const responseService: ResponseService = new ResponseService();
                const response: ResponseInterface = responseService.getFailedResponse();
                this.errorDisplay = true;
                this.errorMsg = response.msg;
            });
    }
}

export default Login;
