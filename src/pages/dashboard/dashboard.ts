import {  Component, Vue } from 'vue-property-decorator';
import {Route} from 'vue-router';
import { MenuInterface } from '@/interfaces/menu.interface';
import MainNavDesktop from '@/components/dashboard/menu/main-nav-desktop/MainNavDesktop.vue';
import MainNavMobile from '@/components/dashboard/menu/main-nav-mobile/MainNavMobile.vue';
import {ResponseInterface} from '@/interfaces/response.interface';

Component.registerHooks([
    'beforeRouteEnter',
]);

@Component({
    components: {
        MainNavDesktop,
        MainNavMobile,
    },
})
class Dashboard extends Vue {
    public menu: MenuInterface[] = [
        {
            name: 'Dashboard',
            link: { name: 'dashboard' },
        },
    ];
    public mobileMenu: boolean = false;

    public logout() {
        this.$store.commit('logUserOut');
        this.$router.push({ name: 'login' });
    }

    public updateMenu(menu: boolean) {
        this.mobileMenu = menu;
    }

    public beforeRouteEnter(to: Route, from: Route, next: any) {
        next((vm: any) => {
            vm.$store
                .dispatch('isLoggedIn')
                .then((res: ResponseInterface) => {
                    if (!res.success) {
                        vm.$router.push({ name: 'login' });
                    }
                })
                .catch((err: any) => {
                    vm.$router.push({ name: 'login' });
                });
        });
    }
}

export default Dashboard;
