import { Vue, Component, Prop } from 'vue-property-decorator';
import {MenuInterface} from '@/interfaces/menu.interface';

@Component
class MainNavMobile extends Vue {
    @Prop()
    public menu: MenuInterface[];

    @Prop()
    public showMenu: boolean;
}

export default MainNavMobile;
