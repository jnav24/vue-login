import { Vue, Component, Prop } from 'vue-property-decorator';
import {MenuInterface} from '@/interfaces/menu.interface';

@Component
class MainNavDesktop extends Vue {
    @Prop()
    public menu: MenuInterface[];

    public hasSubmenu(item: MenuInterface): boolean | number {
        return typeof item.submenu !== 'undefined' && item.submenu.length;
    }
}

export default MainNavDesktop;
