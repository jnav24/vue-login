import {  Component, Vue } from 'vue-property-decorator';
import {Route} from 'vue-router';
import UserService from '@/services/user.service';
import { MenuInterface } from '@/interfaces/menu.interface';
import MainNavDesktop from '@/components/dashboard/menu/main-nav-desktop/MainNavDesktop.vue';
import MainNavMobile from '@/components/dashboard/menu/main-nav-mobile/MainNavMobile.vue';

Component.registerHooks([
    'beforeRouteEnter',
]);

const userService = new UserService();

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
            console.log('component');
            console.log(vm.$store.getters.user);
            /**
             * @TODO:
             * replace with isLoggedIn store action
             */
            if (!userService.isLoggedIn(vm.$store.getters.user)) {
                vm.$router.push({ name: 'login' });
            }
        });
    }
}

export default Dashboard;
