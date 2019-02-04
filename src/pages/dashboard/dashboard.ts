import { Component, Vue } from 'vue-property-decorator';
import { MenuInterface } from '@/interfaces/menu.interface';
import MainNavDesktop from '@/components/dashboard/menu/main-nav-desktop/MainNavDesktop.vue';
import MainNavMobile from '@/components/dashboard/menu/main-nav-mobile/MainNavMobile.vue';

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
        {
            name: 'Profile',
            link: { name: 'profile' },
        },
    ];
    public mobileMenu: boolean = false;

    public logout() {
        this.$store
            .dispatch('logUserOut')
            .then((res: { success: boolean }) => {
                if (res.success) {
                    this.$router.push({ name: 'login' });
                }
            });
    }

    public updateMenu(menu: boolean) {
        this.mobileMenu = menu;
    }
}

export default Dashboard;
